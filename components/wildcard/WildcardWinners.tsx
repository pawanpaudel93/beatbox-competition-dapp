import { useMoralis } from 'react-moralis'
import { Box, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { BBX_COMPETITION_ABI } from '../../constants'
import SelectWinners from './SelectWinners'
import Moralis from 'moralis'
interface WildcardWinnersProps {
  allWildcards: {
    isFetching: boolean
    isLoading: boolean
    error: Error | null
    data: Moralis.Object[]
  }
}

export default function WildcardWinners({
  allWildcards,
}: WildcardWinnersProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const { contractAddress } = router.query
  const { user, Moralis, isWeb3Enabled } = useMoralis()

  const wildcards = allWildcards.data.filter((w) => w.attributes.isWinner)

  useEffect(() => {
    if (isWeb3Enabled && contractAddress) {
      fetchIsAdmin()
    }
  }, [isWeb3Enabled, contractAddress])

  const fetchIsAdmin = async () => {
    try {
      const options = {
        contractAddress: contractAddress as string,
        functionName: 'hasRole',
        abi: BBX_COMPETITION_ABI,
        params: {
          role: ethers.utils.formatBytes32String('admin'),
          account: user?.get('ethAddress'),
        },
      }
      const _isAdmin = (await Moralis.executeFunction(
        options
      )) as unknown as boolean
      setIsAdmin(_isAdmin)
    } catch (e) {
      console.log(e)
    }
  }

  if (allWildcards.isFetching) {
    return <Box>Fetching selected wildcards...</Box>
  } else if (allWildcards.isLoading) {
    return <Box>Loading selected wildcards...</Box>
  } else if (allWildcards.error) {
    return (
      <Box>Error fetching selected wildcards: {allWildcards.error.message}</Box>
    )
  }

  return (
    <>
      {!isAdmin && contractAddress && (
        <SelectWinners
          wildcards={allWildcards.data}
          contractAddress={contractAddress as string}
        />
      )}
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {wildcards.length > 0 ? (
          wildcards.map((wildcard, index) => (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              key={index}
            >
              <Box
                as="iframe"
                src={
                  'https://www.youtube.com/embed/' +
                  wildcard.attributes.videoUrl.split('=').pop()
                }
                width="100%"
                allowFullScreen
                sx={{
                  aspectRatio: '16/9',
                }}
              />

              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    {wildcard.attributes.name}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Box>No selected wildcards yet</Box>
        )}
      </Grid>
    </>
  )
}
