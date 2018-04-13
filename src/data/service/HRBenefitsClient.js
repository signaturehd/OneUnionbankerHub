import ServiceErrorOperator from '../common/operator/ServiceErrorOperator'
import store from '../../store'
import { EventActions } from '../../actions'

export default class HRBenefitsClient {

  constructor (service, sessionProvider) {
    this.service = service
    this.sessionProvider = sessionProvider
  }

  /* User */
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
  getReleasingCenters () {
    return this.service.getReleasingCenters()
      .pipe(ServiceErrorOperator())
  }
  /* Library */
  getBooks () {
    return this.service.getBooks()
      .pipe(ServiceErrorOperator())
  }
  /* News */
  getNews () {
    return this.service.getNews()
      .pipe(ServiceErrorOperator())
  }
    getFaqs () {
        return this.service.getFaqs()
            .pipe(ServiceErrorOperator())
    }
}
