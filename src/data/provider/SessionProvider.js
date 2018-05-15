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
    return this.storage.getItem(TOKEN) || 'b8a0800416626a889b7c539b38c631601fe726e2a438bf5193a7ccd59b39b50bfdcab728596ef1279acf5de5db37a4aca6fbaa207b14f23b6beece1566cec99f'

  }

  setAccountToken (accountToken = '') {
    this.storage.setItem(ACCOUNT_TOKEN, accountToken)
  }

  getAccountToken () {
    return this.storage.getItem(ACCOUNT_TOKEN) || 'rY5CFD9ja3as2I/pjQFncwvCaUpfWOfAPab7Y9KMFy3x9K+9lAlQqN4R0onTCbA1yACh3oHbkLqo7mQVuovvpGyH9/0z6in1fRzdmnAKbiCdZWIDg7mcSbX/djsLo7C3EnVBJg4hrfsQAAkG3gUf2Hg/6+7Yaqc='
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
