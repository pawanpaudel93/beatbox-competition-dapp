import { Box, Button, Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ICompetition } from '../../interfaces'

interface Props {
  competition: ICompetition
}

export default function Competition({ competition }: Props) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="blue.400"
      overflow="hidden"
    >
      <Image
        src={competition.imageURI}
        alt={competition.name}
        h={200}
        w="full"
      />
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
          as="h6"
          lineHeight="tight"
          isTruncated
        >
          {competition.description}
        </Box>

        <NextLink
          href={'/competitions/' + competition.contractAddress}
          passHref
        >
          <Button size="sm" colorScheme="blue">
            View
          </Button>
        </NextLink>
      </Box>
    </Box>
  )
}
