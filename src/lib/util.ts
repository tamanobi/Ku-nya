export function shuffle<T>(array: T[]): T[] {
  let n = array.length

  while (n) {
    const i = Math.floor(Math.random() * n--)
    const t = array[n]
    array[n] = array[i]
    array[i] = t
  }

  return array
}
