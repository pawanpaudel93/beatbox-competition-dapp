import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  HStack,
} from '@chakra-ui/react'
import Moralis from 'moralis/types'
import dayjs from 'dayjs'
import Video from '../Video'

export default function UpdateDetailModal({
  update,
}: {
  update: Moralis.Object<Moralis.Attributes>
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button mt={1} variant="outline" onClick={onOpen} colorScheme="blue">
        Read More
      </Button>
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor="blue.500">Update Detail</ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody bgColor="gray.300">
            <Container maxW={'7xl'}>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}
              >
                <Stack spacing={{ base: 6, md: 10 }}>
                  <Box as={'header'}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
                    >
                      {update.attributes.title}
                    </Heading>
                    <HStack spacing={6}>
                      <Text
                        color={useColorModeValue('gray.900', 'gray.400')}
                        fontWeight={300}
                      >
                        Created:{' '}
                        {dayjs(update.attributes.createdAt).format(
                          'MMM D, YYYY h:mm A'
                        )}
                      </Text>
                      <Text colorScheme="gray">
                        Updated:{' '}
                        {dayjs(update.attributes.updatedAt).format(
                          'MMM D, YYYY h:mm A'
                        )}
                      </Text>
                    </HStack>
                  </Box>

                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                      />
                    }
                  >
                    <Text fontSize={'lg'}>{update.attributes.description}</Text>
                  </Stack>
                </Stack>
                {update.attributes.videoUrl && (
                  <Flex>
                    <Box
                      width="100%"
                      w={'100%'}
                      h={{ base: '100%', sm: '400px', lg: '500px' }}
                    >
                      <Video videoUrl={update.attributes.videoUrl} />
                    </Box>
                  </Flex>
                )}
              </SimpleGrid>
            </Container>
          </ModalBody>
          <ModalFooter bgColor="blue.500">
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
