import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import CreateJudge from './CreateJudge'
import AllJudges from './AllJudges'
import { ICompetition } from '../../interfaces'

interface WildcardsProps {
  competition: ICompetition
  isAdmin: boolean
}

export default function Judges({ competition, isAdmin }: WildcardsProps) {
  return (
    <Tabs>
      <TabList>
        {isAdmin && <Tab>Add Judge</Tab>}
        <Tab>All Judges</Tab>
      </TabList>

      <TabPanels>
        {isAdmin && (
          <TabPanel>
            <CreateJudge />
          </TabPanel>
        )}
        <TabPanel>
          <AllJudges />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
