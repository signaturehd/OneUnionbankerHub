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
    //eturn this.storage.getItem(TOKEN) || ''
    return '58d557193e52858e5ffd598fb4d0a0cf96705f0434cc4c6fc64922a296e4474c0cf8a6c2a58e85ab4c42e7971bb878b85c10c52358e4ce4b5b02882cd8edd6a7'

  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)
  }

  getAccountToken () {
    //return this.storage.getItem(ACCOUNT_TOKEN) || ''
    return 'rY5CFD9ja3as2I/pjQFmcIFZOE8P5PiCEnh+xQbcBDdvrWLTbeslRIRj0FLWA97aDvLos+M5mL6Q7HJb0H2EYXCFpVtWEjpkiShED8aly5M6tEMmTz69e7Y23WPPARozoJJJoqtO7pJwNMuBZuS/D3qIxY5IPcs='


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
