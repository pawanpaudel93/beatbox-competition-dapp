import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Center,
  Input,
  Container,
  Textarea,
} from '@chakra-ui/react'
import { useMoralisFile } from 'react-moralis'
import FileUpload from '../components/FileUpload'
import { useContract, useSigner } from 'wagmi'
import {
  COMPETITION_FACTORY_ADDRESS,
  COMPETITION_FACTORY_ABI,
} from '../constants'

const CreateCompetition: NextPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File>()
  const [clearImage, setClearImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const today = new Date().toISOString().split('T')[0]
  const [wildcardStart, setWildcardStart] = useState(today)
  const [wildcardEnd, setWildcardEnd] = useState(today)

  const { saveFile } = useMoralisFile()

  const router = useRouter()

  const clearForm = () => {
    setName('')
    setDescription('')
    setImage(undefined)
    setClearImage(true)
    setIsLoading(false)
    setWildcardStart(today)
    setWildcardEnd(today)
  }

  const handleImageCallback = (image: File) => {
    setImage(image)
  }
  const handleImageClearCallback = (clearImage: boolean) => {
    setClearImage(clearImage)
  }

  const { data: signer } = useSigner()

  const competitionContract = useContract({
    addressOrName: COMPETITION_FACTORY_ADDRESS,
    contractInterface: COMPETITION_FACTORY_ABI,
    signerOrProvider: signer,
  })

  const uploadFile = async () => {
    const fileIpfs = (await saveFile(image?.name as string, image as File, {
      saveIPFS: true,
    })) as unknown as { _ipfs: string }
    return fileIpfs._ipfs
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const imageUrl = await uploadFile()
      const _wildcardStart = Math.floor(
        new Date(wildcardStart).getTime() / 1000
      )
      const _wildcardEnd = Math.floor(new Date(wildcardEnd).getTime() / 1000)
      const competitionTx = await competitionContract.createCompetition(
        name,
        description,
        imageUrl,
        _wildcardStart,
        _wildcardEnd
      )
      await competitionTx.wait()
      clearForm()
      setIsLoading(false)
      router.push('/my-competitions')
    } catch (e) {
      setIsLoading(false)
      console.log(e)
    }
  }

  return (
    <Container padding={2}>
      <Center>
        <h1>Create Beatbox Competition</h1>
      </Center>
      <form onSubmit={onSubmit}>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="competition-name">Name</FormLabel>
          <Input
            id="competition-name"
            placeholder="Competition Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="competition-description">Description</FormLabel>
          <Textarea
            id="competition-description"
            placeholder="Competition Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="wildcard-start">Wildcard Start Date</FormLabel>
          <Input
            type="date"
            id="wildcard-start"
            placeholder="Wildcard Start Date"
            value={wildcardStart}
            onChange={(e) => setWildcardStart(e.target.value)}
          />
        </FormControl>

        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="wildcard-end">Wildcard End Date</FormLabel>
          <Input
            type="date"
            id="wildcard-end"
            placeholder="Wildcard End Date"
            value={wildcardEnd}
            onChange={(e) => setWildcardEnd(e.target.value)}
          />
        </FormControl>

        <FileUpload
          handleImageCallback={handleImageCallback}
          handleImageClearCallback={handleImageClearCallback}
          clearImage={clearImage}
          isRequired={true}
        />
        <Center>
          <ButtonGroup padding={3} variant="outline" spacing="6">
            <Button type="submit" colorScheme="blue" isLoading={isLoading}>
              Create
            </Button>
            <Button onClick={clearForm}>Cancel</Button>
          </ButtonGroup>
        </Center>
      </form>
    </Container>
  )
}

export default CreateCompetition
