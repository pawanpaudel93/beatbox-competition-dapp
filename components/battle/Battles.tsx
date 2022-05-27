import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { BigNumber, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import StartBattle from './StartBattle'
import AllBattles from './AllBattles'
import MyBattles from './MyBattles'
import { ICompetition } from '../../interfaces'
import { BBX_COMPETITION_ABI } from '../../constants'
import { IBattle } from '../../interfaces'
import { getBeatboxCompetition } from '../../utils'
import Moralis from 'moralis'
import { toast } from 'react-toastify'
interface BattlesProps {
  competition: ICompetition
  isJudge: boolean
  isAdmin: boolean
}

export default function Battles({
  competition,
  isJudge,
  isAdmin,
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

  const fetchVotedBattlesIndices = async () => {
    try {
      const options = {
        contractAddress: contractAddress as string,
        functionName: 'getVotedBattlesIndices',
        abi: BBX_COMPETITION_ABI,
        params: {
          judge: user?.get('ethAddress') as string,
        },
      }
      const votedBattlesIndices = (await Moralis.executeFunction(
        options
      )) as number[]
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

      const battles = await beatboxCompetition.getAllBattles()
      const _battles: IBattle[] = (battles as IBattle[]).map((battle, id) => ({
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
      }))
      setBattles(_battles)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAllBeatboxers = async () => {
    try {
      const Wildcard = Moralis.Object.extend('Wildcard')
      const query = new Moralis.Query(Wildcard)
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
          toast.success('Latest battle winner selected')
          fetchAllBattles()
          setLatestBlockNumber(beatboxCompetition)
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
        {isAdmin && <Tab>Start Battle</Tab>}
        <Tab>All Battles</Tab>
        <Tab>My Battle</Tab>
      </TabList>

      <TabPanels>
        {isAdmin && (
          <TabPanel>
            <StartBattle
              competition={competition}
              fetchAllBattles={fetchAllBattles}
            />
          </TabPanel>
        )}
        <TabPanel>
          <AllBattles
            isJudge={isJudge}
            votedBattles={votedBattles}
            fetchVotedBattlesIndices={fetchVotedBattlesIndices}
            battles={battles}
            beatboxers={beatboxers}
            judges={judges}
          />
        </TabPanel>
        <TabPanel>
          {beatboxers.length > 0 && (
            <MyBattles
              fetchVotedBattlesIndices={fetchVotedBattlesIndices}
              isJudge={isJudge}
              votedBattles={votedBattles}
              battles={battles.filter(
                (battle) =>
                  beatboxers[battle.beatboxerOne.beatboxerId.toNumber()]
                    .attributes.userAddress === user?.get('ethAddress') ||
                  beatboxers[battle.beatboxerTwo.beatboxerId.toNumber()]
                    .attributes.userAddress === user?.get('ethAddress')
              )}
            />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
