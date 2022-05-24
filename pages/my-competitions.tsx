import type { NextPage } from 'next'
import { Grid } from '@chakra-ui/react'
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

  if (isLoading) {
    return <div>Loading my competitions...</div>
  } else if (isFetching) {
    return <div>Fetching my competitions...</div>
  } else if (error) {
    return <div>Error fetching my competitions: {error.message}</div>
  } else if (competitions.length === 0) {
    return <div>No my competitions found!</div>
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
