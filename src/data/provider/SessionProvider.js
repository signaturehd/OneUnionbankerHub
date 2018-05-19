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
    return '35c69141cbbaf08141d47482df6f01e534260958f2d9b84a371d7a742231738e07d36c1be22934b6c3c3eb95c82e364a1846dfd4c7cfedaf8ecf57c129e7710b'
  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)

  }

  getAccountToken () {
    // return this.storage.getItem(ACCOUNT_TOKEN) || ''
    return 'rY5CFD9ja3as2I/pjQFnd1GfI7LspWwh8OyptKFIuCRkoO0S/wdKVn8K88TWmGcrcpAbz6nLbb1+tJxQe8XGa2R+6ld5qLrKsy1jk+sYgrH1wwnSnaw155ujDUERe4Hel10/Z1pz3SlYe/5NDubJxtGUyyWFeaE='
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
