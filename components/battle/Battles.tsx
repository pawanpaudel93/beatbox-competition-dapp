import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import StartBattle from './StartBattle'
import AllBattles from './AllBattles'
import MyBattles from './MyBattles'
import { ICompetition } from '../../interfaces'

interface BattlesProps {
  competition: ICompetition
}

export default function Battles({ competition }: BattlesProps) {
  return (
    <Tabs>
      <TabList>
        <Tab>Start Battle</Tab>
        <Tab>All Battles</Tab>
        <Tab>My Battle</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <StartBattle competition={competition} />
        </TabPanel>
        <TabPanel>
          <AllBattles />
        </TabPanel>
        <TabPanel>
          <MyBattles competition={competition} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
