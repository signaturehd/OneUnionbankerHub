export default (purpose, country, type) => ({
  body : {
    purpose,
    country : country ? country : '',
    type,
    approvedVLFrom: '',
    approvedVLTo: '',
  }
})
