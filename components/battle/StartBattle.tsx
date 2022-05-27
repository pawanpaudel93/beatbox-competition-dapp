import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Center,
  Input,
  Container,
  Alert,
  AlertIcon,
  AlertDescription,
  Select,
  InputGroup,
  InputRightAddon,
  Tag,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { getBeatboxCompetition, getCategoryByState } from '../../utils'
import { ICompetition } from '../../interfaces'
import { BBX_COMPETITION_ABI, CompetitionState } from '../../constants'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

interface CreateBattleProps {
  competition: ICompetition
  fetchAllBattles: () => Promise<void>
  fetchVotedBattlesIndices: () => Promise<void>
}

interface IBattle {
  id: number
  name: string
  beatboxerOne: string
  beatboxerTwo: string
}

interface IBeatboxer {
  name: string
  beatboxerAddress: string
}

export default function CreateBattle({
  competition,
  fetchAllBattles,
}: CreateBattleProps) {
  // const today = '2022-05-14T11:23'
  const today = new Date()
    .toISOString()
    .split('.')[0]
    .split(':')
    .slice(0, 2)
    .join(':')
  const [name, setName] = useState('')
  const [battle, setBattle] = useState<IBattle>({
    id: 0,
    name: '',
    beatboxerOne: '',
    beatboxerTwo: '',
  })
  const [winningAmount, setWinningAmount] = useState(0)
  const [battleStart, setBattleStart] = useState(today)
  const [battleEnd, setBattleEnd] = useState(today)
  const [videoUrls, setVideoUrls] = useState<string[]>(['', ''])
  const [battles, setBattles] = useState<IBattle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [startBlockNumber, setStartBlockNumber] = useState(0)
  const { Moralis } = useMoralis()
  const router = useRouter()
  const { contractAddress } = router.query

  const fetchBattles = async () => {
    try {
      const beatboxCompetition = getBeatboxCompetition(
        contractAddress as string
      )
      const _battles =
        (await beatboxCompetition.getCurrentBattles()) as Array<IBeatboxer>[]

      setBattles(
        _battles.map((beatboxers, index) => ({
          id: index,
          name: `${beatboxers[0].name} vs ${beatboxers[1].name}`,
          beatboxerOne: beatboxers[0].name,
          beatboxerTwo: beatboxers[1].name,
        }))
      )
      // console.log(battles)
    } catch (error) {
      console.error(error)
    }
  }

  const youtubeUrlToBytes11 = (url: string) => {
    const videoId = url.split('v=')[1].slice(0, 11).trim()
    return ethers.utils.formatBytes32String(videoId).slice(0, 24)
  }

  const setLatestBlockNumber = async (beatboxCompetition: ethers.Contract) => {
    try {
      setStartBlockNumber(await beatboxCompetition.provider.getBlockNumber())
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (contractAddress) {
      fetchBattles()
      const beatboxCompetition = getBeatboxCompetition(
        contractAddress as string
      )
      beatboxCompetition.on('OpponentsSelected', (state, event) => {
        if (event.blockNumber > startBlockNumber) {
          toast.success('Latest round battles has been selected')
          fetchBattles()
          setLatestBlockNumber(beatboxCompetition)
        }
      })
    }
  }, [contractAddress])

  const wildcardStarted =
    CompetitionState.WILDCARD_SUBMISSION <= competition.competitionState
  const wildcardEnded =
    CompetitionState.WILDCARD_SUBMISSION < competition.competitionState

  const isYtVideoValid = async (url: string) => {
    try {
      const isValid = await fetch('/api/check', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return (await isValid.json()).message
    } catch (error) {
      // console.log(error)
      return false
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!(await isYtVideoValid(videoUrls[0]))) {
        toast.error(`Invalid Youtube Video url: ${videoUrls[0]}`)
        return
      }
      if (!(await isYtVideoValid(videoUrls[1]))) {
        toast.error(`Invalid Youtube Video url: ${videoUrls[1]}`)
        return
      }
      setIsLoading(true)
      const options = {
        functionName: 'startBattle',
        contractAddress: contractAddress as string,
        abi: BBX_COMPETITION_ABI,
        params: {
          stateBattleId: battle.id,
          name,
          ytVideoIdOne: youtubeUrlToBytes11(videoUrls[0]),
          ytVideoIdTwo: youtubeUrlToBytes11(videoUrls[1]),
          startTime: dayjs.utc(battleStart).unix(),
          endTime: dayjs.utc(battleEnd).unix(),
          winningAmount: ethers.utils.parseEther(winningAmount.toString()),
        },
      }
      const battleTx = await Moralis.executeFunction(options)
      await battleTx.wait()
      clearForm()
      toast.success('Battle started successfully!')
      setIsLoading(false)
      fetchAllBattles()
    } catch (error) {
      setIsLoading(false)
      if (error?.data?.message) {
        toast.error(error.data.message)
      }
    }
  }

  const clearForm = () => {
    setName('')
    setVideoUrls(['', ''])
    setWinningAmount(0)
    setBattleStart(today)
    setBattleEnd(today)
  }

  return (
    <Container padding={2}>
      <Center>
        <h1>Start Beatbox Battle</h1>
      </Center>
      <form onSubmit={onSubmit}>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="battle-select">Beatboxer v/s Beatboxer</FormLabel>
          <Select
            placeholder="Select battle"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              try {
                setBattle(battles[parseInt(e.target.value)])
                setName(battles[parseInt(e.target.value)].name)
              } catch (error) {
                console.log(error)
              }
            }}
          >
            {battles.map((battle, index) => (
              <option key={index} value={battle.id}>
                {battle.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="battle-name">Name</FormLabel>
          <Input
            id="battle-name"
            placeholder="Battle Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl padding={3}>
          <FormLabel htmlFor="battle-state">Competition State</FormLabel>
          <Tag colorScheme="blue" variant="solid">
            {getCategoryByState(competition.competitionState)}
          </Tag>{' '}
          {' Battle'}
        </FormControl>

        {battle?.name.length > 0 && (
          <>
            <FormControl padding={3} isRequired>
              <FormLabel htmlFor="youtube-url-1">
                {battle.beatboxerOne + ' Youtube Video URL'}
              </FormLabel>
              <Input
                id="youtube-url-1"
                placeholder="Youtube URL"
                value={videoUrls[0]}
                onChange={(e) => setVideoUrls([e.target.value, videoUrls[1]])}
              />
            </FormControl>
            <FormControl padding={3} isRequired>
              <FormLabel htmlFor="youtube-url-2">
                {battle.beatboxerTwo + ' Youtube Video URL'}
              </FormLabel>
              <Input
                id="youtube-url-2"
                placeholder="Youtube URL"
                value={videoUrls[1]}
                onChange={(e) => setVideoUrls([videoUrls[0], e.target.value])}
              />
            </FormControl>
          </>
        )}
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="battle-amount">Winning Amount</FormLabel>
          <InputGroup>
            <Input
              id="battle-amount"
              type="number"
              placeholder="Battle Winning Amount (MATIC)"
              value={winningAmount}
              onChange={(e) => setWinningAmount(e.target.value)}
            />
            <InputRightAddon>MATIC</InputRightAddon>
          </InputGroup>
        </FormControl>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="battle-start">Battle Start Date</FormLabel>
          <Input
            type="datetime-local"
            id="battle-start"
            placeholder="Battle Start Date"
            value={battleStart}
            onChange={(e) => setBattleStart(e.target.value)}
          />
        </FormControl>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="battle-end">Battle End Date</FormLabel>
          <Input
            type="datetime-local"
            id="battle-end"
            placeholder="Battle End Date"
            value={battleEnd}
            onChange={(e) => setBattleEnd(e.target.value)}
          />
        </FormControl>
        <Center>
          <ButtonGroup padding={3} variant="outline" spacing="6">
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              disabled={!wildcardEnded}
            >
              Start
            </Button>
            <Button onClick={clearForm}>Cancel</Button>
          </ButtonGroup>
        </Center>
      </form>
      {!wildcardStarted && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            Wilcard submission has not started yet!
          </AlertDescription>
        </Alert>
      )}
      {!wildcardEnded && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            Wilcard submission has not ended yet!
          </AlertDescription>
        </Alert>
      )}
    </Container>
  )
}
