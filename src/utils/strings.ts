export const ucfirst = (string: string) => {
  if (!string) return ''

  return string
    .split(' ')
    .map((str) => str.charAt(0).toUpperCase().concat(str.substring(1)))
    .join(' ')
    .trim()
}
