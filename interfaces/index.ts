import { BigNumber } from "ethers"

export interface ICompetition {
    name: string
    description: string
    imageURI: string
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
    id: number
    name: string
    state: number
    winningAmount: BigNumber
    winnerAddress: string
    startTime: BigNumber
    endTime: BigNumber
    totalVotes: BigNumber
    beatboxerOne: {
        score: number
        beatboxerAddress: string
        ytVideoId: string
        likeCount: BigNumber
    }
    beatboxerTwo: {
        score: number
        beatboxerAddress: string
        ytVideoId: string
        likeCount: BigNumber
    }
}