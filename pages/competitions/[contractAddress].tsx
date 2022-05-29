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
import { ethers } from 'ethers'
import Wildcards from '../../components/wildcard/Wildcards'
import Judges from '../../components/judge/Judges'
import CompetitionInfo from '../../components/competition/CompetitionInfo'
import { BBX_COMPETITION_ABI } from '../../constants'
import { ICompetition, IRoles } from '../../interfaces'
import { useMoralis } from 'react-moralis'
import Battles from '../../components/battle/Battles'
import Settings from '../../components/setting/Settings'
import Updates from '../../components/updates/Updates'
import { getBeatboxCompetition } from '../../utils'
import Supports from '../../components/support/Supports'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const ContractDetail: NextPage = () => {
  const router = useRouter()
  const { user, Moralis } = useMoralis()
  const [competition, setCompetition] = useState<ICompetition>({
    name: '',
    description: '',
    imageURI: '',
    competitionState: 0,
  })
  const [roles, setRoles] = useState<IRoles>({
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
    try {
      const beatboxCompetition = getBeatboxCompetition(
        contractAddress as string
      )
      const metadata = await beatboxCompetition.metaData()
      setCompetition({
        name: ethers.utils.parseBytes32String(metadata.name),
        description: metadata.description,
        imageURI: metadata.imageURI,
        competitionState: metadata.competitionState,
      })
    } catch (e) {
      console.log(e)
    }
  }

  const fetchRoles = async () => {
    try {
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
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Tabs>
      <TabList>
        <Tab>Info</Tab>
        <Tab>Wildcards</Tab>
        <Tab>Judges</Tab>
        <Tab>Battles</Tab>
        <Tab>Updates</Tab>
        <Tab>Supporters</Tab>
        {roles.isAdmin && <Tab>Settings</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel>
          <Center>
            <CompetitionInfo competition={competition} roles={roles} />
          </Center>
        </TabPanel>
        <TabPanel>
          <Wildcards competition={competition} roles={roles} />
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
        <TabPanel>
          <Updates roles={roles} />
        </TabPanel>
        <TabPanel>
          <Supports />
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
