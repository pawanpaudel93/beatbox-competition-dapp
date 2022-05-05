import type { NextPage } from 'next'
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

import FileUpload from '../components/FileUpload'
const CreateCompetition: NextPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')

  const clearForm = () => {
    setName('')
    setDescription('')
    setImage('')
  }

  const handleImageCallback = (image: string) => {
    setImage(image)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <Container padding={2}>
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
        <FileUpload handleImageCallback={handleImageCallback} />
        <Center>
          <ButtonGroup padding={3} variant="outline" spacing="6">
            <Button type="submit" colorScheme="blue">
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
