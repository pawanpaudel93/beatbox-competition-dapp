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
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import { BBX_COMPETITION_ABI } from '../../constants'
import { useMoralis } from 'react-moralis'
import Moralis from 'moralis'

type Item = {
  value: string
  label: string
  address: string
}

type SelectWinnersProps = {
  wildcards: Moralis.Object<Moralis.Attributes>[]
  updateWildcardsCallback: () => void
  contractAddress: string
}

export default function SelectWinners({
  wildcards,
  updateWildcardsCallback,
  contractAddress,
}: SelectWinnersProps) {
  const seedData = wildcards.map((wildcard) => ({
    label: wildcard.attributes.name,
    value: wildcard.id,
    address: wildcard.attributes.userAddress,
  }))
  const { Moralis } = useMoralis()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pickerItems, setPickerItems] = useState<Item[]>(seedData)
  const [selectedItems, setSelectedItems] = useState<Item[]>([])

  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item])
    setSelectedItems((curr) => [...curr, item])
  }

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const wildcardToUpdate = selectedItems.map((item, index) => ({
        filter: { objectId: item.value },
        update: { isWinner: true, rank: index + 1 },
      }))
      await Moralis.Cloud.run('selectWinners', { query: wildcardToUpdate })
      const addresses = selectedItems.map((item) => item.address)
      const names = selectedItems.map((item) => item.label)
      const options = {
        contractAddress,
        functionName: 'addBeatboxers',
        abi: BBX_COMPETITION_ABI,
        params: {
          beatboxerAddresses: addresses,
          _names: names,
        },
      }
      const addBeatboxersTx = await Moralis.executeFunction(options)
      await addBeatboxersTx.wait()
      updateWildcardsCallback()
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }

  return (
    <Box>
      <div className="flex justify-end">
        <Button color="blue" onClick={onOpen}>
          Select winners
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select wildcard winners</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container padding={2}>
              <form onSubmit={onSubmit}>
                <CUIAutoComplete
                  label="Choose preferred wildcards"
                  placeholder="Type a wildcard beatboxer name"
                  onCreateItem={handleCreateItem}
                  items={pickerItems}
                  selectedItems={selectedItems}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                  }
                />
                <Center>
                  <ButtonGroup padding={3} variant="outline" spacing="6">
                    <Button type="submit" colorScheme="blue">
                      Select
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
