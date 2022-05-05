import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Center,
  useColorModeValue,
  Icon,
  Image,
  Box,
  Container,
} from '@chakra-ui/react'
import { AiFillFileAdd } from 'react-icons/ai'

type FileUploadProps = {
  handleImageCallback: (image: string) => void
}

export default function Dropzone({ handleImageCallback }: FileUploadProps) {
  const [file, setFile] = useState({
    name: '',
    preview: '',
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile({
        preview: URL.createObjectURL(acceptedFiles[0]),
        name: acceptedFiles[0].name,
      })
      handleImageCallback('hello')
    },
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.svg'],
    },
    maxFiles: 1,
    multiple: false,
  })

  const dropText = isDragActive
    ? 'Drop the files here ...'
    : "Drag 'n' drop image here, or click to select files"

  const activeBg = useColorModeValue('gray.100', 'gray.600')
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500'
  )

  return (
    <Container>
      <Center
        p={10}
        cursor="pointer"
        bg={isDragActive ? activeBg : 'transparent'}
        _hover={{ bg: activeBg }}
        transition="background-color 0.2s ease"
        borderRadius={4}
        border="3px dashed"
        borderColor={borderColor}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon as={AiFillFileAdd} mr={2} />
        <p>{dropText}</p>
      </Center>
      {file.preview && (
        <Box marginTop={3}>
          <Image src={file.preview} alt={file.name} w="100%" />
        </Box>
      )}
    </Container>
  )
}
