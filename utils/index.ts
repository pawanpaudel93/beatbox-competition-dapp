import { ethers } from "ethers"
import { BBX_COMPETITION_ABI } from "../constants"

export const getCategoryByState = (state: number) => {
    switch (state) {
        case 3:
            return 'Top 16'
        case 4:
            return 'Top 8'
        case 5:
            return 'Semi Final'
        case 6:
            return 'Final'
        default:
            return 'Not Started'
    }
}

export const getBeatboxCompetition = (address: string) => {
    const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
    return new ethers.Contract(address, BBX_COMPETITION_ABI, provider)
}