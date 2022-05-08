import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Grid } from '@chakra-ui/react'
import { useProvider, useAccount } from 'wagmi'
import {
  COMPETITION_FACTORY_ADDRESS,
  COMPETITION_FACTORY_ABI,
} from '../constants'
import { Contract } from 'ethers'
import Competition from '../components/competition/Competition'
import { ICompetition } from '../interfaces'

const MyCompetitions: NextPage = () => {
  const [competitions, setCompetitions] = useState<ICompetition[]>()
  const { data, isError, isLoading } = useAccount()
  const provider = useProvider()

  useEffect(() => {
    if (data?.address) {
      getCompetitions()
    }
  }, [data?.address])

  const getCompetitions = async () => {
    const contract = new Contract(
      COMPETITION_FACTORY_ADDRESS,
      COMPETITION_FACTORY_ABI,
      provider
    )
    const _competitions = await contract.getCompetitionsByCreator(data?.address)
    setCompetitions(_competitions)
  }

  if (isLoading) {
    return <div>Loading my competitions...</div>
  } else if (isError) {
    return <div>Error Loading competitions</div>
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
