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
} from '@chakra-ui/react'
import { FormEvent, useState } from 'react'
import { useNewMoralisObject, useMoralis } from 'react-moralis'
import Moralis from 'moralis'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ICompetition } from '../../interfaces'

interface CreateWildcardProps {
  competition: ICompetition
}

export default function CreateWildcard({ competition }: CreateWildcardProps) {
  const [name, setName] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { save } = useNewMoralisObject('Wildcard')
  const { user } = useMoralis()
  const router = useRouter()
  const { contractAddress } = router.query

  const wildcardStarted =
    parseInt(competition.wildcardStart.toString()) * 1000 <=
    new Date().getTime()
  const wildcardEnded =
    parseInt(competition.wildcardEnd.toString()) * 1000 <= new Date().getTime()
  const isDisabled = !wildcardStarted || wildcardEnded

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const data = {
      name,
      videoUrl,
      contractAddress,
      userAddress: user?.attributes.ethAddress,
      isWinner: false,
    }
    const Wildcard = Moralis.Object.extend('Wildcard')
    const query = new Moralis.Query(Wildcard)
    query.equalTo('contractAddress', contractAddress)
    query.equalTo('userAddress', user?.attributes.ethAddress)
    const wildcard = await query.find()
    if (wildcard.length == 0) {
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

  return (
    <Container padding={2}>
      <Center>
        <h1>Create Beatbox Wildcard</h1>
      </Center>
      <form onSubmit={onSubmit}>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="competition-name">Name</FormLabel>
          <Input
            id="beatboxer-name"
            placeholder="Beatboxer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl padding={3} isRequired>
          <FormLabel htmlFor="youtube-url">URL</FormLabel>
          <Input
            id="youtube-url"
            placeholder="Youtube URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </FormControl>

        <Center>
          <ButtonGroup padding={3} variant="outline" spacing="6">
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              disabled={isDisabled}
            >
              Create
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
