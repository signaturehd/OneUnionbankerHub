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

  resend (resendOtpParam) {
    return this.service.resend(resendOtpParam)
      .pipe(ServiceErrorOperator())
  }

  profile (token) {
    return this.service.profile(token)
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

  setProfile (profile) {
    this.sessionProvider.setProfile(profile)
  }

  getProfile () {
    return this.sessionProvider.getProfile()
  }

  /* accounts */
  validateAccountNumber (token, accountNumber) {
    return this.service.validateAccountNumber(token, accountNumber)
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

  getBooksBorrowed (token) {
    return this.service.getBooksBorrowed(token)
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

<<<<<<< HEAD
  /* Faqs */
  getFaqs () {
      return this.service.getFaqs()
          .pipe(ServiceErrorOperator())
  }
  
  /* Transactions */
  getTransactions (token) {
      return this.service.getTransactions(token)
          .pipe(ServiceErrorOperator())
=======
  /* News */
  getFaqs (token) {
    return this.service.getFaqs(token)
      .pipe(ServiceErrorOperator())
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2
  }
}
