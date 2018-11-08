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

  /* Update Profile */

  updateDescription (token, emailAddress) {
    return this.service.updateDescription(token, description)
      .pipe(ServiceErrorOperator())
  }

  updateEmailAddress (token, emailAddress) {
    return this.service.updateEmailAddress(token, emailAddress)
      .pipe(ServiceErrorOperator())
  }

  updateAddress (token, address, file) {
    return this.service.updateAddress(token, address, file)
      .pipe(ServiceErrorOperator())
  }

  updateContactNumber (token, number) {
    return this.service.updateContactNumber(token, number)
      .pipe(ServiceErrorOperator())
  }

  /* Get Devices */

  getDevices (token) {
    return this.service.getDevices(token)
      .pipe(ServiceErrorOperator())
  }

  /* Reset Password */

  requestEmailVerification (token, empId, date) {
    return this.service.requestEmailVerification(token, empId, date)
      .pipe(ServiceErrorOperator())
  }

  requestOtpVerification (token, otp) {
    return this.service.requestOtpVerification(token, otp)
      .pipe(ServiceErrorOperator())
  }

  requestNewPassword (token, newPassword, confirmPassword, otp, employeeId, birtDate) {
    return this.service.requestNewPassword(token, newPassword, confirmPassword, otp, employeeId, birtDate)
      .pipe(ServiceErrorOperator)
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

  getBooksRecommended (token, pageNumber, find, isEditorsPick) {
    return this.service.getBooksRecommended(token, pageNumber, find, isEditorsPick)
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

  getBooksComments (token , itemId, page, items) {
    return this.service.getBooksComments(token , itemId, page, items)
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

  addCarLeasePayment (token, leasesConfirmpaymentParam) {
    return this.service.addCarLeasePayment(token, leasesConfirmpaymentParam)
      .pipe(ServiceErrorOperator())
  }

  addCarLeaseConfirmation (token, leasesCarConfirm) {
    return this.service.addCarLeaseConfirmation(token, leasesCarConfirm)
      .pipe(ServiceErrorOperator())
  }

  addCarLeaseReleasing (token, leasesCarLeaseReleasingParam) {
    return this.service.addCarLeaseReleasing(token, leasesCarLeaseReleasingParam)
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
    addMedicalSchedulingParam
  ) {
    return this.service.addMedicalScheduling (
      token,
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

  getCompliancesPdf (token) {
    return this.service.getCompliancesPdf(token)
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

  getNonExistingLoans (token) {
    return this.service.getNonExistingLoans(token)
      .pipe(ServiceErrorOperator())
  }

  /* Phenom Loans */
  getPhenomDiscounts (token) {
    return this.service.getPhenomDiscounts(token)
      .pipe(ServiceErrorOperator())
  }

  getPhenomSelectedDiscounts (token, id) {
    return this.service.getPhenomSelectedDiscounts(token, id)
      .pipe(ServiceErrorOperator())
  }

  addPhenomIsHeart (token, id, isHeart) {
    return this.service.addPhenomIsHeart(token, id, isHeart)
      .pipe(ServiceErrorOperator())
  }

  getPhenomImage (token, file) {
    return this.service.getPhenomImage(token, file)
      .pipe(ServiceErrorOperator())
      .flatMap(resp =>
        Observable.create(observer => {
          const reader = new FileReader()
          reader.onerror = err => observer.error(err)
          reader.onabort = err => observer.error(err)
          reader.onload = () => observer.next(reader.result)
          reader.onloadend = () => observer.complete()
          reader.readAsDataURL(resp)
        })
      )
  }

  getVendorImage (token, file) {
    return this.service.getVendorImage(token, file)
      .pipe(ServiceErrorOperator())
      .flatMap(resp =>
        Observable.create(observer => {
          const reader = new FileReader()
          reader.onerror = err => observer.error(err)
          reader.onabort = err => observer.error(err)
          reader.onload = () => observer.next(reader.result)
          reader.onloadend = () => observer.complete()
          reader.readAsDataURL(resp)
        })
      )
  }

  /* Leave Filing  */
  addLeaveFiling (token, leaveFilingParam) {
    return this.service.addLeaveFiling(token, leaveFilingParam)
      .pipe(ServiceErrorOperator())
  }

  /* Pin Enrollment */
  postEnrollPin (token, id) {
    return this.service.postEnrollPin(token , id)
      .pipe(ServiceErrorOperator())
  }

  putEnrollPin (token, putPINParam) {
    return this.service.putEnrollPin(token, putPINParam)
      .pipe(ServiceErrorOperator())
  }

  validateEmployeePin (token, employeePinParam) {
    return this.service.validateEmployeePin(token, employeePinParam)
      .pipe(ServiceErrorOperator())
  }

  /* Staff Accounts */
  getForConfirmation (token, id) {
    return this.service.getForConfirmation(token, id)
      .pipe(ServiceErrorOperator())
  }

  addStaffAccounts (token, staffAccountsParam) {
    return this.service.addStaffAccounts(token, staffAccountsParam)
      .pipe(ServiceErrorOperator())
  }

  updateStaffAccounts (token, staffAccountsParam) {
    return this.service.updateStaffAccounts(token, staffAccountsParam)
      .pipe(ServiceErrorOperator())
  }

  /* Pre Employment */

  getPreEmploymentMessageStatus (token) {
    return this.service.getPreEmploymentMessageStatus (token)
    .pipe(ServiceErrorOperator())
  }

  postPreEmploymentMessageStatus (token, id) {
    return this.service.postPreEmploymentMessageStatus (token, id)
      .pipe(ServiceErrorOperator())
  }


  getPreEmploymentStatus (token) {
    return this.service.getPreEmploymentStatus (token)
      .pipe(ServiceErrorOperator())
  }

  getPreEmploymentAffirmationId (token, affirmId, affirmPage) {
    return this.service.getPreEmploymentAffirmationId(token, affirmId, affirmPage)
      .pipe(ServiceErrorOperator())
  }

  postAffirmPreEmploymentUndertaking (token) {
    return this.service.postAffirmPreEmploymentUndertaking(token)
      .pipe(ServiceErrorOperator())
  }

  getOnBoardingDocument (token, link) {
    return this.service.getOnBoardingDocument(token, link)
    .pipe(ServiceErrorOperator())
    .flatMap(resp =>
      Observable.create(observer => {
        const reader = new FileReader()
        reader.onerror = err => observer.error(err)
        reader.onabort = err => observer.error(err)
        reader.onload = () => observer.next(reader.result)
        reader.onloadend = () => observer.complete()

        reader.readAsDataURL(resp)
      }
    ))
  }

  getOnBoardingAttachments (token, file) {
    return this.service.getOnBoardingAttachments(token, file)
    .pipe(ServiceErrorOperator())
    .flatMap(resp =>
      Observable.create(observer => {
        const reader = new FileReader()
        reader.onerror = err => observer.error(err)
        reader.onabort = err => observer.error(err)
        reader.onload = () => observer.next(reader.result)
        reader.onloadend = () => observer.complete()

        reader.readAsDataURL(resp)
      }
    ))
  }

  getAffirmationsStatus (token) {
    return this.service.getAffirmationsStatus(token)
      .pipe(ServiceErrorOperator())
  }

  getFinancialStatus (token) {
    return this.service.getFinancialStatus(token)
      .pipe(ServiceErrorOperator())
  }

  getFinancialDetails (token) {
    return this.service.getFinancialDetails(token)
      .pipe(ServiceErrorOperator())
  }

  addFinancialStatus (token, financialStatusParam) {
    return this.service.addFinancialStatus(token, financialStatusParam)
      .pipe(ServiceErrorOperator())
  }

  putFinancialStatus (token, financialStatusParam) {
    return this.service.putFinancialStatus(token, financialStatusParam)
      .pipe(ServiceErrorOperator())
  }

  getEmployeeTin (token) {
    return this.service.getEmployeeTin(token)
      .pipe(ServiceErrorOperator())
  }

  addEmployeeTin (token, employeeTinParam) {
    return this.service.addEmployeeTin(token, employeeTinParam)
      .pipe(ServiceErrorOperator())
  }

  getEmployeeSSS (token) {
    return this.service.getEmployeeSSS(token)
      .pipe(ServiceErrorOperator())
  }

  addEmployeeSSS (token, employeeSSSParam) {
    return this.service.addEmployeeSSS(token, employeeSSSParam)
      .pipe(ServiceErrorOperator())
  }

  getPreEmploymentForm (token) {
    return this.service.getPreEmploymentForm(token)
      .pipe(ServiceErrorOperator())
  }

  postEnrollPinAffirmationsEmployment (token, pin) {
    return this.service.postEnrollPinAffirmationsEmployment(token, pin)
      .pipe(ServiceErrorOperator())
  }

  postEnrollPinAffirmationsPolicy (token, pin) {
    return this.service.postEnrollPinAffirmationsPolicy(token, pin)
      .pipe(ServiceErrorOperator())
  }

  postEnrollPinAffirmationsConfidential (token, pin) {
    return this.service.postEnrollPinAffirmationsConfidential(token, pin)
      .pipe(ServiceErrorOperator())
  }

  postEnrollPinAffirmationsSecrecy (token, pin) {
    return this.service.postEnrollPinAffirmationsSecrecy(token, pin)
      .pipe(ServiceErrorOperator())
  }

  getWorkExperience (token) {
    return this.service.getWorkExperience(token)
      .pipe(ServiceErrorOperator())
  }

  getWorkExperienceForm (token) {
    return this.service.getWorkExperienceForm(token)
      .pipe(ServiceErrorOperator())
  }

  addWorkExperience (token, workExperienceParam) {
    return this.service.addWorkExperience(token, workExperienceParam)
      .pipe(ServiceErrorOperator())
  }

  addEmployeeRequirement (token, requirementParam) {
    return this.service.addEmployeeRequirement(token, requirementParam)
      .pipe(ServiceErrorOperator())
  }

  getCharacterReference (token) {
    return this.service.getCharacterReference(token)
      .pipe(ServiceErrorOperator())
  }

  getCharacterReferenceForm (token) {
    return this.service.getCharacterReferenceForm(token)
      .pipe(ServiceErrorOperator())
  }

  deleteCharacterReference (token, id) {
    return this.service.deleteCharacterReference(token, id)
      .pipe(ServiceErrorOperator())
  }

  postCharacterReference (token, postCharacterReferenceParam) {
    return this.service.postCharacterReference(token, postCharacterReferenceParam)
      .pipe(ServiceErrorOperator())
  }

  putCharacterReference (token, putCharacterReferenceParam) {
    return this.service.putCharacterReference(token, putCharacterReferenceParam)
      .pipe(ServiceErrorOperator())
  }

  getEmployeeSchool (token) {
    return this.service.getEmployeeSchool(token)
      .pipe(ServiceErrorOperator())
  }

  getSchoolRecordVerificationForm (token) {
    return this.service.getSchoolRecordVerificationForm(token)
      .pipe(ServiceErrorOperator())
  }

  getSchoolData (token, pageNumber, find) {
    return this.service.getSchoolData(token, pageNumber, find)
    .pipe(ServiceErrorOperator())
  }

  addEducationSchool(token, educationParam) {
    return this.service.addEducationSchool(token, educationParam)
    .pipe(ServiceErrorOperator())
  }

  putWorkExperience (token, workExperienceParam) {
    return this.service.putWorkExperience(token, workExperienceParam)
    .pipe(ServiceErrorOperator())
  }

  putEducationSchool(token, educationParam) {
    return this.service.putEducationSchool(token, educationParam)
    .pipe(ServiceErrorOperator())
  }

  getSpouse (token) {
    return this.service.getSpouse(token)
      .pipe(ServiceErrorOperator())
  }

  postSpouseForm (token, spouseFormParam) {
    return this.service.postSpouseForm(token, spouseFormParam)
      .pipe(ServiceErrorOperator())
  }

  putSpouseForm (token, spouseFormParam) {
    return this.service.putSpouseForm(token, spouseFormParam)
      .pipe(ServiceErrorOperator())
  }

  getChildren (token) {
    return this.service.getChildren(token)
      .pipe(ServiceErrorOperator())
  }

  postChildren (token, childrenParam) {
    return this.service.postChildren(token, childrenParam)
      .pipe(ServiceErrorOperator())
  }

  putChildren (token, childrenParam) {
    return this.service.putChildren(token, childrenParam)
      .pipe(ServiceErrorOperator())
  }

  addPagibigLoan (token, pagibigParam) {
    return this.service.addPagibigLoan(token, pagibigParam)
      .pipe(ServiceErrorOperator())
  }

  getPagibiLoanDeduction (token) {
    return this.service.getPagibiLoanDeduction(token)
      .pipe(ServiceErrorOperator())
  }

  getMedicalAppointment (token) {
    return this.service.getMedicalAppointment(token)
      .pipe(ServiceErrorOperator())
  }

  getMedicalAppointmentProcedures (token) {
    return this.service.getMedicalAppointmentProcedures(token)
      .pipe(ServiceErrorOperator())
  }

  updateMedicalAppointment (token, date, date2, id) {
    return this.service.updateMedicalAppointment(token, date, date2, id)
      .pipe(ServiceErrorOperator())
  }

  getParents (token) {
    return this.service.getParents(token)
      .pipe(ServiceErrorOperator())
  }

  updateParentForm (token, parentsParam) {
    return this.service.updateParentForm(token, parentsParam)
      .pipe(ServiceErrorOperator())
  }

  addParentForm (token, parentsParam) {
    return this.service.addParentForm(token, parentsParam)
      .pipe(ServiceErrorOperator())
  }

  getSiblings (token) {
    return this.service.getSiblings(token)
      .pipe(ServiceErrorOperator())
  }

  updateSiblingsForm (token, siblingsParam) {
    return this.service.updateSiblingsForm(token, siblingsParam)
      .pipe(ServiceErrorOperator())
  }

  addSiblingsForm (token, siblingsParam) {
    return this.service.addSiblingsForm(token, siblingsParam)
      .pipe(ServiceErrorOperator())
  }

  removeWorkExperience (token, id) {
    return this.service.removeWorkExperience(token, id)
      .pipe(ServiceErrorOperator())
  }

  removeSchool (token, id) {
    return this.service.removeSchool(token, id)
      .pipe(ServiceErrorOperator())
  }

  removeSpouse (token, id) {
    return this.service.removeSpouse(token, id)
      .pipe(ServiceErrorOperator())
  }

  removeChildren (token, id) {
    return this.service.removeChildren(token, id)
      .pipe(ServiceErrorOperator())
  }

  removeParents (token, id) {
    return this.service.removeParents(token, id)
      .pipe(ServiceErrorOperator())
  }

  removeSiblings (token, id) {
    return this.service.removeSiblings(token, id)
      .pipe(ServiceErrorOperator())
  }

  removeFinancial (token, id) {
    return this.service.removeFinancial(token, id)
      .pipe(ServiceErrorOperator())
  }

  /*  Post Employment */

  getPostEmployment (token) {
    return this.service.getPostEmployment(token)
      .pipe(ServiceErrorOperator())
  }

  addPostRequirement (token, requirementsParam) {
    return this.service.addPostRequirement(token, requirementParam)
      .pipe(ServiceErrorOperator())
  }

  /* Vaccines Requisitions */


  validateVaccine (token) {
    return this.service.validateVaccine(token)
      .pipe(ServiceErrorOperator())
  }

  /* Devices */

  getEmployeeDevice (token) {
    return this.service.getEmployeeDevice(token)
    .pipe(ServiceErrorOperator())
  }

  /* Vaccines Requisitions */
  validateVaccine (token) {
    return this.service.validateVaccine(token)
      .pipe(ServiceErrorOperator())
  }

  addVaccine (token, data) {
    return this.service.addVaccine(token, data)
      .pipe(ServiceErrorOperator())
  }

  /* Laptop Lease */

  confirmLaptopLease (token, transactionId, isConfirm) {
    return this.service.confirmLaptopLease(token, transactionId, isConfirm)
      .pipe(ServiceErrorOperator())
  }

  validateLaptopLease (token) {
    return this.service.validateLaptopLease(token)
      .pipe(ServiceErrorOperator())
  }

  addLaptopLease (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addLaptopLeaseParam,
    ) {
    return this.service.addLaptopLease(
      token,
      accountToken,
      accountNumber,
      releasingCenter,
      addLaptopLeaseParam,
    )
      .pipe(ServiceErrorOperator())
  }

  /* Travel */

  getAreaData (token, pageNumber, find) {
    return this.service.getAreaData(token, pageNumber, find)
    .pipe(ServiceErrorOperator())
  }

  getTravels (token, statusId) {
    return this.service.getTravels(token, statusId)
    .pipe(ServiceErrorOperator())
  }

  getApproval (token) {
    return this.service.getApproval(token)
    .pipe(ServiceErrorOperator())
  }

  addRequestOneWay (
    token,
    requestParam,
    ) {
    return this.service.addRequestOneWay(
      token,
      requestParam,
    )
    .pipe(ServiceErrorOperator())
  }

  addRequestRoundTrip (
    token,
    requestParam,
    ) {
    return this.service.addRequestRoundTrip(
      token,
      requestParam,
    )
    .pipe(ServiceErrorOperator())
  }

  addBookFlight (
    token,
    bookParam,
    ) {
    return this.service.addBookFlight(
      token,
      bookParam,
    )
    .pipe(ServiceErrorOperator())
  }

  addLiquidation (
    token,
    liquidationParam,
    ) {
    return this.service.addLiquidation(
      token,
      liquidationParam,
    )
    .pipe(ServiceErrorOperator())
  }

  addApproval (
    token,
    approvalParam,
    ) {
    return this.service.addApproval(
      token,
      approvalParam,
    )
    .pipe(ServiceErrorOperator())
  }

  /* News isHeart */

  addNewsIsHeart (token, id, isHeart) {
    return this.service.addNewsIsHeart(token, id, isHeart)
      .pipe(ServiceErrorOperator())
  }

  /* Events Budget */

  validateEventsBudget (token) {
    return this.service.validateEventsBudget(token)
      .pipe(ServiceErrorOperator())
  }
  /* News isHeart */

  addEventsBudget (
    token,
    accountToken,
    accountNo,
    releasingCenter,
    addEventParam
  ) {
    return this.service.addEventsBudget(
      token,
      accountToken,
      accountNo,
      releasingCenter,
      addEventParam
    )
      .pipe(ServiceErrorOperator())
  }

}
