export function convertInitial (name) {
  const profileInitial = name ? name : 'Empty Empty'
  let words = profileInitial.replace(/^\s+|\s+$/g, '').split(/\s+/g);
  let first = words[0].charAt(0)
  let last = words[words.length - 1].charAt(0)
  let splitUserInitial = first.toUpperCase()+''+last.toUpperCase()

  return splitUserInitial
}
