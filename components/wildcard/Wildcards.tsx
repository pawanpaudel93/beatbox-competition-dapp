import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react'
import CreateWildcard from './CreateWildcard'
import AllWildcards from './AllWildcards'
import MyWildcard from './MyWildcard'
import { useRouter } from 'next/router'
import { useMoralisQuery } from 'react-moralis'
import WildcardWinners from './WildcardWinners'
import { ICompetition, IRoles } from '../../interfaces'

interface WildcardsProps {
  competition: ICompetition
  roles: IRoles
}

export default function Wildcards({ competition, roles }: WildcardsProps) {
  const router = useRouter()
  const { contractAddress } = router.query

  const wildcards = useMoralisQuery(
    'Wildcard',
    (query) => query.equalTo('contractAddress', contractAddress),
    [contractAddress],
    {
      autoFetch: true,
      live: true,
    }
  )

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
          <AllWildcards wildcards={wildcards} />
        </TabPanel>
        <TabPanel>
          {wildcards.isFetching ? (
            <Box>Fetching selected wildcards...</Box>
          ) : (
            <WildcardWinners
              competition={competition}
              allWildcards={wildcards.data}
              roles={roles}
            />
          )}
        </TabPanel>
        <TabPanel>
          <MyWildcard competition={competition} allWildcards={wildcards} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
