import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import StartBattle from './StartBattle'
import AllBattles from './AllBattles'
import MyBattles from './MyBattles'
import { ICompetition } from '../../interfaces'
import { BBX_COMPETITION_ABI } from '../../constants'
import { IBattle } from '../../interfaces'
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
      console.log(votedBattles)
    } catch (error) {
      console.error(error)
    }
  }

  const bytes11ToString = (videoId: string) => {
    return ethers.utils.parseBytes32String(videoId + '0'.repeat(42))
  }

  const fetchAllBattles = async () => {
    const options = {
      contractAddress: contractAddress as string,
      abi: BBX_COMPETITION_ABI,
      functionName: 'getAllBattles',
      params: [],
    }
    const battles = await Moralis.executeFunction(options)
    const _battles: IBattle[] = (battles as IBattle[]).map((battle, id) => ({
      id,
      name: battle.name,
      state: battle.state,
      winningAmount: battle.winningAmount,
      winnerAddress: battle.winnerAddress,
      startTime: battle.startTime,
      endTime: battle.endTime,
      totalVotes: battle.totalVotes,
      beatboxerOne: {
        score: battle.beatboxerOne.score,
        beatboxerAddress: battle.beatboxerOne.beatboxerAddress,
        ytVideoId: bytes11ToString(battle.beatboxerOne.ytVideoId),
        likeCount: battle.beatboxerOne.likeCount,
      },
      beatboxerTwo: {
        score: battle.beatboxerTwo.score,
        beatboxerAddress: battle.beatboxerTwo.beatboxerAddress,
        ytVideoId: bytes11ToString(battle.beatboxerTwo.ytVideoId),
        likeCount: battle.beatboxerTwo.likeCount,
      },
    }))
    setBattles(_battles)
  }
  useEffect(() => {
    if (contractAddress && user?.get('ethAddress')) {
      fetchVotedBattlesIndices()
    }
  }, [user?.get('ethAddress'), contractAddress])

  useEffect(() => {
    if (contractAddress) fetchAllBattles()
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
          />
        </TabPanel>
        <TabPanel>
          <MyBattles
            fetchVotedBattlesIndices={fetchVotedBattlesIndices}
            isJudge={isJudge}
            votedBattles={votedBattles}
            battles={battles.filter(
              (battle) =>
                battle.beatboxerOne.beatboxerAddress ===
                  user?.get('ethAddress') ||
                battle.beatboxerTwo.beatboxerAddress === user?.get('ethAddress')
            )}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
