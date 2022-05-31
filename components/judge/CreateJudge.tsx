import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Center,
  Input,
  Container,
  FormHelperText,
} from '@chakra-ui/react'
import { FormEvent, useState, ChangeEvent } from 'react'
import { useNewMoralisObject } from 'react-moralis'
import Moralis from 'moralis'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ethers } from 'ethers'
import { BBX_COMPETITION_ABI } from '../../constants'
import { useAuthentication } from '../../context/AuthenticationContext'
import { errorLogging } from '../../utils'

export default function CreateJudge() {
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const { save } = useNewMoralisObject('Judge')
  const router = useRouter()
  const { getReadyForTransaction } = useAuthentication()
  const { contractAddress } = router.query

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (isError) return
    setIsLoading(true)
    const data = {
      name,
      contractAddress,
      userAddress: address.toLowerCase(),
    }
    const Judge = Moralis.Object.extend('Judge')
    const query = new Moralis.Query(Judge)
    query.equalTo('contractAddress', contractAddress)
    query.equalTo('userAddress', address)
    const judge = await query.find()
    if (judge.length == 0) {
      try {
        await getReadyForTransaction()
        const options = {
          contractAddress: contractAddress as string,
          functionName: 'addJudge',
          abi: BBX_COMPETITION_ABI,
          params: {
            judgeAddress: address,
            _name: ethers.utils.formatBytes32String(name),
          },
        }
        const addTx = await Moralis.executeFunction(options)
        await addTx.wait()
        await save(data)
        toast.success('Judge added successfully!')
        clearForm()
      } catch (error) {
        errorLogging(error)
      }
    } else {
      toast.error('You already added the judge!')
    }
    setIsLoading(false)
  }

  const clearForm = () => {
    setName('')
    setAddress('')
  }

  return (
    <Container padding={2}>
      <Center>
        <h1>Add a Judge</h1>
      </Center>
      <form onSubmit={onSubmit}>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="judge-name">Name</FormLabel>
          <Input
            id="judge-name"
            placeholder="Judge Name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </FormControl>
        <FormControl padding={3} isRequired isInvalid={isError}>
          <FormLabel htmlFor="judge-address">Address</FormLabel>
          <Input
            id="judge-address"
            placeholder="Judge Wallet Address"
            value={address}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAddress(e.target.value)
              setIsError(!ethers.utils.isAddress(e.target.value))
            }}
          />
          {isError && (
            <FormHelperText color="red">
              Please enter a valid address
            </FormHelperText>
          )}
        </FormControl>
        <Center>
          <ButtonGroup padding={3} variant="outline" spacing="6">
            <Button type="submit" colorScheme="blue" isLoading={isLoading}>
              Add
            </Button>
            <Button onClick={clearForm}>Cancel</Button>
          </ButtonGroup>
        </Center>
      </form>
    </Container>
  )
}
