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
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useMoralis, useMoralisQuery } from 'react-moralis'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { ICompetition } from '../../interfaces'
import { BBX_COMPETITION_ABI } from '../../constants'

interface CreateBattleProps {
  competition: ICompetition
}

interface IBattle {
  addresses: string[]
  names: string[]
  name: string
}

export default function CreateBattle({ competition }: CreateBattleProps) {
  // const today = '2022-05-14T11:23'
  const today = new Date()
    .toISOString()
    .split('.')[0]
    .split(':')
    .slice(0, 2)
    .join(':')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [winningAmount, setWinningAmount] = useState(0)
  const [battleStart, setBattleStart] = useState(today)
  const [battleEnd, setBattleEnd] = useState(today)
  const [battleAddresses, setBattleAddresses] = useState<string[]>([])
  const [names, setNames] = useState<string[]>([])
  const [videoUrls, setVideoUrls] = useState<string[]>(['', ''])
  const [battles, setBattles] = useState<IBattle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { Moralis } = useMoralis()
  const router = useRouter()
  const { contractAddress } = router.query

  const { data: wildcards, isFetching } = useMoralisQuery(
    'Wildcard',
    (query) =>
      query
        .equalTo('contractAddress', contractAddress)
        .equalTo('isWinner', true),
    [contractAddress],
    {
      autoFetch: true,
      live: true,
    }
  )

  useEffect(() => {
    if (!isFetching) {
      const _battles: IBattle[] = []
      for (let i = 0; i < wildcards.length / 2; i++) {
        const opponentIndex = wildcards.length - 1 - i
        _battles.push({
          name: `${wildcards[i].attributes.name} V/S ${wildcards[opponentIndex].attributes.name}`,
          names: [
            wildcards[i].attributes.name,
            wildcards[opponentIndex].attributes.name,
          ],
          addresses: [
            wildcards[i].attributes.userAddress as string,
            wildcards[opponentIndex].attributes.userAddress as string,
          ],
        })
      }
      setBattles(_battles)
    }
  }, [isFetching])

  const wildcardStarted =
    parseInt(competition.wildcardStart.toString()) * 1000 <=
    new Date().getTime()
  const wildcardEnded =
    parseInt(competition.wildcardEnd.toString()) * 1000 <= new Date().getTime()
  const isDisabled = !wildcardStarted || wildcardEnded

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const options = {
        functionName: 'startBattle',
        contractAddress: contractAddress as string,
        abi: BBX_COMPETITION_ABI,
        params: {
          name: name,
          category: category,
          beatboxerOneAddress: battleAddresses[0],
          beatboxerTwoAddress: battleAddresses[1],
          videoUrlOne: videoUrls[0],
          videoUrlTwo: videoUrls[1],
          startTime: Math.floor(new Date(battleStart).getTime() / 1000),
          endTime: Math.floor(new Date(battleEnd).getTime() / 1000),
          winningAmount: ethers.utils.parseEther(winningAmount.toString()),
        },
      }

      const battleTx = await Moralis.executeFunction(options)
      await battleTx.wait()
      clearForm()
      toast.success('Battle started successfully!')
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  const clearForm = () => {
    setName('')
    setCategory('')
    setBattleAddresses([])
    setVideoUrls(['', ''])
    setNames([])
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
          <FormLabel htmlFor="battle-name">Name</FormLabel>
          <Input
            id="battle-name"
            placeholder="Battle Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="battle-category">Category</FormLabel>
          <Input
            id="battle-category"
            placeholder="Battle Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </FormControl>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="battle-select">Beatboxer v/s Beatboxer</FormLabel>
          <Select
            placeholder="Select option"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              if (e.target.value) {
                setBattleAddresses(e.target.value.split(','))
                setNames(
                  e.target.children[e.target.selectedIndex].innerHTML.split(
                    ' V/S '
                  )
                )
              } else {
                setBattleAddresses([])
              }
            }}
          >
            {battles.map((battle, index) => (
              <option key={index} value={battle.addresses}>
                {battle.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {battleAddresses.length > 0 && (
          <>
            <FormControl padding={3} isRequired>
              <FormLabel htmlFor="youtube-url-1">
                {names[0] + ' Youtube URL'}
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
                {names[1] + ' Youtube URL'}
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
          <Input
            id="battle-amount"
            type="number"
            placeholder="Battle Winning Amount"
            value={winningAmount}
            onChange={(e) => setWinningAmount(e.target.value)}
          />
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
              disabled={isDisabled}
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
          <AlertDescription>Wilcard submission not started.</AlertDescription>
        </Alert>
      )}
      {wildcardEnded && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>Wilcard submission ended.</AlertDescription>
        </Alert>
      )}
    </Container>
  )
}
