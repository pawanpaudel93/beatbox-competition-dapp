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
    }
}