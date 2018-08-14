import ServiceErrorOperator from '../common/operator/ServiceErrorOperator'
import store from '../../store'
import { EventActions } from '../../actions'
import { Observable } from 'rxjs'

export default class HRBenefitsClient {
  constructor (service, sessionProvider, fileProvider) {
    this.service = service
    this.sessionProvider = sessionProvider
    this.fileProvider = fileProvider
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

  updateAccountNumber (token, accountNumber) {
    return this.service.updateAccountNumber(token, accountNumber)
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
          if (resp[i].id === id) {
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

  getPayslipFeedbackCategoriesDiscrepancy (token) {
    return this.service.getPayslipFeedbackCategoriesDiscrepancy(token)
      .pipe(ServiceErrorOperator())
  }

  addPayslipFeedbackDiscrepancy (token, addPayslipFeedbackParam) {
    return this.service.addPayslipFeedbackDiscrepancy(token, addPayslipFeedbackParam)
      .pipe(ServiceErrorOperator())
  }

  addBenefitFeedback (token, addBenefitFeedbackParam) {
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

  addLoanMotor (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addMotorLoanParam) {
    return this.service.addLoanMotor(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      addMotorLoanParam)
      .pipe(ServiceErrorOperator())
  }

  addLoanComputer (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addComputerLoanParam) {
    return this.service.addLoanComputer(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      addComputerLoanParam)
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

  addPayslipSelectedDate (token, payslipParam) {
    return this.service.addPayslipSelectedDate(token, payslipParam)
      .pipe(ServiceErrorOperator())
      .flatMap(resp => {
          return this.service.getPdf(token, resp)
        }
      )
      .flatMap(resp =>
        Observable.create(observer => {
          const reader = new FileReader()
          reader.onerror = err => observer.error(err)
          reader.onabort = err => observer.error(err)
          reader.onload = () => observer.next(reader.result)
          reader.onloadend = () => observer.complete()

          reader.readAsDataURL(resp.data)
        })
      )
  }

  addEducationAid (
    token,
    accountToken,
    accountNo,
    releasingCenter,
    educationAidParam) {
    return this.service.addEducationAid(
      token,
      accountToken,
      accountNo,
      releasingCenter,
      educationAidParam)
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

  validateGrantAid (token) {
    return this.service.validateGrantAid(token)
      .pipe(ServiceErrorOperator())
  }

  validateGrantPlan (token) {
    return this.service.validateGrantPlan(token)
      .pipe(ServiceErrorOperator())
  }

  /* Education Gorup Aid */
  addGroupAid (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    groupAidParam) {
    return this.service.addGroupAid(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      groupAidParam)
      .pipe(ServiceErrorOperator())
  }

  validateAid (token) {
    return this.service.validateAid(token)
      .pipe(ServiceErrorOperator())
  }

  validateGroupAid (token) {
    return this.service.validateGroupAid(token)
      .pipe(ServiceErrorOperator())
  }

  /* Bereavement */
  validateBereavement (token) {
    return this.service.validateBereavement(token)
      .pipe(ServiceErrorOperator())
  }

  addBereavement (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addBereavementParam) {
    return this.service.addBereavement(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      addBereavementParam)
      .pipe(ServiceErrorOperator())
  }

  /* Calamity Assitance */
  validateCalamityAssistance (token) {
    return this.service.validateCalamityAssistance(token)
      .pipe(ServiceErrorOperator())
  }

  addCalamityAssistance (token,
  accountToken,
  accountNumber,
  releasingCenter,
  calamityAssistanceParam) {
  return this.service.addCalamityAssistance(
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    calamityAssistanceParam)
      .pipe(ServiceErrorOperator())
  }

  uploadTransactionImageInteractor (token, type, id, file) {
    let service
    if (type === 22) {
      service = this.service.uploadTransactionCalamity( token, file, id )
    } else if ( type === 21) {
      service = this.service.uploadTransactionBereavement( token, file, id )
    }

    return service
  }

/* Medical Scheduling */

  validateMedicalScheduling (token) {
    return this.service.validateMedicalScheduling(token)
      .pipe(ServiceErrorOperator())
  }

  addMedicalScheduling (
    token,
    accounToken,
    accountNumber,
    releasingCenter,
    addMedicalSchedulingParam
  ) {
    return this.service.addMedicalScheduling (
      token,
      accounToken,
      accountNumber,
      releasingCenter,
      addMedicalSchedulingParam)
    .pipe(ServiceErrorOperator())
  }

  /* Outpatient Reimbursement */
  validateOutPatientReimbursement (token) {
    return this.service.validateOutPatientReimbursement(token)
      .pipe(ServiceErrorOperator())
  }

  addOutPatientReimbursement (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    outPatientParam
  ) {
      return this.service.addOutPatientReimbursement(
        token,
        accountToken,
        accountNumber,
        releasingCenter,
        outPatientParam
      )
      .pipe(ServiceErrorOperator())
  }

  /* Employee Trainings */

  getEmployeeTraining (token) {
    return this.service.getEmployeeTraining (token)
      .pipe(ServiceErrorOperator())
  }

  getEmployeeTrainingDetails (token, id) {
    return this.service.getEmployeeTrainingDetails (token, id)
      .pipe(ServiceErrorOperator())
  }

  enrollEmployee (token, id) {
    return this.service.enrollEmployee(token, id)
      .pipe(ServiceErrorOperator())
  }

  getEnrolledTrainings (token) {
    return this.service.getEnrolledTrainings (token)
      .pipe(ServiceErrorOperator())
  }

  getNeedApprovalTrainings (token) {
    return this.service.getNeedApprovalTrainings (token)
      .pipe(ServiceErrorOperator())
  }

  getApprovedTrainings (token) {
    return this.service.getApprovedTrainings (token)
      .pipe(ServiceErrorOperator())
  }

  getApprovalTrainingDetails (id, token) {
    return this.service.getApprovalTrainingDetails (id, token)
      .pipe(ServiceErrorOperator())
  }

  trainingRequest (trainingId, ApprovalTrainingParam, token) {
    return this.service.trainingRequest (trainingId, ApprovalTrainingParam, token)
      .pipe(ServiceErrorOperator())
  }

  /* Maternity Assistance */
  validateMaternityAssistance (token) {
    return this.service.validateMaternityAssistance(token)
      .pipe(ServiceErrorOperator())
  }

  addMaternityAssistance (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addMaternityAssistanceParam
  ) {
    return this.service.addMaternityAssistance (
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      addMaternityAssistanceParam)
    .pipe(ServiceErrorOperator())
  }

  /* Maternity Assistance SSS */

  addMaternityAssistanceSSS (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    maternityAssistanceSSSParam
  ) {
    return this.service.addMaternityAssistanceSSS(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      maternityAssistanceSSSParam
    )
      .pipe(ServiceErrorOperator())
  }


  /* Code of Conduct  */

  getCompliancesPdf (token, page) {
    return this.service.getCompliancesPdf(token, page)
      .pipe(ServiceErrorOperator())
  }

  submitPin (token, code) {
    return this.service.submitPin(token, code)
      .pipe(ServiceErrorOperator())
  }
  /* My Existing Loans */
  getExistingLoans (token) {
    return this.service.getExistingLoans(token)
      .pipe(ServiceErrorOperator())
  }
}
