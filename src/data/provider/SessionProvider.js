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
    return 'a6bce60109756a19ef3bc264a9cf2ffbb1fc201576f6c1e46446cf4b89838b780f8b9803e5f4c008af4682511589da21d8138b2e5896080b2d46b4cf6adb0f85'
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
