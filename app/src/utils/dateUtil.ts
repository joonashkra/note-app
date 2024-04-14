export const formatDate = (date: Date) => {
    const dateString = (date as Date).toDateString()
    return `${dateString}`
}