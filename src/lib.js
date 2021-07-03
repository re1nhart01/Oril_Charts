export const dateParser = (timestamp, localtime = 0) => {
    const parser = new Date(Date.parse(timestamp))
    const day = parser.getDay() === 0 ? 1 : parser.getDay()
    const month = parser.getMonth() === 0 ? 1 : parser.getMonth()
    return `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${localtime === 1 ?month + 1 : month}.${parser.getFullYear()}`
}

export function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

export const Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]