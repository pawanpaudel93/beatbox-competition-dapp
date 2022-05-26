import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tfoot,
  Text,
  Center,
  Divider,
  Box,
} from '@chakra-ui/react'
import { IPoint } from '../../interfaces'
import Moralis from 'moralis'

interface BattlePointsModalProps {
  isOpen: boolean
  onClose: () => void
  battlePoints: IPoint[]
  beatboxers: Moralis.Object<Moralis.Attributes>[]
  judges: { [key: string]: string }
}

export default function BattlePointsModal({
  isOpen,
  onClose,
  battlePoints,
  beatboxers,
  judges,
}: BattlePointsModalProps) {
  const getTotalPoints = (point: IPoint) => {
    return (
      point.originality +
      point.pitchAndTiming +
      point.complexity +
      point.enjoymentOfListening +
      point.video +
      point.audio +
      point.extraPoint
    )
  }

  const PointTable = ({ point }: { point: IPoint }) => {
    return (
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Criteria</Th>
              <Th>Point</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Originality</Td>
              <Td>{point.originality}</Td>
            </Tr>
            <Tr>
              <Td>Pitch & Timing</Td>
              <Td>{point.pitchAndTiming}</Td>
            </Tr>
            <Tr>
              <Td>Complexity</Td>
              <Td>{point.complexity}</Td>
            </Tr>
            <Tr>
              <Td>Enjoyment of Listening</Td>
              <Td>{point.enjoymentOfListening}</Td>
            </Tr>
            <Tr>
              <Td>Video</Td>
              <Td>{point.video}</Td>
            </Tr>
            <Tr>
              <Td>Audio</Td>
              <Td>{point.audio}</Td>
            </Tr>
            <Tr>
              <Td>Extra Point</Td>
              <Td>{point.extraPoint}</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Totals</Th>
              <Th fontSize="xl">{getTotalPoints(point)}</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    )
  }

  const pointsTable = []

  for (let i = 0; i < battlePoints?.length; i += 2) {
    pointsTable.push(
      <Box width="100%" key={i}>
        <Center>
          <Text>
            Voted by: <b>{judges[battlePoints[i].votedBy.toLowerCase()]}</b>
          </Text>
        </Center>
        <HStack>
          <Text width="100%">
            Voted For:{' '}
            <b>
              {beatboxers[battlePoints[i].votedFor.toNumber()].attributes.name}
            </b>
          </Text>
          <Divider />
          <Text width="100%">
            Voted For:{' '}
            <b>
              {
                beatboxers[battlePoints[i + 1].votedFor.toNumber()].attributes
                  .name
              }
            </b>
          </Text>
        </HStack>
        <HStack key={i}>
          <PointTable point={battlePoints?.[i]} />
          <PointTable point={battlePoints?.[i + 1]} />
        </HStack>
        <Divider orientation="horizontal" />
      </Box>
    )
  }
  if (pointsTable.length === 0) {
    pointsTable.push(
      <Center>
        <Text>No battle points have been submitted yet</Text>
      </Center>
    )
  }

  return (
    <>
      <Modal
        size="2xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Battle Points</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{pointsTable}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
