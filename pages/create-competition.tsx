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
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useMoralisFile } from 'react-moralis'
import FileUpload from '../components/FileUpload'
import {
  COMPETITION_FACTORY_ADDRESS,
  COMPETITION_FACTORY_ABI,
} from '../constants'
import { useMoralis } from 'react-moralis'
import { useAuthentication } from '../context/AuthenticationContext'
import { errorLogging } from '../utils'

const CreateCompetition: NextPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File>()
  const [clearImage, setClearImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { getReadyForTransaction, isAuthenticated } = useAuthentication()

  const { Moralis } = useMoralis()

  const { saveFile, isUploading } = useMoralisFile()

  const router = useRouter()

  const clearForm = () => {
    setName('')
    setDescription('')
    setImage(undefined)
    setClearImage(true)
    setIsLoading(false)
  }

  const handleImageCallback = (image: File) => {
    setImage(image)
  }
  const handleImageClearCallback = (clearImage: boolean) => {
    setClearImage(clearImage)
  }

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
      if (!image) throw new Error('No image selected!')
      await getReadyForTransaction()
      if (!isAuthenticated) throw new Error('Please sign in to continue!')
      const imageURI = await uploadFile()
      const options = {
        contractAddress: COMPETITION_FACTORY_ADDRESS,
        functionName: 'createCompetition',
        abi: COMPETITION_FACTORY_ABI,
        params: {
          name: ethers.utils.formatBytes32String(name),
          description,
          imageURI,
        },
      }
      const competitionTx = await Moralis.executeFunction(options)
      await competitionTx.wait()
      clearForm()
      setIsLoading(false)
      router.push('/my-competitions')
    } catch (error) {
      setIsLoading(false)
      errorLogging(error)
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
            maxLength={32}
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
        <FileUpload
          handleImageCallback={handleImageCallback}
          handleImageClearCallback={handleImageClearCallback}
          clearImage={clearImage}
          isUploading={isUploading}
        />

        <Center>
          <ButtonGroup padding={3} variant="outline" spacing="6">
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              isDisabled={!isAuthenticated}
            >
              Create
            </Button>
            <Button onClick={clearForm}>Cancel</Button>
          </ButtonGroup>
        </Center>
      </form>
      {!isAuthenticated && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>
            Please signin to create a competition!
          </AlertDescription>
        </Alert>
      )}
    </Container>
  )
}

export default CreateCompetition
