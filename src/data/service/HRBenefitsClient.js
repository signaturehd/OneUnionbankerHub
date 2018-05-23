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

  notice (token, noticeParam) {
    return this.service.notice(token, noticeParam)
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


  reserveBook (token, BookReserveParam) {
    return this.service.ReserveBook(token, BookReserveParam)
        .pipe(ServiceErrorOperator())
  }

  reserveBook (token, BookReserveParam) {
    return this.service.reserveBook(token, BookReserveParam)
        .pipe(ServiceErrorOperator())
  }

  /* optical */
  getOptical (token) {
    return this.service.getOptical(token)
      .pipe(ServiceErrorOperator())
  }

  addOptical (token, accountToken, accountNumber, opticalParam) {
    return this.service.addOptical(token, accountToken, accountNumber, opticalParam)
      .pipe(ServiceErrorOperator())
  }

  getPodcasts (token) {
    return this.service.getPodcasts(token)
      .pipe(ServiceErrorOperator())
  }

  getPodcast (token, id) {
    return this.service.getPodcast(token)
      .pipe(ServiceErrorOperator())
      .map(resp => {
        for (var i in resp) {
          if (resp[i].id == id) {
            return resp[i]
          }
        }

        return {}
      })
  }

  getPodcastsReviews (token) {
    return this.service.getPodcastsReviews(token)
      .pipe(ServiceErrorOperator())
  }

  getPodcastsRecommendations (token) {
    return this.service.getPodcastsRecommendations(token)
      .pipe(ServiceErrorOperator())
  }

  getPodcastsViewed (token) {
    return this.service.getPodcastsViewed(token)
      .pipe(ServiceErrorOperator())
  }

  paddRating (token, podcastParam) {
    return this.service.paddRating(token, podcastParam)
      .pipe(ServiceErrorOperator())
  }

  /* dental reimbursement */

  getDentalReimbursement (token) {
    return this.service.getDentalReimbursement(token)
      .pipe(ServiceErrorOperator())
  }

  /* dental loa */

  /* News */
  getNews (token) {
    return this.service.getNews(token)
      .pipe(ServiceErrorOperator())
  }

  /* Faqs */
  getFaqs (token) {
    return this.service.getFaqs(token)
      .pipe(ServiceErrorOperator())
  }

  getFaqDetails (token, faqParam) {
    return this.service.getFaqDetails(token, faqParam)
      .pipe(ServiceErrorOperator())
  }

  /* Notice of Undertaking */
  updateNotice (token, noticeParam) {
    return this.service.updateNotice(token, noticeParam)
      .pipe(ServiceErrorOperator())
  }


  getFaqsCategories (token) {
    return this.service.getFaqsCategories(token)
    .pipe(ServiceErrorOperator())
  }

  getBookImage (accountToken, ImageParam) {
    return this.service.getBookImage(accountToken, ImageParam)
    .pipe(ServiceErrorOperator())
  }

  getFaqsImage (accountToken, ImageParam) {
    return this.service.getFaqsImage(accountToken, ImageParam)
    .pipe(ServiceErrorOperator())
  }

}
