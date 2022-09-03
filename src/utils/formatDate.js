import dayjs from 'dayjs'

export function formatDate(date, match = 'MM月DD日') {
  return dayjs(date).format(match)
}

export function getDiffDays(start, end) {
  return dayjs(end).diff(start, 'day')
}
