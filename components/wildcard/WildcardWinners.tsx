import {
  Box,
  Heading,
  HStack,
  StackDivider,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import SelectWinners from './SelectWinners'
import Moralis from 'moralis'
import dayjs from 'dayjs'
import { ICompetition, IRoles } from '../../interfaces'
import Video from '../Video'

interface WildcardWinnersProps {
  allWildcards: Moralis.Object<Moralis.Attributes>[]
  competition: ICompetition
  roles: IRoles
}

export default function WildcardWinners({
  allWildcards,
  roles,
  competition,
}: WildcardWinnersProps) {
  const router = useRouter()
  const { contractAddress } = router.query

  const wildcards = allWildcards.filter((w) => w.attributes.isWinner)

  return (
    <>
      {(roles.isAdmin || roles.isJudge) &&
        contractAddress &&
        allWildcards.length > 0 &&
        wildcards.length === 0 && (
          <SelectWinners
            competition={competition}
            wildcards={allWildcards}
            contractAddress={contractAddress as string}
            roles={roles}
          />
        )}
      {wildcards.length > 0 ? (
        <VStack
          padding={3}
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {wildcards.map((wildcard, index) => (
            <HStack spacing={3} key={index}>
              <Box fontWeight="bold">{index + 1})</Box>
              <Box width="100%" p={5} shadow="md" borderWidth="1px">
                <HStack spacing={3}>
                  <Box width="95%">
                    <Heading fontSize="xl">{wildcard.attributes.name}</Heading>
                    <HStack spacing={6}>
                      <Text fontSize="sm" colorScheme="gray">
                        Submitted:{' '}
                        {dayjs(wildcard.attributes.createdAt).format(
                          'MMM D, YYYY h:mm A'
                        )}
                      </Text>
                      <Text fontSize="sm" colorScheme="gray">
                        Updated:{' '}
                        {dayjs(wildcard.attributes.updatedAt).format(
                          'MMM D, YYYY h:mm A'
                        )}
                      </Text>
                    </HStack>
                  </Box>
                  <Box width="20%" height="20%">
                    <Video videoUrl={wildcard.attributes.videoUrl} />
                  </Box>
                </HStack>
              </Box>
            </HStack>
          ))}
        </VStack>
      ) : (
        <Alert status="info">
          <AlertIcon />
          No winners yet.
        </Alert>
      )}
    </>
  )
}
