import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Grid } from '@chakra-ui/react'
import {
  COMPETITION_FACTORY_ADDRESS,
  COMPETITION_FACTORY_ABI,
} from '../constants'
import Competition from '../components/competition/Competition'
import { ICompetition } from '../interfaces'
import { useMoralis } from 'react-moralis'

const MyCompetitions: NextPage = () => {
  const [competitions, setCompetitions] = useState<ICompetition[]>()
  const [isLoading, setIsLoading] = useState(true)
  const { user, Moralis, isWeb3Enabled } = useMoralis()

  useEffect(() => {
    if (isWeb3Enabled) {
      getCompetitions()
    }
  }, [isWeb3Enabled])

  const getCompetitions = async () => {
    const options = {
      contractAddress: COMPETITION_FACTORY_ADDRESS,
      abi: COMPETITION_FACTORY_ABI,
      functionName: 'getCompetitionsByCreator',
      params: {
        creator: user?.get('ethAddress'),
      },
    }
    const _competitions = await Moralis.executeFunction(options)
    setCompetitions(_competitions as ICompetition[])
    setIsLoading(false)
  }

  if (isLoading) {
    return <div>Loading my competitions...</div>
  } else if (competitions?.length === 0) {
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

export default MyCompetitions
