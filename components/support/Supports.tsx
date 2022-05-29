import {
  Center,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useMoralisQuery } from 'react-moralis'

export default function Supports() {
  const router = useRouter()
  const { contractAddress } = router.query
  const {
    data: supports,
    isFetching,
    isLoading,
    error,
  } = useMoralisQuery(
    'Support',
    (query) => query.equalTo('address', contractAddress),
    [contractAddress],
    {
      autoFetch: true,
      live: true,
    }
  )
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
        <Text>Fetching supporters...</Text>
      </Center>
    )
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error fetching judges: {error.message}
      </Alert>
    )
  } else if (supports.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        Supports are welcome!
      </Alert>
    )
  }
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>
          Thank you to all our well wishers and supporters!
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Supporter Name</Th>
            <Th>Amount (MATIC)</Th>
            <Th>Supported Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {supports.map((support, index) => (
            <Tr key={index}>
              <Td>{support.attributes.name}</Td>
              <Td>{support.attributes.amount}</Td>
              <Td>
                {dayjs(support.attributes.createdAt).format(
                  'MMM DD YYYY hh:mm A'
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
