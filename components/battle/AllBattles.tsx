import { Alert, AlertIcon, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IBattle } from '../../interfaces'
import SingleBattle from './SingleBattle'
interface AllBattlesProps {
  isJudge: boolean
  votedBattles: { [key: number]: boolean }
  battles: IBattle[]
  fetchVotedBattlesIndices: () => Promise<void>
}

export default function AllBattles({
  isJudge,
  votedBattles,
  battles,
  fetchVotedBattlesIndices,
}: AllBattlesProps) {
  const router = useRouter()
  const { contractAddress } = router.query

  if (battles.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        No Battles yet.
      </Alert>
    )
  }

  return (
    <>
      {battles.map((battle, index) => (
        <SingleBattle
          key={index}
          battle={battle}
          contractAddress={contractAddress as string}
          isJudge={isJudge}
          isVoted={votedBattles[battle.id]}
          fetchVotedBattlesIndices={fetchVotedBattlesIndices}
        />
      ))}
    </>
  )
}
