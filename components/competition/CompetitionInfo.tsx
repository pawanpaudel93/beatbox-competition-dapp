import { Box, Image } from '@chakra-ui/react'
import { ICompetition } from '../../interfaces'
import { BigNumber } from 'ethers'

interface CompetitionInfoProps {
  competition: ICompetition
}

export default function CompetitionInfo({ competition }: CompetitionInfoProps) {
  const formatDate = (date: BigNumber) => {
    const dateObj = new Date(parseInt(date.toString()) * 1000)
    return dateObj.toISOString().split('T')[0]
  }
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={competition.image} alt={competition.name} />

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {competition.name}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {competition.description}
        </Box>

        <Box>
          Wildcard Submission:
          <Box as="span" color="gray.600" fontSize="sm">
            {' '}
            {formatDate(competition.wildcardStart)} {' to '}
            {formatDate(competition.wildcardEnd)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
