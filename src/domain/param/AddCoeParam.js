export default (purpose, country, type, approvedVLFrom, approvedVLTo) => ({
  body : {
    purpose,
    country : country ? country : '',
    type,
    approvedVLFrom : approvedVLFrom ? approvedVLFrom : '',
    approvedVLTo : approvedVLTo? approvedVLTo: '',
  }
})
