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
import CompetitionInfo from '../../components/competition/CompetitionInfo'
import { BBX_COMPETITION_ABI } from '../../constants'
import { useProvider } from 'wagmi'
import { ICompetition } from '../../interfaces'
import { BigNumber, Contract } from 'ethers'

const ContractDetail: NextPage = () => {
  const router = useRouter()
  const provider = useProvider()
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
    const contract = new Contract(
      contractAddress as string,
      BBX_COMPETITION_ABI,
      provider
    )
    const metadata = await contract.metaData()
    setCompetition(metadata as unknown as ICompetition)
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Info</Tab>
        <Tab>Wildcards</Tab>
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
      </TabPanels>
    </Tabs>
  )
}

export default ContractDetail
