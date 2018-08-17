
export function indexDecreased (index) {
  if(Number(index) === 8) {
    return index
  } else {
    return index - 8
  }
}

export function indexIncreased (index) {
  return index + 8
}
