export function convertInitial (name) {
  const profileInitial = name && name ? name : 'Empty Empty'
  let splitUserInitial = profileInitial.split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'')
  return splitUserInitial
}
