import { BigNumber } from "ethers"


export interface IRoles {
    isAdmin: boolean
    isHelper: boolean
    isJudge: boolean
}
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
    winnerId: BigNumber
    startTime: BigNumber
    endTime: BigNumber
    totalVotes: BigNumber
    beatboxerOne: {
        score: number
        beatboxerId: BigNumber
        ytVideoId: string
        likeCount: BigNumber
    }
    beatboxerTwo: {
        score: number
        beatboxerId: BigNumber
        ytVideoId: string
        likeCount: BigNumber
    }
}

export interface IPoint {
    originality: number
    pitchAndTiming: number
    complexity: number
    enjoymentOfListening: number
    video: number
    audio: number
    battle: number
    extraPoint: number
    votedBy: string
    votedFor: BigNumber
}