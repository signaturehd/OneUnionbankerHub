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

  setReleasingCenter (releasingCenter) {
    this.sessionProvider.setReleasingCenter(releasingCenter)
  }

  getReleasingCenter () {
    return this.sessionProvider.getReleasingCenter()
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
        for (const i in resp) {
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

  /* Transactions Personal */
  getTransactionsPersonal (token) {
    return this.service.getTransactionsPersonal(token)
      .pipe(ServiceErrorOperator())
  }

  /* Transactions Approval */
  getTransactionsApproval (token) {
    return this.service.getTransactionsApproval(token)
      .pipe(ServiceErrorOperator())
  }

  /* Transaction Details */
  getTransactionsDetails (token, GetTransactionParam){
    return this.service.getTransactionsDetails(token, GetTransactionParam)
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

  getFaqsCategories (token) {
    return this.service.getFaqsCategories(token)
      .pipe(ServiceErrorOperator())
  }

  /* Notice of Undertaking */
  updateNotice (token, noticeParam) {
    return this.service.updateNotice(token, noticeParam)
      .pipe(ServiceErrorOperator())
  }

  /* Feedback */
  getFeedback (token, FeedbackParam) {
    return this.service.getFeedback(token, FeedbackParam)
      .pipe(ServiceErrorOperator())
  }

  addFeedback (token, addFeedbackParam) {
    return this.service.addFeedback(token, addFeedbackParam)
    .pipe(ServiceErrorOperator())
  }
  /* Remarks */
  getRemarks (token, remarksParam) {
    return this.service.getRemarks(token, remarksParam)
    .pipe(ServiceErrorOperator())
  }

  updateRemarks (token, remarksParam) {
    return this.service.updateRemarks(token, remarksParam)
      .pipe(ServiceErrorOperator())
  }

}
