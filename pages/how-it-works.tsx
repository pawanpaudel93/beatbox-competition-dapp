import {
  Center,
  Container,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'

const WorkingConcept: NextPage = () => {
  const texts = [
    'A competition creator/organizer creates a competition and starts the wildcard submission and also adds judges to judge the competition',
    'Beatboxers submit their name and wildcard Youtube video url or upload the video itself',
    'The competition wildcard submission is ended by clicking the end wildcard submission button in the settings. And now its the work of the judges to select Top 16 wildacards each.',
    'Creator/oranizer should get the subscription for Chainlink VRF and also register chainlink keepers for the competition contract. And its information can be found on the settings tab for the creator.',
    'Creator then finalizes the 16 beatbox wildcards and add it to the contract and contract calculates the 8 random battles for the Top 16 round.',
    'Now the admin can start the battle funding the required amount for the battle and judges can vote till the battle time period which can be set by the organisor/creator.',
    'The winner is then awarded the prize money when the battle is overby the contract and creator can start the next battle.',
    'This continues till the state of the competition changes from Top 16 to Top 8, Top 8 to Semifinal, Semifinal to final and the competition is completed after the final winner is selected.',
  ]
  return (
    <Container maxW="3xl">
      <Heading
        fontWeight={600}
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        lineHeight={'110%'}
        textAlign={'center'}
      >
        How it{' '}
        <Text as={'span'} color={'blue.400'}>
          works?
        </Text>
      </Heading>

      <Center>
        <OrderedList spacing={4} fontSize="xl" pt="6">
          {texts.map((text, index) => (
            <ListItem key={index}>{text}</ListItem>
          ))}
        </OrderedList>
      </Center>
    </Container>
  )
}

export default WorkingConcept
