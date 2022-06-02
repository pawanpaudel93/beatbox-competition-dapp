import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  Box,
  Heading,
  HStack,
  StackDivider,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import Moralis from 'moralis'
import { useRouter } from 'next/router'
import { useMoralisQuery } from 'react-moralis'
import Video from '../Video'

export default function JudgeSelectedWilcards({
  judge,
}: {
  judge: Moralis.Object<Moralis.Attributes>
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { contractAddress } = router.query
  const { data: wildcards, fetch, isFetching, isLoading } = useMoralisQuery(
    'WildcardWinners',
    (query) =>
      query.equalTo('judgeAddress', judge.attributes.userAddress) &&
      query.equalTo('contractAddress', contractAddress),
    [judge.attributes.userAddress, contractAddress],
    {
      autoFetch: false,
    }
  )

  const open = () => {
    fetch()
    onOpen()
  }

  const CustomModalBody = () => {
    if (isLoading || isFetching) {
      return <Box>Loading...</Box>
    } else if (wildcards.length === 0) {
      return (
        <Box>
          <Alert status="info">
            <AlertIcon />
            <strong>No wildcards selected</strong>
          </Alert>
        </Box>
      )
    }
    return (              <VStack
      padding={3}
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {wildcards.map((wildcard, index) => (
        <HStack spacing={3} key={index}>
          <Box fontWeight="bold">{index + 1})</Box>
          <Box width="100%" p={5} shadow="md" borderWidth="1px">
            <HStack spacing={3}>
              <Box width="95%">
                <Heading fontSize="xl">
                  {wildcard.attributes.name}
                </Heading>
              </Box>
              <Box width="20%" height="20%">
                <Video videoUrl={wildcard.attributes.videoUrl} />
              </Box>
            </HStack>
          </Box>
        </HStack>
      ))}
    </VStack>)
  }

  return (
    <Box>
      <Button color="blue" onClick={open}>
        View selected wildcards
      </Button>

      <Modal
        size="3xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selected wildcards</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CustomModalBody />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
