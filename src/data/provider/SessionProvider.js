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
    return 'b41d52ec1d7f2bbf3df422535f1c204361d494352ae6b88fe4a2788d0efdc87bea20fe841273733ed7e3671cce8fc558b985d3760a8725062e2c5d59d42ad740'
  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)
  }

  getAccountToken () {
    // return this.storage.getItem(ACCOUNT_TOKEN) || ''
    return "rY5CFD9ja3as2I/pjQFndZyppO0tO1dfI2PbIfl9jUkm/4c6SfaPOIf3WhJoykAi3NzYFv5kqxsqRrpdD8/9MIOCIL2OHJqGT1O7VauT8vj7OSMjza13Vb42ti6rKnaT2pYt4wvCUK3HLO3sk7BR7FBZBBqlM04="
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
