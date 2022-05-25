import {
  Box,
  Heading,
  StackDivider,
  VStack,
  HStack,
  IconButton,
  Alert,
  AlertIcon,
  Center,
  Spinner,
  Text,
} from '@chakra-ui/react'
import UpdateModal from './UpdateModal'
import UpdateDetailModal from './UpdateDetailModal'
import { useMoralisQuery } from 'react-moralis'
import dayjs from 'dayjs'
import { EditIcon } from '@chakra-ui/icons'
import competitions from '../../pages/competitions'

export default function Updates() {
  const {
    data: updates,
    isFetching,
    isLoading,
    error,
  } = useMoralisQuery('Update', (query) => query.descending('createdAt'), [], {
    autoFetch: true,
    live: true,
  })

  if (isLoading || isFetching) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          m={4}
        />
        <Text>Fetching updates...</Text>
      </Center>
    )
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error fetching updates: {error.message}
      </Alert>
    )
  } else if (updates.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        No updates yet.
      </Alert>
    )
  }

  return (
    <Box padding={3}>
      <UpdateModal />
      <VStack
        padding={3}
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {updates.map((update, index) => (
          <HStack spacing={3} key={index}>
            <Box fontWeight="bold">{index + 1})</Box>
            <Box width="100%" p={5} shadow="md" borderWidth="1px">
              <HStack spacing={3}>
                <Box width="95%">
                  <Heading fontSize="xl">{update.attributes.title}</Heading>
                  <HStack spacing={6}>
                    <Text fontSize="sm" colorScheme="gray">
                      Created:{' '}
                      {dayjs
                        .utc(update.attributes.createdAt)
                        .format('MMM D, YYYY h:mm A')}
                    </Text>
                    <Text fontSize="sm" colorScheme="gray">
                      Updated:{' '}
                      {dayjs
                        .utc(update.attributes.updatedAt)
                        .format('MMM D, YYYY h:mm A')}
                    </Text>
                  </HStack>
                  <Text mt={4}>
                    {update.attributes.description.length > 100
                      ? update.attributes.description.slice(0, 100) + '...'
                      : update.attributes.description}
                  </Text>
                </Box>
                {/* <IconButton icon={<EditIcon />} aria-label="Edit" /> */}
              </HStack>
              <UpdateDetailModal update={update} />
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}
