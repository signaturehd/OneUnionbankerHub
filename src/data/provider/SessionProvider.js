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
   return '1b77067baf1dc815d80163dfe048888e5dded063da23568000d41b6bc9e14f22afdf47ee460fdfdb728f1c9c82d3ab09565f55faccb1b81782cb456df88f34b3'
  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)

  }

  getAccountToken () {
   // return this.storage.getItem(ACCOUNT_TOKEN) || ''
   return 'rY5CFD9ja3as2I/pjQFneOlcHUapFQd/QTQ9pvZ5Z1H6dz7vR+v1D7KNZiUttVGA5mSMqRRUXB27kJEXlY26nBC1M+jNQGNtdmv64ukdRwmnfp3SAFCwvfaOXnmnKHY3GOcy0mnDR+zyBqzZt5ee54RdByw21a4='
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
