import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react'
import { useMoralisQuery } from 'react-moralis'
import { useRouter } from 'next/router'
import DeleteConfirm from '../modals/DeleteConfirm'
import { useMoralis } from 'react-moralis'
import { BBX_COMPETITION_ABI } from '../../constants'
import { toast } from 'react-toastify'

export default function AllJudges() {
  const router = useRouter()
  const { contractAddress } = router.query
  const { Moralis } = useMoralis()

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
    } else {
      toast.error('Judge not found!')
    }
  }

  if (isFetching) {
    return <Box>Fetching judges...</Box>
  } else if (isLoading) {
    return <Box>Loading judges...</Box>
  } else if (error) {
    return <Box>Error fetching judges: {error.message}</Box>
  } else if (judges.length === 0) {
    return <Box>No judges yet</Box>
  }

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {judges.map((judge, index) => (
              <Tr key={index}>
                <Td>{judge.attributes.name}</Td>
                <Td>
                  <DeleteConfirm
                    args={{ judgeAddress: judge.attributes.userAddress }}
                    onConfirm={removeJudge}
                    buttonName="Remove"
                    buttonColor="red"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}
