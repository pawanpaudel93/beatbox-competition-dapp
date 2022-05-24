import { useEffect, useState } from 'react'
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
  handleImageCallback: (image: File) => void
  handleImageClearCallback: (clearImage: boolean) => void
  clearImage: boolean
  isRequired: boolean
}

export default function Dropzone({
  handleImageCallback,
  handleImageClearCallback,
  clearImage,
  isRequired,
}: FileUploadProps) {
  const defaultImage = {
    name: '',
    preview: '',
  }
  const [file, setFile] = useState(defaultImage)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile({
        preview: URL.createObjectURL(acceptedFiles[0]),
        name: acceptedFiles[0].name,
      })
      handleImageCallback(acceptedFiles[0])
    },
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.svg'],
    },
    maxFiles: 1,
    multiple: false,
  })

  useEffect(() => {
    if (clearImage) {
      setFile(defaultImage)
      handleImageClearCallback(false)
    }
  }, [clearImage])

  const dropText = isDragActive
    ? 'Drop the files here ...'
    : "Drag 'n' drop image here, or click to select image"

  const activeBg = useColorModeValue('gray.100', 'gray.600')
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'gray.300',
    isDragActive ? 'teal.500' : 'gray.500'
  )

  return (
    <Container padding={3}>
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
        <input {...getInputProps()} required={isRequired} />
        <Icon as={AiFillFileAdd} mr={2} />
        <p>{dropText}</p>
      </Center>
      {file.preview && (
        <Box marginTop={3}>
          <Center>
            <Image src={file.preview} alt={file.name} w="50%" h="50%" />
          </Center>
        </Box>
      )}
    </Container>
  )
}
