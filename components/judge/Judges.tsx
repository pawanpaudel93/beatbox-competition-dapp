import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import CreateJudge from './CreateJudge'
import AllJudges from './AllJudges'
import { ICompetition } from '../../interfaces'

interface WildcardsProps {
  competition: ICompetition
}

export default function Judges({ competition }: WildcardsProps) {
  return (
    <Tabs>
      <TabList>
        <Tab>Add Judge</Tab>
        <Tab>All Judges</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CreateJudge />
        </TabPanel>
        <TabPanel>
          <AllJudges />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
