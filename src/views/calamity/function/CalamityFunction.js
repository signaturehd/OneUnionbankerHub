export function symbolValidation (value) {
  return value && value.replace(/[&\/\\#+()$~%'":;*?<>\[\]|{}]/g, '')
}

export function MinMaxNumberValidation (value) {
  return value > 30000 ? false : true
}

export function Number (value) {
  return value && value.replace(/[^0-9]/g, '')
}
