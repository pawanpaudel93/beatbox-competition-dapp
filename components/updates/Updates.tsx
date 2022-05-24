import {
  Box,
  Heading,
  StackDivider,
  VStack,
  Text,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import UpdateModal from './UpdateModal'
import UpdateDetailModal from './UpdateDetailModal'
import { useMoralisQuery } from 'react-moralis'
import dayjs from 'dayjs'
import { EditIcon } from '@chakra-ui/icons'

export default function Updates() {
  const {
    data: updates,
    isFetching,
    isLoading,
    error,
  } = useMoralisQuery('Update', (query) => query, [], {
    autoFetch: true,
    live: true,
  })

  if (isLoading) {
    return <div>Loading updates...</div>
  } else if (isFetching) {
    return <div>Fetching updates...</div>
  } else if (error) {
    return <div>Error fetching updates: {error.message}</div>
  } else if (updates.length === 0) {
    return <div>No updates found</div>
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
