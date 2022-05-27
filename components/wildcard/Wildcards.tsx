import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Box,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react'
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
          {wildcards.isFetching || wildcards.isLoading ? (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                m={4}
              />
              <Text>Fetching wildcards...</Text>
            </Center>
          ) : (
            <AllWildcards wildcards={wildcards} />
          )}
        </TabPanel>
        <TabPanel>
          {wildcards.isFetching || wildcards.isLoading ? (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
                m={4}
              />
              <Text>Fetching wildcards...</Text>
            </Center>
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
