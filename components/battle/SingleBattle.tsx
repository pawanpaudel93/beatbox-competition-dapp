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
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { IBattle } from '../../interfaces'
import { VoteModal } from './VoteModal'
import { getCategoryByState } from '../../utils'
import { ethers } from 'ethers'

export default function SingleBattle({
  battle,
  contractAddress,
  isJudge,
  isVoted,
}: {
  battle: IBattle
  contractAddress: string
  isJudge: boolean
  isVoted: boolean
}) {
  const AddressZero = ethers.constants.AddressZero
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
    if (battle.winnerAddress === AddressZero) {
      return (
        <Text>
          Winner: <Tag>Not yet</Tag>
        </Text>
      )
    } else if (battle.winnerAddress === battle.beatboxerOne.beatboxerAddress) {
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
                <Winner battle={battle} />
              </Box>
              <Box pt={2} alignSelf="center">
                <VoteModal
                  battle={battle}
                  contractAddress={contractAddress}
                  isDisabled={AddressZero !== battle.winnerAddress || !isJudge}
                  isVoted={isVoted}
                />
              </Box>
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
