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
import { IRoles } from '../../interfaces'

type Item = {
  value: string
  label: string
  wildcard: Moralis.Object<Moralis.Attributes>
}

type SelectWinnersProps = {
  wildcards: Moralis.Object<Moralis.Attributes>[]
  roles: IRoles
  contractAddress: string
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
        toast.error(e.message)
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
      <div className="flex justify-end">
        <Button color="blue" onClick={onOpen}>
          Select winners
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
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
