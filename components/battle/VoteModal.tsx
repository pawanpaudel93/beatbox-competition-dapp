import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Heading,
  Divider,
  Box,
  Badge,
  Button,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { IBattle } from '../../interfaces'
import { BBX_COMPETITION_ABI } from '../../constants'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'
import { BigNumber } from 'ethers'

export function VoteModal({
  battle,
  contractAddress,
}: {
  battle: IBattle
  contractAddress: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { Moralis } = useMoralis()
  const beatboxers = battle.name.split(' V/S ')
  const point = {
    originality: 0,
    pitchAndTiming: 0,
    complexity: 0,
    enjoymentOfListening: 0,
    video: 0,
    audio: 0,
    battle: 0,
    extraPoint: 0,
  }
  const [pointOne, setPointOne] = useState(point)
  const [pointTwo, setPointTwo] = useState(point)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const options = {
        contractAddress,
        abi: BBX_COMPETITION_ABI,
        functionName: 'voteBattle',
        params: {
          battleId: battle.id,
          point1: Object.entries(pointOne).reduce((acc, [key, value]) => {
            acc[key] = BigNumber.from(value.toString())
            return acc
          }, {}),
          point2: Object.entries(pointTwo).reduce((acc, [key, value]) => {
            acc[key] = BigNumber.from(value.toString())
            return acc
          }, {}),
        },
      }
      console.log(options)
      const voteBattleTx = await Moralis.executeFunction(options)
      await voteBattleTx.wait()
      toast.success('Voted Successfully')
      onClose()
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>, point = 'one') => {
    if (point === 'one') {
      setPointOne({
        ...pointOne,
        [e.target.name]: Number(
          e.target.validity.valid ? e.target.value : pointOne[e.target.name]
        ),
      })
    } else {
      setPointTwo({
        ...pointTwo,
        [e.target.name]: Number(
          e.target.validity.valid ? e.target.value : pointTwo[e.target.name]
        ),
      })
    }
  }

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Vote
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Vote {battle.name}
            <Badge ml="1" fontSize="0.8em" colorScheme="green" textColor="red">
              {battle.category}
            </Badge>
          </ModalHeader>
          <ModalCloseButton />
          <form onSubmit={onSubmit}>
            <ModalBody pb={6}>
              <HStack spacing={4}>
                <Box w="100%">
                  <Heading fontSize="xl" mb={2}>
                    {beatboxers[0]}
                  </Heading>
                  <FormControl>
                    <FormLabel>Originality</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      value={pointOne.originality}
                      placeholder="Originality Point"
                      name="originality"
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Pitch & Timing</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Pitch & Timing Point"
                      value={pointOne.pitchAndTiming}
                      name="pitchAndTiming"
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Enjoyment of Listening</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Enjoyment of Listening Point"
                      value={pointOne.enjoymentOfListening}
                      name="enjoymentOfListening"
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Video</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Video Point"
                      value={pointOne.video}
                      name="video"
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Audio</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Audio Point"
                      value={pointOne.audio}
                      name="audio"
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Battle</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Battle Point"
                      value={pointOne.battle}
                      name="battle"
                      onChange={onChange}
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Extra Point</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Extra Point"
                      value={pointOne.extraPoint}
                      name="extraPoint"
                      onChange={onChange}
                    />
                  </FormControl>
                </Box>
                <Divider orientation="vertical" />
                <Box w="100%">
                  <Heading fontSize="xl" mb={2}>
                    {beatboxers[1]}
                  </Heading>
                  <FormControl>
                    <FormLabel>Originality</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      value={pointTwo.originality}
                      placeholder="Originality Point"
                      name="originality"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e, 'two')
                      }
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Pitch & Timing</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Pitch & Timing Point"
                      value={pointTwo.pitchAndTiming}
                      name="pitchAndTiming"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e, 'two')
                      }
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Enjoyment of Listening</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Enjoyment of Listening Point"
                      value={pointTwo.enjoymentOfListening}
                      name="enjoymentOfListening"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e, 'two')
                      }
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Video</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Video Point"
                      value={pointTwo.video}
                      name="video"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e, 'two')
                      }
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Audio</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Audio Point"
                      value={pointTwo.audio}
                      name="audio"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e, 'two')
                      }
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Battle</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Battle Point"
                      value={pointTwo.battle}
                      name="battle"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e, 'two')
                      }
                    />
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Extra Point</FormLabel>
                    <Input
                      type="text"
                      pattern="[0-1]*"
                      placeholder="Extra Point"
                      value={pointTwo.extraPoint}
                      name="extraPoint"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onChange(e, 'two')
                      }
                    />
                  </FormControl>
                </Box>
              </HStack>
            </ModalBody>

            <ModalFooter justifyContent="center">
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={isLoading}
              >
                Vote
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
