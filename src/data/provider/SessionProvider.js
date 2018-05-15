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
    return 'd39deff1fa217fa2639c3681897bef2967e1579122200a376ba79bd4a4bfafd39a2cee821078b6d4ec682bdb9aaeb1c2bf4c934ec4fca817b3a0e8d5d4e51d0a'
  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)
  }

  getAccountToken () {
    // return this.storage.getItem(ACCOUNT_TOKEN) || ''
    return "rY5CFD9ja3as2I/pjQFncwvEa0pbWOfAPab7Y9KMFy3mJ2AduQw5AoVahmUXvMTQ2btbWcB3acbBo50pjiB18KV8y6qwndz8SK+G7CLdmRSAlGmA9eHppw0WEV6ATYcylqUdfPA7W80GRvFewZnTMonZA2jXR9c="
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
