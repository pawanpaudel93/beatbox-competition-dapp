import { useMoralisQuery } from 'react-moralis'
import { Box, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function AllWildcards() {
  const router = useRouter()
  const { contractAddress } = router.query

  const {
    data: wildcards,
    isFetching,
    isLoading,
    error,
  } = useMoralisQuery(
    'Wildcard',
    (query) => query.equalTo('contractAddress', contractAddress),
    [contractAddress],
    {
      autoFetch: true,
      live: true,
    }
  )

  if (isFetching) {
    return <Box>Fetching wildcards...</Box>
  } else if (isLoading) {
    return <Box>Loading wildcards...</Box>
  } else if (error) {
    return <Box>Error fetching wildcards: {error.message}</Box>
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
            </Box>
          </Box>
        ))
      ) : (
        <Box>No wildcards yet</Box>
      )}
    </Grid>
  )
}
