import { ethers } from "ethers"
import { BBX_COMPETITION_ABI } from "../constants"
import { toast } from "react-toastify"

export const getCategoryByState = (state: number) => {
    switch (state) {
        case 0:
            return "Wildcard submissions is not started"
        case 1:
            return "Accepting wildcard submissions"
        case 2:
            return "Wildcards Selections"
        case 3:
            return 'Top 16'
        case 4:
            return 'Top 8'
        case 5:
            return 'Semi Final'
        case 6:
            return 'Final'
    }
}

export const getBeatboxCompetition = (address: string) => {
    const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
    return new ethers.Contract(address, BBX_COMPETITION_ABI, provider)
}

export const errorLogging = (error: unknown) => {
    if (error?.data?.message) {
        toast.error(error.data.message)
    } else {
        toast.error(error?.message)
    }
}