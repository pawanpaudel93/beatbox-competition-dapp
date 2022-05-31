import {
  VStack,
  HStack,
  Box,
  Heading,
  Button,
  FormControl,
  Input,
  Center,
  Link,
  Text,
} from '@chakra-ui/react'
import { ICompetition } from '../../interfaces'
import { useRouter } from 'next/router'
import { BBX_COMPETITION_ABI, CompetitionState } from '../../constants'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'
import { ChangeEvent, useEffect, useState } from 'react'
import { errorLogging, getBeatboxCompetition } from '../../utils'
import { useAuthentication } from '../../context/AuthenticationContext'

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
  const [subscriptionId, setSubscriptionId] = useState(0)
  const { getReadyForTransaction } = useAuthentication()
  const [isLoading, setIsLoading] = useState({
    start: false,
    end: false,
    subscription: false,
    fund: false,
  })

  useEffect(() => {
    if (contractAddress && !subscriptionId) {
      fetchSubscriptionId()
    }
  }, [contractAddress])

  const fetchSubscriptionId = async () => {
    try {
      const beatboxCompetition = getBeatboxCompetition(
        contractAddress as string
      )

      const _subscriptionId =
        (await beatboxCompetition.subscriptionId()) as unknown as number
      console.log(_subscriptionId)
      setSubscriptionId(_subscriptionId)
    } catch (error) {
      console.log(error.message)
    }
  }

  const startWildcard = async () => {
    try {
      setIsLoading({ ...isLoading, start: true })
      await getReadyForTransaction()
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
      errorLogging(error)
    }
    setIsLoading({ ...isLoading, start: false })
  }

  const endWildcard = async () => {
    try {
      setIsLoading({ ...isLoading, end: true })
      await getReadyForTransaction()
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
      errorLogging(error)
    }
    setIsLoading({ ...isLoading, end: false })
  }

  const updateSubscriptionId = async () => {
    try {
      setIsLoading({ ...isLoading, subscription: true })
      await getReadyForTransaction()
      const options = {
        contractAddress: contractAddress as string,
        abi: BBX_COMPETITION_ABI,
        functionName: 'setSubscriptionId',
        params: {
          _subscriptionId: subscriptionId,
        },
      }
      const endWildcardTx = await Moralis.executeFunction(options)
      await endWildcardTx.wait()
      toast.success('Subscription Id set!')
    } catch (error) {
      errorLogging(error)
    }
    setIsLoading({ ...isLoading, subscription: false })
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
              competition.competitionState >
                CompetitionState.WILDCARD_SUBMISSION ||
              competition.competitionState == CompetitionState.NOT_STARTED
            }
            isLoading={isLoading.end}
          >
            End
          </Button>
        </HStack>
      </Box>

      <HStack spacing={8} mt={8}>
        <FormControl>
          <Heading fontSize="xl">
            Set Subscription Id for Chainlink VRF{' '}
          </Heading>
          <Input
            padding={2}
            margin={2}
            type="number"
            value={subscriptionId}
            placeholder="Subscription Id"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSubscriptionId(parseInt(e.target.value))
            }
          />
          <Text>
            Don't have a subscription id?{' '}
            <Link
              href="https://vrf.chain.link/mumbai/new"
              isExternal
              textColor="blue"
            >
              Create VRF Subscription
            </Link>
          </Text>
          <Center>
            <Button
              colorScheme="green"
              onClick={updateSubscriptionId}
              isLoading={isLoading.subscription}
            >
              Set
            </Button>
          </Center>
        </FormControl>
      </HStack>
      <Text>
        Also register new upkeep for the competition contract
        <Link
          href="https://keepers.chain.link/mumbai/new"
          isExternal
          textColor="blue"
        >
          {' '}
          Register new Upkeep
        </Link>
      </Text>
    </VStack>
  )
}
