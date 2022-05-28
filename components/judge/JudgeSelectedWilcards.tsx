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

export default function JudgeSelectedWilcards({
  judge,
}: {
  judge: Moralis.Object<Moralis.Attributes>
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { contractAddress } = router.query
  const { data: wildcards } = useMoralisQuery(
    'WildcardWinners',
    (query) =>
      query.equalTo('judgeAddress', judge.attributes.userAddress) &&
      query.equalTo('contractAddress', contractAddress),
    [judge.attributes.userAddress, contractAddress],
    {
      autoFetch: true,
      live: true,
    }
  )

  return (
    <Box>
      <Button color="blue" onClick={onOpen}>
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
            {wildcards.length > 0 ? (
              <VStack
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
                        <Box
                          as="iframe"
                          src={
                            wildcard.attributes.videoUrl.indexOf('youtube') > 0
                              ? 'https://www.youtube.com/embed/' +
                                wildcard.attributes.videoUrl.split('=').pop()
                              : wildcard.attributes.videoUrl
                          }
                          width="20%"
                          height="20%"
                          allowFullScreen
                          sx={{
                            aspectRatio: '16/9',
                          }}
                        />
                      </HStack>
                    </Box>
                  </HStack>
                ))}
              </VStack>
            ) : (
              <Alert status="info">
                <AlertIcon />
                No wildcards selected.
              </Alert>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
