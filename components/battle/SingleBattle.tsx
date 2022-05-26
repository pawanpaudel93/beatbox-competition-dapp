import {
  Grid,
  GridItem,
  Box,
  Center,
  Badge,
  Heading,
  VStack,
  Text,
  HStack,
  Tag,
  TagLabel,
  Button,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { IBattle, IPoint } from '../../interfaces'
import { VoteModal } from './VoteModal'
import { getBeatboxCompetition, getCategoryByState } from '../../utils'
import { ethers } from 'ethers'

export default function SingleBattle({
  battle,
  contractAddress,
  isJudge,
  isVoted,
  fetchVotedBattlesIndices,
  onOpen,
  setBattlePoints,
}: {
  battle: IBattle
  contractAddress: string
  isJudge: boolean
  isVoted: boolean
  fetchVotedBattlesIndices: () => Promise<void>
  onOpen: () => void
  setBattlePoints: (battlePoints: IPoint[]) => void
}) {
  const NOT_WINNER = ethers.BigNumber.from('16')
  const Video = ({ videoId }: { videoId: string }) => {
    return (
      <Box
        borderWidth="1px"
        overflow="hidden"
        as="iframe"
        p={1}
        src={'https://www.youtube.com/embed/' + videoId}
        width="100%"
        allowFullScreen
        sx={{
          aspectRatio: '16/9',
        }}
      />
    )
  }
  const Winner = ({ battle }: { battle: IBattle }) => {
    if (battle.winnerId.eq(NOT_WINNER)) {
      return (
        <Text>
          Winner: <Tag>Not yet</Tag>
        </Text>
      )
    } else if (battle.winnerId.eq(battle.beatboxerOne.beatboxerId)) {
      return (
        <Text>
          Winner: <Tag>BeatBoxerOne</Tag>
        </Text>
      )
    } else {
      return (
        <Text>
          Winner: <Tag>BeatBoxerTwo</Tag>
        </Text>
      )
    }
  }

  const fetchBattlePoints = async (battle: IBattle) => {
    try {
      const beatboxCompetition = getBeatboxCompetition(contractAddress)
      const battlePoints = await beatboxCompetition.getBattlePoints(battle.id)
      setBattlePoints(battlePoints)
      onOpen()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <HStack align="center" p={2}>
      <Tag colorScheme="blue" variant="outline">
        <TagLabel fontSize="xl" p={1}>
          {battle.id + 1}
        </TagLabel>
      </Tag>
      <Grid
        width="100%"
        m={2}
        templateColumns="repeat(3, 1fr)"
        gap={6}
        bg="blue.300"
      >
        <GridItem w="100%">
          <Video videoId={battle.beatboxerOne.ytVideoId} />
          <Center>
            <Text fontSize="sm">
              Points: <Tag>{battle.beatboxerOne.score.toString()}</Tag>
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
                    {getCategoryByState(battle.state)}
                  </Badge>
                </Heading>
              </Box>
              <Box p={0} alignSelf="center">
                <Text>
                  Start:{' '}
                  {dayjs(battle.startTime.toNumber() * 1000).format(
                    'MMM DD hh:mm A'
                  )}
                </Text>
                <Text>
                  End:{' '}
                  {dayjs(battle.endTime.toNumber() * 1000).format(
                    'MMM DD hh:mm A'
                  )}
                </Text>
                <Winner battle={battle} />
              </Box>
              <Box pt={2} alignSelf="center">
                <VoteModal
                  battle={battle}
                  contractAddress={contractAddress}
                  isDisabled={!battle.winnerId.eq(NOT_WINNER) || !isJudge}
                  fetchVotedBattlesIndices={fetchVotedBattlesIndices}
                  isVoted={isVoted}
                />
              </Box>

              <Button onClick={(e) => fetchBattlePoints(battle)} mt={6}>
                View Judge Points
              </Button>
            </VStack>
          </Center>
        </GridItem>
        <GridItem w="100%">
          <Box display="flex" justifyContent="end">
            <Video videoId={battle.beatboxerTwo.ytVideoId} />
          </Box>
          <Center>
            <Text fontSize="sm" justifySelf="center">
              Points: <Tag>{battle.beatboxerTwo.score.toString()}</Tag>
            </Text>
          </Center>
        </GridItem>
      </Grid>
    </HStack>
  )
}
