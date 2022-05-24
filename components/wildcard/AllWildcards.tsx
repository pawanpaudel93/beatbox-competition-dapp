import { Box, Grid } from '@chakra-ui/react'
import Moralis from 'moralis'

interface AllWildcardsProps {
  wildcards: {
    isFetching: boolean
    isLoading: boolean
    error: Error | null
    data: Moralis.Object[]
  }
}

export default function AllWildcards({ wildcards }: AllWildcardsProps) {
  if (wildcards.isFetching) {
    return <Box>Fetching wildcards...</Box>
  } else if (wildcards.isLoading) {
    return <Box>Loading wildcards...</Box>
  } else if (wildcards.error) {
    return <Box>Error fetching wildcards: {wildcards.error.message}</Box>
  }

  return (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
      gap={6}
    >
      {wildcards.data.length > 0 ? (
        wildcards.data.map((wildcard, index) => (
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
                wildcard.attributes.videoUrl.indexOf('youtube') > 0
                  ? 'https://www.youtube.com/embed/' +
                    wildcard.attributes.videoUrl.split('=').pop()
                  : wildcard.attributes.videoUrl
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
                  Wildcard by: {wildcard.attributes.name}
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
