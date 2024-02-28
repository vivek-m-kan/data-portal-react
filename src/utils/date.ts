export const today = () => new Date()

export const format = (format: string, date: Date | null) => {
  date = date ?? new Date()
  const day = date.getDay()
  const month = date.getMonth()
  const year = date.getMonth()

  return `${day}-${month}-${year}`
}
