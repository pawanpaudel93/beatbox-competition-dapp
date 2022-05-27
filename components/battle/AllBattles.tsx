import { Alert, AlertIcon } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { IBattle, IPoint } from '../../interfaces'
import SingleBattle from './SingleBattle'
import BattlePointsModal from './BattlePointsModal'
import Moralis from 'moralis'
interface AllBattlesProps {
  isJudge: boolean
  votedBattles: { [key: number]: boolean }
  battles: IBattle[]
  fetchVotedBattlesIndices: () => Promise<void>
  beatboxers: Moralis.Object<Moralis.Attributes>[]
  judges: { [key: string]: string }
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  battlePoints: IPoint[]
  setBattlePoints: (battlePoints: IPoint[]) => void
  battle: IBattle | undefined
  setBattle: (battle: IBattle) => void
}

export default function AllBattles({
  isJudge,
  votedBattles,
  battles,
  fetchVotedBattlesIndices,
  beatboxers,
  judges,
  isOpen,
  onOpen,
  onClose,
  battlePoints,
  setBattlePoints,
  battle,
  setBattle,
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
          beatboxers={beatboxers}
          contractAddress={contractAddress as string}
          isJudge={isJudge}
          isVoted={votedBattles[battle.id]}
          fetchVotedBattlesIndices={fetchVotedBattlesIndices}
          onOpen={onOpen}
          setBattlePoints={setBattlePoints}
          setBattle={setBattle}
        />
      ))}
      {battle && (
        <BattlePointsModal
          battle={battle}
          battlePoints={battlePoints}
          beatboxers={beatboxers}
          judges={judges}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  )
}
