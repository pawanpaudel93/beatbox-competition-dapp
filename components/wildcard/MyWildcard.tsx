import { useMoralis } from 'react-moralis'
import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Grid,
  Spinner,
  Text,
} from '@chakra-ui/react'
import UpdateWildcard from './UpdateWildcard'
import { ICompetition } from '../../interfaces'
import Moralis from 'moralis'
import { CompetitionState } from '../../constants'

interface MyWilcardProps {
  competition: ICompetition
  allWildcards: {
    isFetching: boolean
    isLoading: boolean
    error: Error | null
    data: Moralis.Object[]
  }
}

export default function MyWilcard({
  competition,
  allWildcards,
}: MyWilcardProps) {
  const { user } = useMoralis()
  const competitionState = competition.competitionState
  const wildcardStarted =
    competitionState === CompetitionState.WILDCARD_SUBMISSION
  const wildcardEnded =
    competitionState !== CompetitionState.WILDCARD_SUBMISSION &&
    competitionState !== CompetitionState.NOT_STARTED

  const isDisabled = !wildcardStarted || wildcardEnded

  const wildcards = allWildcards.data.filter(
    (wildcard) =>
      wildcard.attributes.userAddress === user?.attributes.ethAddress
  )

  if (allWildcards.isLoading || allWildcards.isFetching) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          m={4}
        />
        <Text>Fetching wildcard...</Text>
      </Center>
    )
  } else if (allWildcards.error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error fetching wildcard: {allWildcards.error.message}
      </Alert>
    )
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
                  {wildcard.attributes.name}
                </Box>
              </Box>
              {!isDisabled && <UpdateWildcard wildcard={wildcard} />}
            </Box>
          </Box>
        ))
      ) : (
        <Alert status="info">
          <AlertIcon />
          No wildcards yet.
        </Alert>
      )}
    </Grid>
  )
}
