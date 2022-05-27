import { Alert, AlertIcon } from '@chakra-ui/react'
import Moralis from 'moralis/types'
import { useRouter } from 'next/router'
import { IBattle, IPoint } from '../../interfaces'
import SingleBattle from './SingleBattle'
interface AllBattlesProps {
  isJudge: boolean
  votedBattles: { [key: number]: boolean }
  battles: IBattle[]
  fetchVotedBattlesIndices: () => Promise<void>
  beatboxers: Moralis.Object<Moralis.Attributes>[]
  onOpen: () => void
  setBattle: (battle: IBattle) => void
  setBattlePoints: (battlePoints: IPoint[]) => void
}

export default function MyBattles({
  isJudge,
  votedBattles,
  battles,
  beatboxers,
  fetchVotedBattlesIndices,
  onOpen,
  setBattle,
  setBattlePoints,
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
          beatboxers={beatboxers}
          onOpen={onOpen}
          setBattle={setBattle}
          setBattlePoints={setBattlePoints}
        />
      ))}
    </>
  )
}
