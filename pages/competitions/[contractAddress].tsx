import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
} from '@chakra-ui/react'
import Wildcards from '../../components/wildcard/Wildcards'
import Judges from '../../components/judge/Judges'
import CompetitionInfo from '../../components/competition/CompetitionInfo'
import { BBX_COMPETITION_ABI } from '../../constants'
import { ICompetition } from '../../interfaces'
import { BigNumber } from 'ethers'
import { useMoralis } from 'react-moralis'

const ContractDetail: NextPage = () => {
  const router = useRouter()
  const { Moralis } = useMoralis()
  const [competition, setCompetition] = useState<ICompetition>({
    name: '',
    description: '',
    image: '',
    wildcardStart: BigNumber.from('0'),
    wildcardEnd: BigNumber.from('0'),
  })
  const { contractAddress } = router.query

  useEffect(() => {
    if (contractAddress) {
      fetchMetaData()
    }
  }, [contractAddress])

  const fetchMetaData = async () => {
    const options = {
      contractAddress: contractAddress as string,
      functionName: 'metaData',
      abi: BBX_COMPETITION_ABI,
      params: {},
    }
    const metadata = await Moralis.executeFunction(options)
    setCompetition(metadata as unknown as ICompetition)
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Info</Tab>
        <Tab>Wildcards</Tab>
        <Tab>Judges</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Center>
            <CompetitionInfo competition={competition} />
          </Center>
        </TabPanel>
        <TabPanel>
          <Wildcards competition={competition} />
        </TabPanel>
        <TabPanel>
          <Judges competition={competition} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default ContractDetail
