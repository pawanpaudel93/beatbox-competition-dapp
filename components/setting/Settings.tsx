import { VStack, HStack, Box, Heading, Button } from '@chakra-ui/react'
import { ICompetition } from '../../interfaces'
import { useRouter } from 'next/router'
import { BBX_COMPETITION_ABI, CompetitionState } from '../../constants'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface SettingsProps {
  competition: ICompetition
  fetchMetaData: () => Promise<void>
}
export default function Settings({
  competition,
  fetchMetaData,
}: SettingsProps) {
  const router = useRouter()
  const { Moralis } = useMoralis()
  const { contractAddress } = router.query
  const [isLoading, setIsLoading] = useState({
    start: false,
    end: false,
  })

  const startWildcard = async () => {
    try {
      setIsLoading({ ...isLoading, start: true })
      const options = {
        contractAddress: contractAddress as string,
        abi: BBX_COMPETITION_ABI,
        functionName: 'startWildcard',
        params: [],
      }
      const startWildcardTx = await Moralis.executeFunction(options)
      await startWildcardTx.wait()
      await fetchMetaData()
      toast.success('Wildcard started!')
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading({ ...isLoading, start: false })
  }

  const endWildcard = async () => {
    try {
      setIsLoading({ ...isLoading, end: true })
      const options = {
        contractAddress: contractAddress as string,
        abi: BBX_COMPETITION_ABI,
        functionName: 'endWildcard',
        params: [],
      }
      const endWildcardTx = await Moralis.executeFunction(options)
      await endWildcardTx.wait()
      await fetchMetaData()
      toast.success('Wildcard ended!')
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading({ ...isLoading, end: false })
  }
  return (
    <VStack spacing={4}>
      <Box p={4} shadow="md">
        <HStack spacing={8}>
          <Heading fontSize="xl">Start Wildcard submission: </Heading>
          <Button
            colorScheme="blue"
            onClick={startWildcard}
            isDisabled={
              competition.competitionState > CompetitionState.NOT_STARTED
            }
            isLoading={isLoading.start}
          >
            Start
          </Button>
        </HStack>
      </Box>
      <Box p={4} shadow="md">
        <HStack spacing={8}>
          <Heading fontSize="xl">End Wildcard submission: </Heading>
          <Button
            colorScheme="red"
            onClick={endWildcard}
            isDisabled={
              competition.competitionState > CompetitionState.WILDCARD ||
              competition.competitionState == CompetitionState.NOT_STARTED
            }
            isLoading={isLoading.end}
          >
            End
          </Button>
        </HStack>
      </Box>
    </VStack>
  )
}
