import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import { toast } from 'react-toastify'

export default function Contribute({
  address,
  buttonName,
  contributedTo,
}: {
  address: string
  buttonName: string
  contributedTo: string
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [amount, setAmount] = useState(0)
  const [name, setName] = useState('Anonymous')
  const [isLoading, setIsLoading] = useState(false)
  const { Moralis, user } = useMoralis()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const options = {
        type: 'native',
        amount: Moralis.Units.ETH(amount),
        receiver: address,
      }
      const result = await Moralis.transfer(options)
      await result.wait()
      const Support = Moralis.Object.extend('Support')
      const support = new Support()
      support.set('name', name)
      support.set('amount', amount)
      support.set('address', address)
      support.set('userAddress', user?.get('ethAddress'))
      await support.save()
      toast.success('Thank you for your support!')
    } catch (error) {
      console.log(error)
      if (error?.data?.message) {
        toast.error(error.data.message)
      } else {
        toast.error(error.message)
      }
    }
    onClose()
    setIsLoading(false)
  }

  const close = () => {
    setAmount(0)
    setName('Anonymous')
    onClose()
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        {buttonName}
      </Button>

      <Modal onClose={close} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Support {contributedTo}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <FormControl isRequired my={3}>
                <FormLabel htmlFor="name">Your Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired my={3}>
                <FormLabel htmlFor="amount">Amount</FormLabel>
                <InputGroup>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <InputRightAddon>MATIC</InputRightAddon>
                </InputGroup>
              </FormControl>

              <Center>
                <Button
                  type="submit"
                  mt={4}
                  colorScheme="blue"
                  isLoading={isLoading}
                  isDisabled={amount == 0}
                >
                  Support
                </Button>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
