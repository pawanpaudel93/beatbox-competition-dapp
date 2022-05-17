export const getCategoryByState = (state: number) => {
    switch (state) {
        case 2:
            return 'Top 16'
        case 3:
            return 'Top 8'
        case 4:
            return 'Semi Final'
        case 5:
            return 'Final'
    }
}