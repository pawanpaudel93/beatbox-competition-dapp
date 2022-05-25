import { ICompetition } from '../../interfaces'
import {
  Box,
  Container,
  Stack,
  Image,
  Flex,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Editable,
  EditableTextarea,
  EditablePreview,
  ButtonGroup,
  IconButton,
  useEditableControls,
  Textarea,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons'
import { toast } from 'react-toastify'
import { BBX_COMPETITION_ABI } from '../../constants'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
interface CompetitionInfoProps {
  competition: ICompetition
}

export default function CompetitionInfo({ competition }: CompetitionInfoProps) {
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { Moralis } = useMoralis()
  const router = useRouter()
  const { contractAddress } = router.query

  useEffect(() => {
    setDescription(competition.description)
  }, [competition.description])

  const changeDescription = async () => {
    // e.preventDefault()
    try {
      setIsLoading(true)
      const options = {
        contractAddress: contractAddress as string,
        abi: BBX_COMPETITION_ABI,
        functionName: 'setDescription',
        params: {
          description: description,
        },
      }
      const setDescriptionTx = await Moralis.executeFunction(options)
      await setDescriptionTx.wait()
      toast.success('Description changed!')
    } catch (error) {
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          isLoading={isLoading}
        />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              textAlign="center"
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
            >
              {competition.name}
            </Heading>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              />
            }
          >
            <Editable
              textAlign="center"
              value={description}
              onChange={(value: string) => setDescription(value)}
              onSubmit={changeDescription}
              fontSize="lg"
              isPreviewFocusable={false}
              placeholder="Competition Description"
            >
              <EditablePreview />
              <Textarea as={EditableTextarea} />
              <EditableControls />
            </Editable>
          </Stack>
        </Stack>
        <Flex>
          <Image
            rounded={'md'}
            alt={competition.name}
            src={competition.imageURI}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}
