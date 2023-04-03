export const dateToTimeStamp = (date) => {
  date = new Date(`${date}T00:00:00`)
  let userTimezoneOffset = date.getTimezoneOffset() * 60

  const startTimestamp = date.getTime() / 1000 - userTimezoneOffset
  const endTimestamp = startTimestamp + 24 * 60 * 60

  return [startTimestamp, endTimestamp]
}

export const isValidDate = (date) => {
  date = new Date(`${date}T00:00:00`)
  return date instanceof Date && !isNaN(date)
}
