import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Center,
  Input,
  Container,
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
  Switch,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNewMoralisObject, useMoralis } from 'react-moralis'
import Moralis from 'moralis'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ICompetition } from '../../interfaces'
import { CompetitionState } from '../../constants'
import Web3Upload from './../Web3Upload'

interface CreateWildcardProps {
  competition: ICompetition
}

export default function CreateWildcard({ competition }: CreateWildcardProps) {
  const [name, setName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isYoutube, setIsYoutube] = useState(true)
  const { save } = useNewMoralisObject('Wildcard')
  const { user } = useMoralis()
  const router = useRouter()
  const { contractAddress } = router.query
  const wildcardStarted =
    competition.competitionState >= CompetitionState.WILDCARD
  const wildcardEnded = competition.competitionState > CompetitionState.WILDCARD

  const isDisabled = !wildcardStarted || wildcardEnded

  const uploadToWeb3 = async () => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('/api/web3upload', {
        method: 'POST',
        body: formData,
      })
      const responseJson = await response.json()
      setIsUploading(false)
      return responseJson.videoUrl
    } catch (e) {
      console.log(e)
      setIsUploading(false)
      toast.error('Error uploading file to web3')
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const Wildcard = Moralis.Object.extend('Wildcard')
    const query = new Moralis.Query(Wildcard)
    query.equalTo('contractAddress', contractAddress)
    query.equalTo('userAddress', user?.attributes.ethAddress)
    const wildcard = await query.find()
    if (wildcard.length == 0) {
      let web3VideoUrl
      if (file && !isYoutube) {
        web3VideoUrl = await uploadToWeb3()
      }
      if (!web3VideoUrl && !videoUrl) {
        setIsLoading(false)
        return
      }
      const data = {
        name,
        videoUrl: isYoutube ? videoUrl : web3VideoUrl,
        contractAddress,
        userAddress: user?.attributes.ethAddress,
        isWinner: false,
        rank: null,
      }
      console.log(data)
      save(data, {
        onSuccess: (wildcard) => {
          toast.success('Wildcard submitted successfully!')
          clearForm()
        },
        onError: (error) => {
          toast.error(error.message)
        },
        onComplete: () => {
          setIsLoading(false)
        },
      })
    } else {
      toast.error('You already submitted a wildcard')
      setIsLoading(false)
    }
  }

  const clearForm = () => {
    setName('')
    setVideoUrl('')
  }

  const onFileChange = (file: File) => {
    setFile(file)
  }

  return (
    <Container padding={2}>
      <Center>
        <h1>Submit Beatbox Wildcard</h1>
      </Center>
      <form onSubmit={onSubmit}>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="beatboxer-name">Name</FormLabel>
          <Input
            id="beatboxer-name"
            placeholder="Beatboxer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="center">
          <FormLabel htmlFor="is-youtube" mb="0">
            Upload wildcard ?
          </FormLabel>
          <Switch
            id="is-youtube"
            colorScheme="red"
            isChecked={!isYoutube}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setIsYoutube(!e.target.checked)
            }
          />
        </FormControl>

        {isYoutube ? (
          <FormControl padding={3} isRequired>
            <FormLabel htmlFor="youtube-url">URL</FormLabel>
            <Input
              id="youtube-url"
              placeholder="Youtube URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </FormControl>
        ) : (
          <FormControl padding={3} isRequired>
            {isUploading ? (
              <Center>
                <VStack>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    label="Uploading..."
                  />
                  <Text ml={3}>Uploading...</Text>
                </VStack>
              </Center>
            ) : (
              <Web3Upload onFileChange={onFileChange} />
            )}
          </FormControl>
        )}

        <Center>
          <ButtonGroup padding={3} variant="outline" spacing="6">
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              disabled={isDisabled}
            >
              Submit
            </Button>
            <Button onClick={clearForm}>Cancel</Button>
          </ButtonGroup>
        </Center>
      </form>
      {!wildcardStarted && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>Wilcard submission not started.</AlertDescription>
        </Alert>
      )}
      {wildcardEnded && (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>Wilcard submission ended.</AlertDescription>
        </Alert>
      )}
    </Container>
  )
}
