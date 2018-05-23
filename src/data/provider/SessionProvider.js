const TOKEN = 'TOKEN'
const ACCOUNT_TOKEN = 'ACCOUNT_TOKEN'
const ACCOUNT_NUMBER = 'ACCOUNT_NUMBER'
const PROFILE = 'PROFILE'

export default class SessionProvider {
  constructor () {
    this.storage = window.localStorage
  }

  setToken (token = '') {
    this.storage.setItem(TOKEN, token)
  }

  getToken () {
    //eturn this.storage.getItem(TOKEN) || ''
    return 'b993606d8dd8780d4e536d56a6d20113975893063da2db804f8aa5529ed8d3d310b21b80a277dc733abbf1a42693371fddf488b94026bfbc51269b6c41b648f9'

  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)
  }

  getAccountToken () {
    //return this.storage.getItem(ACCOUNT_TOKEN) || ''
    return 'rY5CFD9ja3as2I/pjQFmcIFUOUgK5PiCEnh+xQbcBDdWn1DJjXGPjAhZGQhKTLRNF8yt49VHX5ZeQHOmj5mmIgNX8mLGYAX6t9si89oV6aYydvKYYLEFS6wYb6g91nLF39h4dY9SuAcW+O0wdOMFYornhW9m6Ps='


  }

  setAccountNumber (accountNumber = '') {
    this.storage.setItem(ACCOUNT_NUMBER, accountNumber)
  }

  getAccountNumber () {
    return this.storage.getItem(ACCOUNT_NUMBER) || ''
  }

  setProfile (profile) {
    this.storage.setItem(PROFILE, JSON.stringify(profile))
  }

  getProfile () {
    return JSON.parse(this.storage.getItem(PROFILE)) || {}
  }
}
