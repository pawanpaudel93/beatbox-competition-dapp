import { CUIAutoComplete } from 'chakra-ui-autocomplete'
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
  Box,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { FormEvent, useEffect, useState } from 'react'
import { BBX_COMPETITION_ABI } from '../../constants'
import { useMoralis } from 'react-moralis'
import Moralis from 'moralis'
import { ICompetition, IRoles } from '../../interfaces'
import { getBeatboxCompetition } from '../../utils'

type Item = {
  value: string
  label: string
  wildcard: Moralis.Object<Moralis.Attributes>
}

type SelectWinnersProps = {
  wildcards: Moralis.Object<Moralis.Attributes>[]
  roles: IRoles
  contractAddress: string
  competition: ICompetition
}

export default function SelectWinners({
  wildcards,
  contractAddress,
  roles,
}: SelectWinnersProps) {
  const seedData = wildcards.map((wildcard) => ({
    label: wildcard.attributes.name,
    value: wildcard.id,
    wildcard,
  }))
  const { Moralis, user } = useMoralis()
  const [votedCount, setVotedCount] = useState(0)
  const [judgeCount, setJudgeCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pickerItems, setPickerItems] = useState<Item[]>(seedData)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  const handleCreateItem = (item: Item) => {}

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems && selectedItems.length <= 16) {
      setSelectedItems(selectedItems)
    }
  }

  const fetchJudgeCount = async () => {
    try {
      const beatboxCompetition = getBeatboxCompetition(
        contractAddress as string
      )
      const _judgeCount = (await beatboxCompetition.judgeCount()) as number
      setJudgeCount(_judgeCount)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (contractAddress) {
      fetchVotedJudgeCount()
      fetchJudgeCount()
    }
  }, [contractAddress])

  const fetchVotedJudgeCount = async () => {
    try {
      const count = await Moralis.Cloud.run('judgeVoteCount', {
        contractAddress: contractAddress.toLowerCase(),
      })
      setVotedCount(count)
    } catch (error) {
      console.log(error.message)
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    if (roles.isAdmin) {
      try {
        const wildcardToUpdate = selectedItems.map((item, index) => ({
          filter: { objectId: item.value },
          update: { isWinner: true, rank: index + 1 },
        }))
        await Moralis.Cloud.run('selectWinners', {
          query: wildcardToUpdate,
          contractAddress,
        })
        const addresses = selectedItems.map(
          (item) => item.wildcard.attributes.userAddress
        )
        const names = selectedItems.map((item) => item.label)
        const options = {
          contractAddress,
          functionName: 'addBeatboxers',
          abi: BBX_COMPETITION_ABI,
          params: {
            beatboxerAddresses: addresses,
            names,
          },
        }
        const addBeatboxersTx = await Moralis.executeFunction(options)
        await addBeatboxersTx.wait()
        toast.success('Successfully selected winners!')
        onClose()
      } catch (e) {
        console.log(e)
        if (e?.data?.message) {
          toast.error(e.data.message)
        } else {
          toast.error(e.message)
        }
      }
    } else if (roles.isJudge) {
      try {
        const selectedWildcards = selectedItems.map((item, index) => ({
          update: {
            name: item.wildcard.attributes.name,
            contractAddress: item.wildcard.attributes.contractAddress,
            userAddress: item.wildcard.attributes.userAddress,
            videoUrl: item.wildcard.attributes.videoUrl,
            judgeAddress: user?.get('ethAddress'),
            rank: index + 1,
          },
        }))
        await Moralis.Cloud.run('judgeSelectWinners', {
          query: selectedWildcards,
          contractAddress,
        })
        toast.success('Successfully selected winners!')
        onClose()
      } catch (e) {
        console.log(e)
        toast.error(e.message)
      }
    }
    setIsLoading(false)
  }

  return (
    <Box>
      {(roles.isJudge ||
        (roles.isAdmin && judgeCount.toString() === votedCount.toString())) && (
        <div className="flex justify-end">
          <Button color="blue" onClick={onOpen}>
            Select winners
          </Button>
        </div>
      )}
      {roles.isAdmin && judgeCount?.toString() !== votedCount.toString() && (
        <Alert status="info">
          <AlertIcon />
          <strong>
            Only {votedCount}/{judgeCount?.toString()} judges have selected
            their Top 16 wildcards!
          </strong>
        </Alert>
      )}
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select wildcard winners</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container padding={2}>
              <form onSubmit={onSubmit}>
                <CUIAutoComplete
                  disableCreateItem={true}
                  label="Choose preferred wildcards"
                  placeholder="Type a wildcard beatboxer name"
                  onCreateItem={handleCreateItem}
                  listStyleProps={{ maxH: '300px', overflow: 'scroll' }}
                  items={pickerItems}
                  selectedItems={selectedItems}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                  }
                />
                <Center>
                  <ButtonGroup padding={3} variant="outline" spacing="6">
                    <Button
                      type="submit"
                      colorScheme="blue"
                      isLoading={isLoading}
                      isDisabled={selectedItems.length < 16}
                    >
                      Select Winners
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ButtonGroup>
                </Center>
              </form>
            </Container>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
