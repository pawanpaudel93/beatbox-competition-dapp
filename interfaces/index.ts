import { BigNumber } from "ethers"

export interface ICompetition {
    name: string
    description: string
    image: string
    contractAddress?: string
    creator?: string
    competitionId?: BigNumber
    wildcardStart: BigNumber
    wildcardEnd: BigNumber
}