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
import { useMoralis } from 'react-moralis'
import Battles from '../../components/battle/Battles'
import Settings from '../../components/setting/Settings'

const ContractDetail: NextPage = () => {
  const router = useRouter()
  const { user, Moralis } = useMoralis()
  const [competition, setCompetition] = useState<ICompetition>({
    name: '',
    description: '',
    image: '',
    competitionState: 0,
  })
  const [roles, setRoles] = useState<{ [key: string]: boolean }>({
    isAdmin: false,
    isHelper: false,
    isJudge: false,
  })
  const { contractAddress } = router.query

  useEffect(() => {
    if (contractAddress) {
      fetchMetaData()
    }
    if (contractAddress && user?.get('ethAddress')) {
      fetchRoles()
    }
  }, [contractAddress, user?.get('ethAddress')])

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

  const fetchRoles = async () => {
    const options = {
      contractAddress: contractAddress as string,
      functionName: 'getRoles',
      abi: BBX_COMPETITION_ABI,
      params: {
        _address: user?.get('ethAddress') as string,
      },
    }
    const _roles = (await Moralis.executeFunction(options)) as boolean[]
    setRoles({
      isAdmin: _roles[0],
      isHelper: _roles[1],
      isJudge: _roles[2],
    })
    console.log(roles)
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Info</Tab>
        <Tab>Wildcards</Tab>
        <Tab>Judges</Tab>
        <Tab>Battles</Tab>
        {roles.isAdmin && <Tab>Settings</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel>
          <Center>
            <CompetitionInfo competition={competition} />
          </Center>
        </TabPanel>
        <TabPanel>
          <Wildcards competition={competition} isAdmin={roles.isAdmin} />
        </TabPanel>
        <TabPanel>
          <Judges competition={competition} isAdmin={roles.isAdmin} />
        </TabPanel>
        <TabPanel>
          <Battles
            competition={competition}
            isJudge={roles.isJudge}
            isAdmin={roles.isAdmin}
          />
        </TabPanel>
        {roles.isAdmin && (
          <TabPanel>
            <Settings competition={competition} fetchMetaData={fetchMetaData} />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}

export default ContractDetail
