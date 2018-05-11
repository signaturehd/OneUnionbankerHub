<<<<<<< HEAD
const TOKEN = 'TOKEN';
const ACCOUNT_TOKEN = 'ACCOUNT_TOKEN';
const ACCOUNT_NUMBER = 'ACCOUNT_NUMBER';
=======
const TOKEN = 'TOKEN'
const ACCOUNT_TOKEN = 'ACCOUNT_TOKEN'
const ACCOUNT_NUMBER = 'ACCOUNT_NUMBER'
const PROFILE = 'PROFILE'
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2

export default class SessionProvider {
  constructor () {
    this.storage = window.localStorage
  }

  setToken (token = '') {
    this.storage.setItem(TOKEN, token)
  }

  getToken () {
    return this.storage.getItem(TOKEN) || ''
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
