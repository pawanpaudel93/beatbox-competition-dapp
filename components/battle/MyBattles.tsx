import { useMoralisQuery, useMoralis } from 'react-moralis'
import { Box, Grid } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { ICompetition } from '../../interfaces'

interface MyBattlesProps {
  competition: ICompetition
}

export default function MyBattles({ competition }: MyBattlesProps) {
  const router = useRouter()
  const { contractAddress } = router.query
  const { user } = useMoralis()
  const wildcardStarted =
    parseInt(competition.wildcardStart.toString()) * 1000 <=
    new Date().getTime()
  const wildcardEnded =
    parseInt(competition.wildcardEnd.toString()) * 1000 <= new Date().getTime()
  const isDisabled = !wildcardStarted || wildcardEnded

  return <></>
}
