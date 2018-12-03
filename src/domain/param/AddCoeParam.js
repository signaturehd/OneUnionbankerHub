export default (purpose, country, coeType) => ({
  body : {
    purpose,
    country : country ? country : '',
    coeType,
    approvedVLFrom: '',
    approvedVLTo: '',
  }
})
