export const formatDate = (date: Date) : string => {
    const dateString = (date as Date).toDateString()
    return `${dateString}`
}