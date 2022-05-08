import { useMoralis } from 'react-moralis'
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  Container,
  Center,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import Moralis from 'moralis'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

type UpdateWildcardProps = {
  wildcard: {
    id: string
    attributes: {
      name: string
      videoUrl: string
      contractAddress: string
      userAddress: string
    }
  }
  fetchCallback: () => void
}

export default function UpdateWildcard({
  wildcard,
  fetchCallback,
}: UpdateWildcardProps & Moralis.Object<Moralis.Attributes>) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = useState(wildcard.attributes.name)
  const [videoUrl, setVideoUrl] = useState(wildcard.attributes.videoUrl)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useMoralis()
  const router = useRouter()
  const { contractAddress } = router.query

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setIsLoading(true)
      const Wildcard = Moralis.Object.extend('Wildcard')
      const query = new Moralis.Query(Wildcard)
      query.equalTo('contractAddress', contractAddress)
      query.equalTo('userAddress', user?.attributes.ethAddress)
      const wildcard = await query.first()
      wildcard?.set('name', name)
      wildcard?.set('videoUrl', videoUrl)
      await wildcard?.save()
      toast.success('Wildcard updated')
      fetchCallback()
    } catch (error) {
      toast.error('Error updating wildcard')
    }
    setIsLoading(false)
    onClose()
  }

  const clearForm = () => {
    setName(wildcard.attributes.name)
    setVideoUrl(wildcard.attributes.videoUrl)
  }

  return (
    <>
      <Button onClick={onOpen}>Update</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Wildcard</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container padding={2}>
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
                    >
                      Update
                    </Button>
                    <Button onClick={clearForm}>Cancel</Button>
                  </ButtonGroup>
                </Center>
              </form>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
