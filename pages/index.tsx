import type { NextPage } from 'next'
import { useMoralisQuery } from 'react-moralis'
import { Grid } from '@chakra-ui/react'
import Competition from '../components/competition/Competition'
import { ICompetition } from '../interfaces'

const Home: NextPage = () => {
  const { data, isFetching, isLoading, error } = useMoralisQuery(
    'Competition',
    (query) => query,
    [],
    {
      autoFetch: true,
    }
  )

  const competitions: ICompetition[] = data?.map((competition) => ({
    competitionId: competition.attributes.competitionId,
    name: competition.attributes.name,
    description: competition.attributes.description,
    image: competition.attributes.image,
    wildcardStart: competition.attributes.wildcardStart,
    contractAddress: competition.attributes.contractAddress,
    creator: competition.attributes.creator,
    wildcardEnd: competition.attributes.wildcardEnd,
  }))

  if (isLoading) {
    return <div>Loading competitions...</div>
  } else if (isFetching) {
    return <div>Fetching competitions...</div>
  } else if (error) {
    return <div>Error fetching competitions: {error.message}</div>
  } else if (competitions.length === 0) {
    return <div>No competitions found</div>
  }
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {competitions?.map((competition, index) => (
        <Competition key={index} competition={competition} />
      ))}
    </Grid>
  )
}

export default Home
