const TOKEN = 'TOKEN'
const INITIAL_TOKEN = 'INITIAL_TOKEN'
const ACCOUNT_TOKEN = 'ACCOUNT_TOKEN'
const ACCOUNT_NUMBER = 'ACCOUNT_NUMBER'
const RELEASING_CENTER = 'RELEASING_CENTER'
const WIZARD_VALIDATION = 'WIZARD_VALIDATION'
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
  }

  setInitialToken (token = '') {
    this.storage.setItem(INITIAL_TOKEN, token)
  }

  getInitialToken () {
    return this.storage.getItem(INITIAL_TOKEN) || ''
  }

  setWizardValidation (wizardValue) {
    this.storage.setItem(WIZARD_VALIDATION, wizardValue)
  }

  getWizardValidation () {
    return this.storage.getItem(WIZARD_VALIDATION)
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

  setReleasingCenter (releasingCenter = '') {
    this.storage.setItem(RELEASING_CENTER, releasingCenter)
  }

  getReleasingCenter () {
    return this.storage.getItem(RELEASING_CENTER) || ''
  }

  setProfile (profile) {
    this.storage.setItem(PROFILE, JSON.stringify(profile))
  }

  getProfile () {
    return JSON.parse(this.storage.getItem(PROFILE)) || {}
  }
}
