export function randomColor () {
  let setOfLetter = '0123456789ABCDEF'
  let hex = '#'
  for (var i = 0; i < 6; i++) {
    hex += setOfLetter[Math.floor(Math.random() * 16)];
  }
  return hex
}
