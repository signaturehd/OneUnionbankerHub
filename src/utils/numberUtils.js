export function format (n = 0) {
  var parts = parseFloat(n).toFixed(2).split(".")
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
}

export function formatInput (n) {
  let parts = n && n.replace(/,/g, "").replace(/,/g, "")
  let value = numberWithCommas(parts)
  return value
}

export function formatValue (n) {
  let parts =  n && n.replace(/,/g, "").replace(/,/g, "")
  return parts
}

export function numberWithCommas(x) {
   return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
