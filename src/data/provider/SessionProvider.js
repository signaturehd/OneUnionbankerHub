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
    return '298251b7b68347171b7c6fe3fff14d536ef48c1145f2349ac8c99763ae6878d64933f7d111cea9208479f64bd1e09f438a6396b981ec42ca31405b4b37738933'
  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)
  }

  getAccountToken () {
    // return this.storage.getItem(ACCOUNT_TOKEN) || ''
    return 'rY5CFD9ja3as2I/pjQFkeX+3enBOl5dgzJVfagDynKEoqHatj+eQi+8tErIoKssbnZogU9x35PcmpPpicxPIhkVWbWfBWl1HT3eYhfmn+Kvk+zZqThk5Ygc9TuowaHAYaRxKlIlm+VVF7GbyMDA9+wEJdu2k4VM='
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
