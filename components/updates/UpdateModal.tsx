import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  Center,
  ButtonGroup,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Box,
  VStack,
  Spinner,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent } from 'react'
import Web3Upload from '../Web3Upload'
import { useState } from 'react'
import { useNewMoralisObject } from 'react-moralis'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function UpdateModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [update, setUpdate] = useState({
    title: '',
    description: '',
    videoUrl: '',
  })
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isYoutube, setIsYoutube] = useState(true)
  const { save } = useNewMoralisObject('Update')
  const router = useRouter()
  const { contractAddress } = router.query

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
    let web3VideoUrl
    if (file && !isYoutube) {
      web3VideoUrl = await uploadToWeb3()
    }

    save(
      {
        ...update,
        contractAddress,
        videoUrl: update.videoUrl ? update.videoUrl : web3VideoUrl,
      },
      {
        onSuccess: (update) => {
          toast.success('Update added successfully')
          clearForm()
          onClose()
        },
        onError: (error) => {
          toast.error(error.message)
        },
        onComplete: () => {
          setIsLoading(false)
        },
      }
    )
  }

  const clearForm = () => {
    setUpdate({
      title: '',
      description: '',
      videoUrl: '',
    })
    setFile(undefined)
  }

  const onFileChange = (file: File) => {
    setFile(file)
  }

  return (
    <Box>
      <div className="flex justify-end">
        <Button color="blue" onClick={onOpen}>
          Create an Update
        </Button>
      </div>
      <Modal
        size="xl"
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an Update</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <FormControl padding={3} isRequired>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  placeholder="Title"
                  value={update.title}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUpdate((current) => ({
                      ...current,
                      title: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl padding={3} isRequired>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Description"
                  value={update.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setUpdate((current) => ({
                      ...current,
                      description: e.target.value,
                    }))
                  }
                />
              </FormControl>

              <FormControl
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FormLabel htmlFor="is-youtube" mb="0">
                  Upload video ?
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
                <FormControl padding={3}>
                  <FormLabel htmlFor="video-url">Video URL</FormLabel>
                  <Input
                    id="video-url"
                    placeholder="Youtube URL / IPFS URL"
                    value={update.videoUrl}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUpdate((current) => ({
                        ...current,
                        videoUrl: e.target.value,
                      }))
                    }
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
                  >
                    Submit
                  </Button>
                  <Button onClick={clearForm}>Clear</Button>
                </ButtonGroup>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
