interface DateParts {
  year: number
  month: number
  day: number
  weekday: string
}

const weekdayFormatter = new Intl.DateTimeFormat('ja-JP', {
  weekday: 'short',
  timeZone: 'UTC',
})

function parseDateOnly(value: string): DateParts {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    throw new Error(`Invalid date: ${value}`)
  }

  const [, yearValue, monthValue, dayValue] = match
  const year = Number(yearValue)
  const month = Number(monthValue)
  const day = Number(dayValue)
  const date = new Date(Date.UTC(year, month - 1, day))

  return {
    year,
    month,
    day,
    weekday: weekdayFormatter.format(date),
  }
}

export function formatEventDateRange(startValue: string, endValue: string) {
  const start = parseDateOnly(startValue)
  const end = parseDateOnly(endValue)

  if (
    start.year === end.year &&
    start.month === end.month &&
    start.day === end.day
  ) {
    return `${start.year}年${start.month}月${start.day}日（${start.weekday}）`
  }

  if (start.year === end.year && start.month === end.month) {
    return `${start.year}年${start.month}月${start.day}日（${start.weekday}）—${end.day}日（${end.weekday}）`
  }

  if (start.year === end.year) {
    return `${start.year}年${start.month}月${start.day}日（${start.weekday}）—${end.month}月${end.day}日（${end.weekday}）`
  }

  return `${start.year}年${start.month}月${start.day}日（${start.weekday}）—${end.year}年${end.month}月${end.day}日（${end.weekday}）`
}
