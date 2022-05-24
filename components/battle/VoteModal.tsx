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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'
import { IBattle } from '../../interfaces'
import { BBX_COMPETITION_ABI } from '../../constants'
import { getCategoryByState } from '../../utils'

export function VoteModal({
  battle,
  contractAddress,
  isDisabled,
  isVoted,
}: {
  battle: IBattle
  contractAddress: string
  isDisabled: boolean
  isVoted: boolean
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { Moralis } = useMoralis()
  const { user } = useMoralis()
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
          point1: {
            ...pointOne,
            votedFor: battle.beatboxerOne.beatboxerAddress,
            votedBy: user?.get('ethAddress'),
          },
          point2: {
            ...pointTwo,
            votedFor: battle.beatboxerTwo.beatboxerAddress,
            votedBy: user?.get('ethAddress'),
          },
        },
      }
      const voteBattleTx = await Moralis.executeFunction(options)
      await voteBattleTx.wait()
      toast.success('Voted Successfully')
      onClose()
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  return (
    <>
      <Button
        colorScheme="green"
        onClick={onOpen}
        isDisabled={isDisabled || isVoted}
      >
        {isVoted ? 'Voted' : 'Vote'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Vote {battle.name}
            <Badge ml="1" fontSize="0.8em" colorScheme="green" textColor="red">
              {getCategoryByState(battle.state)}
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
                    <NumberInput
                      defaultValue={pointOne.originality}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointOne({
                          ...pointOne,
                          originality: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Pitch & Timing</FormLabel>
                    <NumberInput
                      defaultValue={pointOne.pitchAndTiming}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointOne({
                          ...pointOne,
                          originality: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Enjoyment of Listening</FormLabel>
                    <NumberInput
                      defaultValue={pointOne.enjoymentOfListening}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointOne({
                          ...pointOne,
                          enjoymentOfListening: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Video</FormLabel>
                    <NumberInput
                      defaultValue={pointOne.video}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointOne({
                          ...pointOne,
                          video: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Audio</FormLabel>
                    <NumberInput
                      defaultValue={pointOne.audio}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointOne({
                          ...pointOne,
                          audio: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Battle</FormLabel>
                    <NumberInput
                      defaultValue={pointOne.battle}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointOne({
                          ...pointOne,
                          battle: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Extra Point</FormLabel>
                    <NumberInput
                      defaultValue={pointOne.extraPoint}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointOne({
                          ...pointOne,
                          extraPoint: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Box>
                <Divider orientation="vertical" />
                <Box w="100%">
                  <Heading fontSize="xl" mb={2}>
                    {beatboxers[1]}
                  </Heading>
                  <FormControl>
                    <FormLabel>Originality</FormLabel>
                    <NumberInput
                      defaultValue={pointTwo.originality}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointTwo({
                          ...pointTwo,
                          originality: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Pitch & Timing</FormLabel>
                    <NumberInput
                      defaultValue={pointTwo.pitchAndTiming}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointTwo({
                          ...pointTwo,
                          pitchAndTiming: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Enjoyment of Listening</FormLabel>
                    <NumberInput
                      defaultValue={pointTwo.enjoymentOfListening}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointTwo({
                          ...pointTwo,
                          enjoymentOfListening: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Video</FormLabel>
                    <NumberInput
                      defaultValue={pointTwo.video}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointTwo({
                          ...pointTwo,
                          video: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Audio</FormLabel>
                    <NumberInput
                      defaultValue={pointTwo.audio}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointTwo({
                          ...pointTwo,
                          audio: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Battle</FormLabel>
                    <NumberInput
                      defaultValue={pointTwo.battle}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointTwo({
                          ...pointTwo,
                          battle: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl mt={2}>
                    <FormLabel>Extra Point</FormLabel>
                    <NumberInput
                      defaultValue={pointTwo.extraPoint}
                      min={0}
                      max={1}
                      onChange={(valueString: string) =>
                        setPointTwo({
                          ...pointTwo,
                          extraPoint: parseInt(valueString),
                        })
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
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
                isDisabled={isDisabled}
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
