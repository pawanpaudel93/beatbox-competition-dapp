import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import CreateWildcard from './CreateWildcard'
import AllWildcards from './AllWildcards'
import MyWildcard from './MyWildcard'
import WildcardWinners from './WildcardWinners'
import { ICompetition } from '../../interfaces'

interface WildcardsProps {
  competition: ICompetition
}

export default function Wildcards({ competition }: WildcardsProps) {
  return (
    <Tabs>
      <TabList>
        <Tab>Submit Wildcard</Tab>
        <Tab>All Wildcards</Tab>
        <Tab>Selected Wildcards</Tab>
        <Tab>My Wildcard</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CreateWildcard competition={competition} />
        </TabPanel>
        <TabPanel>
          <AllWildcards />
        </TabPanel>
        <TabPanel>
          <WildcardWinners />
        </TabPanel>
        <TabPanel>
          <MyWildcard competition={competition} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
