import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { BBX_COMPETITION_ABI } from '../../constants'
import { IBattle } from '../../interfaces'
import SingleBattle from './SingleBattle'

interface AllBattlesProps {
  isJudge: boolean
  votedBattles: { [key: number]: boolean }
}

export default function AllBattles({ isJudge, votedBattles }: AllBattlesProps) {
  const router = useRouter()
  const [battles, setBattles] = useState<IBattle[]>([])
  const { contractAddress } = router.query
  const { Moralis } = useMoralis()

  const fetchAllBattles = async () => {
    const options = {
      contractAddress: contractAddress as string,
      abi: BBX_COMPETITION_ABI,
      functionName: 'getAllBattles',
      params: [],
    }
    const battles = await Moralis.executeFunction(options)
    const _battles: IBattle[] = []
    for (const battle of battles as IBattle[]) {
      _battles.push({
        id: battle.id,
        name: battle.name,
        category: battle.category,
        winningAmount: battle.winningAmount,
        winnerAddress: battle.winnerAddress,
        startTime: battle.startTime,
        endTime: battle.endTime,
        totalVotes: battle.totalVotes,
        beatboxerOne: {
          score: battle.beatboxerOne.score,
          beatboxerAddress: battle.beatboxerOne.beatboxerAddress,
          videoUrl: battle.beatboxerOne.videoUrl,
        },
        beatboxerTwo: {
          score: battle.beatboxerTwo.score,
          beatboxerAddress: battle.beatboxerTwo.beatboxerAddress,
          videoUrl: battle.beatboxerTwo.videoUrl,
        },
      })
    }
    setBattles(_battles)
  }

  useEffect(() => {
    if (contractAddress) fetchAllBattles()
  }, [contractAddress])

  if (battles.length === 0) {
    return (
      <Box>
        <h1>No Battles yet.</h1>
      </Box>
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
          isVoted={votedBattles[battle.id.toNumber()]}
        />
      ))}
    </>
  )
}