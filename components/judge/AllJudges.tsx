import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Alert,
  AlertIcon,
  Center,
  Spinner,
  Text,
} from '@chakra-ui/react'
import { useMoralisQuery } from 'react-moralis'
import { useRouter } from 'next/router'
import DeleteConfirm from '../modals/DeleteConfirm'
import { useMoralis } from 'react-moralis'
import { BBX_COMPETITION_ABI } from '../../constants'
import { toast } from 'react-toastify'
import JudgeSelectedWilcards from './JudgeSelectedWilcards'
import { useAuthentication } from '../../context/AuthenticationContext'
import { errorLogging } from '../../utils'

export default function AllJudges({ isAdmin }: { isAdmin: boolean }) {
  const router = useRouter()
  const { contractAddress } = router.query
  const { Moralis } = useMoralis()
  const { getReadyForTransaction } = useAuthentication()

  const {
    data: judges,
    isFetching,
    isLoading,
    error,
  } = useMoralisQuery(
    'Judge',
    (query) => query.equalTo('contractAddress', contractAddress),
    [contractAddress],
    {
      autoFetch: true,
      live: true,
    }
  )

  const removeJudge = async ({ judgeAddress }: { judgeAddress?: string }) => {
    const Judge = Moralis.Object.extend('Judge')
    const query = new Moralis.Query(Judge)
    query.equalTo('contractAddress', contractAddress)
    query.equalTo('userAddress', judgeAddress)
    const judge = await query.find()
    if (judge.length > 0) {
      try {
        await getReadyForTransaction()
        const options = {
          contractAddress: contractAddress as string,
          functionName: 'removeJudge',
          abi: BBX_COMPETITION_ABI,
          params: {
            judgeAddress,
          },
        }
        const removeTx = await Moralis.executeFunction(options)
        await removeTx.wait()
        judge[0].destroy()
        toast.success('Judge removed successfully!')
      } catch (error) {
        errorLogging(error)
      }
    } else {
      toast.error('Judge not found!')
    }
  }

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
        <Text>Fetching judges...</Text>
      </Center>
    )
  } else if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error fetching judges: {error.message}
      </Alert>
    )
  } else if (judges.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        No judges yet.
      </Alert>
    )
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              {isAdmin && <Th>Actions</Th>}
              <Th>Voted Wildcards</Th>
            </Tr>
          </Thead>
          <Tbody>
            {judges.map((judge, index) => (
              <Tr key={index}>
                <Td>{judge.attributes.name}</Td>
                <Td>
                  <JudgeSelectedWilcards judge={judge} />
                </Td>
                {isAdmin && (
                  <Td>
                    <DeleteConfirm
                      args={{ judgeAddress: judge.attributes.userAddress }}
                      onConfirm={removeJudge}
                      buttonName="Remove"
                      buttonColor="red"
                    />
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
