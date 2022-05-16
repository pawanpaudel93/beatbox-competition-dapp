import {
  Grid,
  GridItem,
  Box,
  Center,
  Badge,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { IBattle } from '../../interfaces'
import { VoteModal } from './VoteModal'

export default function SingleBattle({
  battle,
  contractAddress,
}: {
  battle: IBattle
  contractAddress: string
}) {
  const Video = ({ videoUrl }: { videoUrl: string }) => {
    return (
      <Box
        borderWidth="1px"
        overflow="hidden"
        as="iframe"
        p={1}
        src={'https://www.youtube.com/embed/' + videoUrl.split('=').pop()}
        width="100%"
        allowFullScreen
        sx={{
          aspectRatio: '16/9',
        }}
      />
    )
  }

  return (
    <Grid m={2} templateColumns="repeat(3, 1fr)" gap={6} bg="blue.300">
      <GridItem w="100%">
        <Video videoUrl={battle.beatboxerOne.videoUrl} />
        <Center>
          <Text fontSize="sm">
            Points: {battle.beatboxerOne.score.toString()}
          </Text>
        </Center>
      </GridItem>
      <GridItem w="100%">
        <Center pt={2}>
          <VStack align="stretch" spacing={1}>
            <Box p={0}>
              <Heading fontSize="2xl">
                {battle.name}
                <Badge
                  ml="1"
                  fontSize="0.8em"
                  colorScheme="green"
                  textColor="red"
                >
                  {battle.category}
                </Badge>
              </Heading>
            </Box>
            <Box p={0} alignSelf="center">
              <Text>
                Starting Time:{' '}
                {dayjs(battle.startTime.toNumber() * 1000).format(
                  'MMM DD hh:mm A'
                )}
              </Text>
              <Text>
                Ending Time:{' '}
                {dayjs(battle.endTime.toNumber() * 1000).format(
                  'MMM DD hh:mm A'
                )}
              </Text>
            </Box>
            <Box p={0} alignSelf="center">
              <VoteModal battle={battle} contractAddress={contractAddress} />
            </Box>
          </VStack>
        </Center>
      </GridItem>
      <GridItem w="100%">
        <Video videoUrl={battle.beatboxerTwo.videoUrl} />
        <Center>
          <Text fontSize="sm">
            Points: {battle.beatboxerTwo.score.toString()}
          </Text>
        </Center>
      </GridItem>
    </Grid>
  )
}
