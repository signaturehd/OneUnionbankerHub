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
    // return this.storage.getItem(TOKEN) || ''
    return '8911c83d86790a4297cd6bd1e50a23d101899dbbd529b6367cfd0617648e4e706a92222459c051a1d11b295a0a75e0ed1b9afb7f4164f66ac0613ddf7f48df34'
  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)

  }

  getAccountToken () {
    // return this.storage.getItem(ACCOUNT_TOKEN) || ''
    return "rY5CFD9ja3as2I/pjQFndZ+kpegnO1dfI2PbIfl9jUmYrjnCNoRtIyfMcaIWm5AWuR3z+tOSS1vl3cezNcBIB44IBgjnBchHSf/zVo3hT+CigGwAEb2M7TleKudjs/Df8Gg6QulGrqUKU7ZYXboS9/znhsChf/E="
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
