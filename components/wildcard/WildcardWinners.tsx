import { Box, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import SelectWinners from './SelectWinners'
import Moralis from 'moralis'

interface WildcardWinnersProps {
  allWildcards: Moralis.Object<Moralis.Attributes>[]
  isAdmin: boolean
}

export default function WildcardWinners({
  allWildcards,
  isAdmin,
}: WildcardWinnersProps) {
  const router = useRouter()
  const { contractAddress } = router.query

  const wildcards = allWildcards.filter((w) => w.attributes.isWinner)

  return (
    <>
      {isAdmin && contractAddress && (
        <SelectWinners
          wildcards={allWildcards}
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
