import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

interface DeleteConfirmProps {
  onConfirm: ({ args }: { [key: string]: string }) => Promise<void>
  buttonName: string
  buttonColor: string
  args: { [key: string]: string }
}

export default function DeleteConfirm({
  onConfirm,
  buttonName,
  buttonColor,
  args,
}: DeleteConfirmProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClick = () => {
    onConfirm(args)
    onClose()
  }

  return (
    <>
      <Button onClick={onOpen}>{buttonName}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Confirmation!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Are you sure you want to remove this?</ModalBody>

          <ModalFooter>
            <Button onClick={onClick} colorScheme={buttonColor} mr={3}>
              Remove
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
