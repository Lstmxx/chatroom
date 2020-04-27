export function normalizeNumber (num) {
  return num > 9 ? `${num}` : `0${num}`
}
/*
  时间格式：2019-10-31 10:23:24
*/

export function normalizeTimeDetail (time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = normalizeNumber(date.getMonth() + 1)
  const days = normalizeNumber(date.getDate())
  const hour = normalizeNumber(date.getHours())
  const minutes = normalizeNumber(date.getMinutes())
  const seconds = normalizeNumber(date.getSeconds())
  return `${year}-${month}-${days} ${hour}:${minutes}:${seconds}`
}
/*
  时间格式：2019.10.31
*/

export function normalizeTime (time) {
  const date = new Date(time)
  return `${date.getFullYear()}.${normalizeNumber(date.getMonth() + 1)}.${normalizeNumber(date.getDate())}`
}
