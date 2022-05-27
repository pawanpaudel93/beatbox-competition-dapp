import type { NextPage } from 'next'
import { Alert, AlertIcon, Center, Grid, Spinner, Text } from '@chakra-ui/react'
import Competition from '../components/competition/Competition'
import { ICompetition } from '../interfaces'
import { useMoralis } from 'react-moralis'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const MyCompetitions: NextPage = () => {
  const { user, Moralis } = useMoralis()
  const [isLoading, setIsLoading] = useState(true)
  const [competitions, setCompetitions] = useState<ICompetition[]>([])

  const fetchAllMyCompetitions = async () => {
    try {
      setIsLoading(true)
      const competitions = []
      let competitionQuery = new Moralis.Query('Competition')
      competitionQuery.equalTo('creator', user?.get('ethAddress'))
      competitions.push(...(await competitionQuery.find()))
      const judgeQuery = new Moralis.Query('Judge')
      judgeQuery.equalTo('userAddress', user?.get('ethAddress'))
      const contractAddresses = (await judgeQuery.find()).map(
        (item) => item.attributes.contractAddress
      )
      const beatboxerQuery = new Moralis.Query('Beatboxer')
      beatboxerQuery.equalTo('userAddress', user?.get('ethAddress'))
      contractAddresses.push(
        ...(await beatboxerQuery.find()).map(
          (item) => item.attributes.contractAddress
        )
      )
      competitionQuery = new Moralis.Query('Competition')
      competitionQuery.containedIn('contractAddress', contractAddresses)
      competitions.push(...(await competitionQuery.find()))

      setCompetitions(
        competitions.map((competition) => ({
          competitionId: competition.attributes.competitionId,
          name: ethers.utils.parseBytes32String(competition.attributes.name),
          description: competition.attributes.description,
          imageURI: competition.attributes.imageURI,
          contractAddress: competition.attributes.contractAddress,
          creator: competition.attributes.creator,
          competitionState: 0,
        }))
      )
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAllMyCompetitions()
  }, [user?.get('ethAddress')])

  if (isLoading) {
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
      {competitions.map((competition, index) => (
        <Competition key={index} competition={competition} />
      ))}
    </Grid>
  )
}

export default MyCompetitions
