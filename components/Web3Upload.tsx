import { useDropzone } from 'react-dropzone'
import {
  Center,
  useColorModeValue,
  Icon,
  Container,
  VStack,
} from '@chakra-ui/react'
import { AiFillFileAdd } from 'react-icons/ai'
import { useState } from 'react'
import {} from '@chakra-ui/icons'

interface Web3UploadProps {
  onFileChange: (file: File) => void
}

export default function Web3Upload({ onFileChange }: Web3UploadProps) {
  const [fileName, setFileName] = useState('')
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setFileName(acceptedFiles[0].name)
      onFileChange(acceptedFiles[0])
    },
    accept: {
      'video/*': [
        '.mp4',
        '.mov',
        '.avi',
        '.flv',
        '.wmv',
        '.m4v',
        '.3gp',
        '.mkv',
      ],
    },
    maxFiles: 1,
    multiple: false,
  })

  const dropText = isDragActive
    ? 'Drop the files here ...'
    : "Drag 'n' drop video here, or click to select video"

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
        <input {...getInputProps()} required={true} />
        <Icon as={AiFillFileAdd} mr={2} />
        <p>{dropText}</p>
      </Center>
      {fileName && (
        <Center>
          <VStack mt={3}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="red"
              className="bi bi-film"
              viewBox="0 0 16 16"
            >
              <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
            </svg>
            <p>{fileName}</p>
          </VStack>
        </Center>
      )}
    </Container>
  )
}
