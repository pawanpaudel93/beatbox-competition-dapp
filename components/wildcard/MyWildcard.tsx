import { useMoralisQuery, useMoralis } from 'react-moralis'
import { Box, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import UpdateWildcard from './UpdateWildcard'
import { ICompetition } from '../../interfaces'

interface MyWilcardProps {
  competition: ICompetition
}

export default function MyWilcard({ competition }: MyWilcardProps) {
  const router = useRouter()
  const { contractAddress } = router.query
  const { user } = useMoralis()
  const wildcardStarted =
    parseInt(competition.wildcardStart.toString()) * 1000 <=
    new Date().getTime()
  const wildcardEnded =
    parseInt(competition.wildcardEnd.toString()) * 1000 <= new Date().getTime()
  const isDisabled = !wildcardStarted || wildcardEnded

  const {
    data: wildcards,
    isFetching,
    isLoading,
    error,
    fetch,
  } = useMoralisQuery(
    'Wildcard',
    (query) =>
      query.equalTo('contractAddress', contractAddress) &&
      query.equalTo('userAddress', user?.attributes.ethAddress),
    [contractAddress, user?.attributes.ethAddress],
    {
      autoFetch: true,
      live: true,
    }
  )

  const fetchCallback = () => {
    fetch()
  }

  if (isFetching) {
    return <Box>Fetching wildcard...</Box>
  } else if (isLoading) {
    return <Box>Loading wildcard...</Box>
  } else if (error) {
    return <Box>Error fetching wildcard: {error.message}</Box>
  }

  return (
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
              {!isDisabled && (
                <UpdateWildcard
                  wildcard={wildcard}
                  fetchCallback={fetchCallback}
                />
              )}
            </Box>
          </Box>
        ))
      ) : (
        <Box>No wildcard yet</Box>
      )}
    </Grid>
  )
}
