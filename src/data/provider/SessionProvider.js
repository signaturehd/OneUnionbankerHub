const TOKEN = 'TOKEN';
const ACCOUNT_TOKEN = 'ACCOUNT_TOKEN';
const ACCOUNT_NUMBER = 'ACCOUNT_NUMBER';
const PROFILE = 'PROFILE'

export default class SessionProvider {
  constructor () {
    this.storage = window.localStorage
  }

  setToken (token = '') {
    this.storage.setItem(TOKEN, token)
  }

  getToken () {
    //return this.storage.getItem(TOKEN) || ''
    return ('a03391e97068eb573573920814ad99eb8afdca911a8dee9b73cca0697120753a7588931b4623a54cd6314a5d2e490f8a840949578703517b4f233e5d289369f7')
  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)
  }

  getAccountToken () {
    return this.storage.getItem(ACCOUNT_TOKEN) || ''
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
