import { ICompetition } from '../../interfaces'
import { CompetitionState } from '../../constants'

interface MyBattlesProps {
  competition: ICompetition
}

export default function MyBattles({ competition }: MyBattlesProps) {
  const wildcardStarted =
    CompetitionState.WILDCARD === competition.competitionState
  const wildcardEnded =
    competition.competitionState !== CompetitionState.WILDCARD &&
    competition.competitionState !== CompetitionState.NOT_STARTED

  const isDisabled = !wildcardStarted || wildcardEnded

  return <>No Battles yet!</>
}
