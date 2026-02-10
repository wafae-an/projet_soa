export function getWeekDates(date: Date): Date[] {
  const dates: Date[] = []
  const current = new Date(date)

  // Get Monday of the week
  const day = current.getDay()
  const diff = current.getDate() - day + (day === 0 ? -6 : 1)
  current.setDate(diff)

  for (let i = 0; i < 7; i++) {
    dates.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  return dates
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}
