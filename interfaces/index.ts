import { BigNumber } from "ethers"

export interface ICompetition {
    name: string
    description: string
    image: string
    contractAddress?: string
    creator?: string
    competitionId?: BigNumber
    competitionState: number
}

export interface IBeatboxer {
    name: string
    address: string
}

export interface IBattle {
    id: BigNumber
    name: string
    category: number
    winningAmount: BigNumber
    winnerAddress: string
    startTime: BigNumber
    endTime: BigNumber
    totalVotes: BigNumber
    beatboxerOne: {
        score: BigNumber
        beatboxerAddress: string
        videoUrl: string
    }
    beatboxerTwo: {
        score: BigNumber
        beatboxerAddress: string
        videoUrl: string
    }
}