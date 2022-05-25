import type { NextPage } from 'next'
import { Alert, AlertIcon, Center, Grid, Spinner, Text } from '@chakra-ui/react'
import Competition from '../components/competition/Competition'
import { ICompetition } from '../interfaces'
import { useMoralisQuery, useMoralis } from 'react-moralis'
import { ethers } from 'ethers'

const MyCompetitions: NextPage = () => {
  const { user } = useMoralis()
  const { data, isFetching, isLoading, error } = useMoralisQuery(
    'Competition',
    (query) => query && query.equalTo('creator', user?.get('ethAddress')),
    [user?.get('ethAddress')],
    {
      autoFetch: true,
      live: true,
    }
  )

  const competitions: ICompetition[] = data?.map((competition) => ({
    competitionId: competition.attributes.competitionId,
    name: ethers.utils.parseBytes32String(competition.attributes.name),
    description: competition.attributes.description,
    imageURI: competition.attributes.imageURI,
    contractAddress: competition.attributes.contractAddress,
    creator: competition.attributes.creator,
    competitionState: 0,
  }))

  if (isLoading || isFetching) {
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
        <Text>Fetching my competitions</Text>
      </Center>
    )
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error fetching my competitions: {error.message}
      </Alert>
    )
  } else if (competitions.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        No competitions found.
      </Alert>
    )
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
      {competitions?.map((competition, index) => (
        <Competition key={index} competition={competition} />
      ))}
    </Grid>
  )
}

export default MyCompetitions
