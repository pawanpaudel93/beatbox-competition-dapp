import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useDisclosure,
} from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StartBattle from './StartBattle'
import AllBattles from './AllBattles'
import MyBattles from './MyBattles'
import { ICompetition, IPoint, IRoles } from '../../interfaces'
import { IBattle } from '../../interfaces'
import { getBeatboxCompetition } from '../../utils'
import Moralis from 'moralis'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
interface BattlesProps {
  competition: ICompetition
  roles: IRoles
}

export default function Battles({
  competition,
  roles
}: BattlesProps) {
  const { user, Moralis } = useMoralis()
  const router = useRouter()
  const { contractAddress } = router.query
  const [votedBattles, setVotedBattles] = useState<{ [key: number]: boolean }>(
    {}
  )
  const [battles, setBattles] = useState<IBattle[]>([])
  const [beatboxers, setBeatboxers] = useState<
    Moralis.Object<Moralis.Attributes>[]
  >([])
  const [judges, setJudges] = useState({})
  const [startBlockNumber, setStartBlockNumber] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [battlePoints, setBattlePoints] = useState<IPoint[]>([])
  const [battle, setBattle] = useState<IBattle>()

  const fetchVotedBattlesIndices = async () => {
    try {
      const beatboxCompetition = getBeatboxCompetition(contractAddress as string)
      const votedBattlesIndices: number[] = await beatboxCompetition.getVotedBattlesIndices(user?.get('ethAddress') as string)
      const _votedBattles = votedBattlesIndices.reduce(
        (acc, index) => ({ ...acc, [index]: true }),
        {}
      )
      setVotedBattles(_votedBattles)
    } catch (error) {
      console.error(error)
    }
  }

  const bytes11ToString = (videoId: string) => {
    return ethers.utils.parseBytes32String(videoId + '0'.repeat(42))
  }

  const fetchAllBattles = async () => {
    try {
      const beatboxCompetition = getBeatboxCompetition(
        contractAddress as string
      )

      const battles = (await beatboxCompetition.getAllBattles()) as IBattle[]
      const totalBattles = battles.length
      const _battles: IBattle[] = []
      for (let id = totalBattles - 1; id >= 0; id--) {
        const battle = battles[id]
        _battles.push({
          id,
          name: battle.name,
          state: battle.state,
          winningAmount: battle.winningAmount,
          winnerId: battle.winnerId,
          startTime: battle.startTime,
          endTime: battle.endTime,
          totalVotes: battle.totalVotes,
          beatboxerOne: {
            score: battle.beatboxerOne.score,
            beatboxerId: battle.beatboxerOne.beatboxerId,
            ytVideoId: bytes11ToString(battle.beatboxerOne.ytVideoId),
            likeCount: battle.beatboxerOne.likeCount,
          },
          beatboxerTwo: {
            score: battle.beatboxerTwo.score,
            beatboxerId: battle.beatboxerTwo.beatboxerId,
            ytVideoId: bytes11ToString(battle.beatboxerTwo.ytVideoId),
            likeCount: battle.beatboxerTwo.likeCount,
          },
        })
      }
      setBattles(_battles)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllBeatboxers = async () => {
    try {
      const Wildcard = Moralis.Object.extend('Wildcard')
      const query = new Moralis.Query(Wildcard)
      query.equalTo("contractAddress", contractAddress as string)
      query.equalTo('isWinner', true)
      query.ascending('rank')
      const beatboxers = await query.find()
      setBeatboxers(beatboxers)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllJudges = async () => {
    try {
      const query = new Moralis.Query('Judge')
      query.equalTo(
        'contractAddress',
        (contractAddress as string).toLowerCase()
      )
      const _judges = await query.find()
      const _judesObj = _judges.reduce(
        (acc, judge) => ({
          ...acc,
          [judge.attributes.userAddress]: judge.attributes.name,
        }),
        {}
      )
      setJudges(_judesObj)
    } catch (error) {
      console.error(error)
    }
  }

  const setLatestBlockNumber = async (beatboxCompetition: ethers.Contract) => {
    try {
      setStartBlockNumber(await beatboxCompetition.provider.getBlockNumber())
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (contractAddress && user?.get('ethAddress')) {
      fetchVotedBattlesIndices()
    }
  }, [user?.get('ethAddress'), contractAddress])

  useEffect(() => {
    if (contractAddress) {
      fetchAllBeatboxers()
      fetchAllJudges()
      fetchAllBattles()

      const beatboxCompetition = getBeatboxCompetition(
        contractAddress as string
      )
      beatboxCompetition.on('WinnerSelected', (battleId, winnerId, event) => {
        console.log(battleId, winnerId, event)
        if (event.blockNumber > startBlockNumber) {
          setLatestBlockNumber(beatboxCompetition)
          toast.success('Latest battle winner selected')
          fetchAllBattles()
        }
      })
      return () => {
        beatboxCompetition.removeAllListeners()
      }
    }
  }, [contractAddress])

  return (
    <Tabs>
      <TabList>
        {roles.isAdmin && <Tab>Start Battle</Tab>}
        <Tab>All Battles</Tab>
        <Tab>My Battle</Tab>
      </TabList>

      <TabPanels>
        {roles.isAdmin && (
          <TabPanel>
            <StartBattle
              competition={competition}
              fetchAllBattles={fetchAllBattles}
              fetchVotedBattlesIndices={fetchVotedBattlesIndices}
            />
          </TabPanel>
        )}
        <TabPanel>
          <AllBattles
            isJudge={roles.isJudge}
            votedBattles={votedBattles}
            fetchVotedBattlesIndices={fetchVotedBattlesIndices}
            battles={battles}
            beatboxers={beatboxers}
            judges={judges}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            setBattle={setBattle}
            setBattlePoints={setBattlePoints}
            battle={battle}
            battlePoints={battlePoints}
          />
        </TabPanel>
        <TabPanel>
          {beatboxers.length > 0 && (
            <MyBattles
              fetchVotedBattlesIndices={fetchVotedBattlesIndices}
              isJudge={roles.isJudge}
              votedBattles={votedBattles}
              beatboxers={beatboxers}
              battles={battles.filter(
                (battle) =>
                  beatboxers[battle.beatboxerOne.beatboxerId.toNumber()]
                    .attributes.userAddress === user?.get('ethAddress') ||
                  beatboxers[battle.beatboxerTwo.beatboxerId.toNumber()]
                    .attributes.userAddress === user?.get('ethAddress')
              )}
              onOpen={onOpen}
              setBattle={setBattle}
              setBattlePoints={setBattlePoints}
            />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
