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
    return this.storage.getItem(TOKEN) || ''
    // return 'fa781a4b978f2e571fae03d0ae5992fd1252aa3d145933c32afa73bd53260ee8ba1e55555440650037c8a8d9f9850b9585b71aeffdad60315f3ed70d73d18e4f'

  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)
  }

  getAccountToken () {
    return this.storage.getItem(ACCOUNT_TOKEN) || ''
    // return 'rY5CFD9ja3as2I/pjQFmcan2TogsuFjcN4FETO85d66aEjauYrc9ckm40X4rZ0sVXwcXwM8CL5lswx4B96vBHC6A434+M0t7bHBe7pBSjeO4av01RQgmmITs4H7vWl1AWnVsFdain2R/CJvOZ5L72Ovjq8GtQn8='
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
