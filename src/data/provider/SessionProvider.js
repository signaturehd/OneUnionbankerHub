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
    return 'a8f6fa89bb2480020073639e50d592e118de1407759448f62fd4da16499200af2c48cbd04d3bafdb4f6aeddceb5c1b6a8e0dbca7b217ffc91e516df1627739c4'
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

  getProfile () {
    return JSON.stringify(this.storage.getItem(PROFILE)) || {}
  }
}
