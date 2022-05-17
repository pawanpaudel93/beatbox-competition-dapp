import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import StartBattle from './StartBattle'
import AllBattles from './AllBattles'
import MyBattles from './MyBattles'
import { ICompetition } from '../../interfaces'
import { BBX_COMPETITION_ABI } from '../../constants'

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

  useEffect(() => {
    if (contractAddress && user?.get('ethAddress')) {
      fetchVotedBattlesIndices()
    }
  }, [user?.get('ethAddress'), contractAddress])

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
            <StartBattle competition={competition} />
          </TabPanel>
        )}
        <TabPanel>
          <AllBattles isJudge={isJudge} votedBattles={votedBattles} />
        </TabPanel>
        <TabPanel>
          <MyBattles competition={competition} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
