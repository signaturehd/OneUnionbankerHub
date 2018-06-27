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

  logout (token) {
    return this.service.logout(token)
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

  validateTermsAndCondition (token) {
    return this.service.validateTermsAndCondition(token)
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

  setInitialToken (token) {
    this.sessionProvider.setInitialToken(token)
    store.dispatch(EventActions.changeToken(token))
  }

  getInitialToken () {
    return this.sessionProvider.getInitialToken()
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

  /* Set Selected Releasing Center*/
  setReleasingCenter (releasingCenter) {
    this.sessionProvider.setReleasingCenter(releasingCenter)
  }
  /* Get Selected Releasing Center*/
  getReleasingCenter () {
    return this.sessionProvider.getReleasingCenter()
  }

  /* Set Wizard*/
  setWizardValidation (wizard) {
    this.sessionProvider.setWizardValidation(wizard)
  }
  /* Get Wizard*/
  getWizardValidation () {
    return this.sessionProvider.getWizardValidation()
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
  getBooks (token, pageNumber, find) {
    return this.service.getBooks(token, pageNumber, find)
      .pipe(ServiceErrorOperator())
  }

  getBooksBorrowed (token, borrowedPageNumber, find) {
    return this.service.getBooksBorrowed(token, borrowedPageNumber, find)
      .pipe(ServiceErrorOperator())
  }


  addRating (token, bookParam) {
    return this.service.addRating(token, bookParam)
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

  addOptical (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    opticalParam) {
    return this.service.addOptical(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      opticalParam)
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
  addDentalReimbursement (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    dentalReimbursementParam) {
    return this.service.addDentalReimbursement(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      dentalReimbursementParam)
      .pipe(ServiceErrorOperator())
  }

  /* dental loa */

  getDentalLoa (token) {
    return this.service.getDentalLoa(token)
      .pipe(ServiceErrorOperator())
  }

  addDentalLoa (
    token,
    accountToken,
    accountNo,
    releasingCenter,
    dentalLoaParam) {
    return this.service.addDentalLoa(
      token,
      accountToken,
      accountNo,
      releasingCenter,
      dentalLoaParam)
      .pipe(ServiceErrorOperator())
  }

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
  getTransactionsDetails (token, GetTransactionParam) {
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

  addBenefitFeedback(token, addBenefitFeedbackParam) {
    return this.service.addBenefitFeedback(token, addBenefitFeedbackParam)
      .pipe(ServiceErrorOperator())
  }
  /* Remarks */
  getRemarks (token, remarksParam) {
    return this.service.getRemarks(token, remarksParam)
      .pipe(ServiceErrorOperator())
  }

  getFaqsCategories (token) {
    return this.service.getFaqsCategories(token)
      .pipe(ServiceErrorOperator())
  }

  updateRemarks (token, remarksParam) {
    return this.service.updateRemarks(token, remarksParam)
      .pipe(ServiceErrorOperator())
  }

  /* MPL Client */

  getMplPurposeOfAvailment (token, {
    loanTypesId,
    purposeOfLoan,
    subcategoryLevel }) {
    return this.service.getMplPurposeOfAvailment(token, {
      loanTypesId,
      purposeOfLoan,
      subcategoryLevel
    })
      .pipe(ServiceErrorOperator())
  }

  getMplTypes (token) {
    return this.service.getMplTypes(token)
      .pipe(ServiceErrorOperator())
  }

  getMplValidate (token, mplValidateParam) {
    return this.service.getMplValidate(token, mplValidateParam)
      .pipe(ServiceErrorOperator())
  }

  getMplFormAttachments (token, mplGetFormParam) {
    return this.service.getMplFormAttachments (token, mplGetFormParam)
      .pipe(ServiceErrorOperator())
  }

  addLoan (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    mplPurposeLoanAddParam) {
    return this.service.addLoan(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      mplPurposeLoanAddParam)
      .pipe(ServiceErrorOperator())
  }

  addLoanComputerOrMotor (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addMotorLoanParam) {
    return this.service.addLoanComputerOrMotor(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      addMotorLoanParam)
      .pipe(ServiceErrorOperator())
  }

  getCarValidate (token) {
    return this.service.getCarValidate(token)
      .pipe(ServiceErrorOperator())
  }

  addCarRequest (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    carRequestParam) {
    return this.service.addCarRequest(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      carRequestParam)
      .pipe(ServiceErrorOperator())
  }

  /* Education Grant Aid */
  addGrantAid (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    grantAidParam) {
    return this.service.addGrantAid(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      grantAidParam)
      .pipe(ServiceErrorOperator())
  }

  addCarLeasePayment (token) {
    return this.service.addCarLeasePayment(token)
      .pipe(ServiceErrorOperator())
  }

  addCarLeaseConfirmation (token) {
    return this.service.addCarLeaseConfirmation(token)
      .pipe(ServiceErrorOperator())
  }

  getPayslip (token) {
    return this.service.getPayslip(token)
      .pipe(ServiceErrorOperator())
  }

  getPayslipSelectedDate (token, payslipParam) {
    return this.service.getPayslipSelectedDate(token, payslipParam)
      .pipe(ServiceErrorOperator())
  }

  validateGrantAid (token) {
    return this.service.validateGrantAid(token)
      .pipe(ServiceErrorOperator())
  }

  validateGrantPlan (token) {
    return this.service.validateGrantPlan(token)
      .pipe(ServiceErrorOperator())
  }

  /* Education Grant Plan */
  addGrantPlan (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    grantPlanParam) {
    return this.service.addGrantPlan(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      grantPlanParam)
      .pipe(ServiceErrorOperator())
  }
}
