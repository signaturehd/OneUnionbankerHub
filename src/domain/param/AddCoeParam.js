export default (purpose, country, coeType) => ({
  body : {
    purpose,
    country,
    coeType,
    approvedVLFrom: '',
    approvedVLTo: '',
  }
})
