import ServiceErrorOperator from '../common/operator/ServiceErrorOperator'
import store from '../../store'
import { EventActions } from '../../actions'

export default class HRBenefitsClient {
  constructor (service, sessionProvider) {
    this.service = service
    this.sessionProvider = sessionProvider
  }

  /* User */
  // HTTP status code
  login (loginParam) {
    return this.service.login(loginParam)
      .pipe(ServiceErrorOperator())
  }

  otp (otpParam) {
    return this.service.otp(otpParam)
      .pipe(ServiceErrorOperator())
  }

  /* Session */
  setToken (token) {
    this.sessionProvider.setToken(token)
    store.dispatch(EventActions.changeToken(token))
  }

  getToken () {
    return this.sessionProvider.getToken()
  }

  setAccountToken (accountToken) {
    this.sessionProvider.setAccountToken(accountToken)
  }

  getAccountToken () {
    return this.sessionProvider.getAccountToken()
  }

  setAccountNumber (accountNumber) {
    this.sessionProvider.setAccountNumber(accountNumber)
  }

  getAccountNumber () {
    return this.sessionProvider.getAccountNumber()
  }

  /* accounts */
  validateAccountNumber (accountNumber) {
    return this.service.validateAccountNumber(accountNumber)
      .pipe(ServiceErrorOperator())
  }

  /* rds */
  getReleasingCenters (token) {
    return this.service.getReleasingCenters(token)
      .pipe(ServiceErrorOperator())
  }

  /* books */
  getBooks (token) {
    return this.service.getBooks(token)
      .pipe(ServiceErrorOperator())
  }

  addRating (token, bookParam) {
    return this.service.addRating(token, bookParam)
      .pipe(ServiceErrorOperator())
  }

  /* optical */
  getOptical (token) {
    return this.service.getOptical(token)
      .pipe(ServiceErrorOperator())
  }
  /* News */
  getNews (token) {
    return this.service.getNews(token)
      .pipe(ServiceErrorOperator())
  }
}
