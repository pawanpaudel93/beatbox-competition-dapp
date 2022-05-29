import { ICompetition, IRoles } from '../../interfaces'
import {
  Box,
  Container,
  Stack,
  Image,
  Tag,
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
  Center,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { CloseIcon, CheckIcon, EditIcon } from '@chakra-ui/icons'
import { toast } from 'react-toastify'
import { BBX_COMPETITION_ABI } from '../../constants'
import { useMoralis } from 'react-moralis'
import { useRouter } from 'next/router'
import { getCategoryByState } from '../../utils'
import Contribute from '../modals/Contribute'
interface CompetitionInfoProps {
  competition: ICompetition
  roles: IRoles
}

export default function CompetitionInfo({
  competition,
  roles,
}: CompetitionInfoProps) {
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { Moralis } = useMoralis()
  const router = useRouter()
  const { contractAddress } = router.query

  useEffect(() => {
    setDescription(competition.description)
  }, [competition.description])

  const changeDescription = async () => {
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
      const Competition = Moralis.Object.extend('Competition')
      const query = new Moralis.Query(Competition)
      query.equalTo('contractAddress', contractAddress)
      const competition = await query.first()
      if (competition) {
        competition.set('description', description)
        await competition.save()
      }
      toast.success('Description changed!')
    } catch (error) {
      toast.error(error.message)
      setDescription(competition.description)
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
      {roles.isAdmin && (
        <Alert status="info">
          <AlertIcon />
          You are the{' '}
          <Tag mx={2} variant="outline" colorScheme="blue">
            ADMIN
          </Tag>{' '}
          of this competition.
        </Alert>
      )}
      {roles.isJudge && (
        <Alert status="info">
          <AlertIcon />
          You are a{' '}
          <Tag mx={2} variant="outline" colorScheme="blue">
            JUDGE
          </Tag>{' '}
          of this competition.
        </Alert>
      )}
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 18 }}
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
            <Center justifyItems="center">
              Current stage:{' '}
              <Tag ml={2} variant="outline" colorScheme="blue">
                {getCategoryByState(competition.competitionState)}
              </Tag>
            </Center>
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
          <Contribute
            address={contractAddress as string}
            buttonName={'Support ' + competition.name}
            contributedTo={competition.name}
          />
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
