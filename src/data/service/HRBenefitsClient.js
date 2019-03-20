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
      .pipe(ServiceErrorOperator('hr/benefits/v1/login', null, 'POST'))
  }

  logout (token) {
    return this.service.logout(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/logout', token, 'POST'))
  }

  otp (otpParam) {
    return this.service.otp(otpParam)
      .pipe(ServiceErrorOperator('hr/benefits/v2/otp', null, 'POST'))
  }

  resend (resendOtpParam) {
    return this.service.resend(resendOtpParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/otp/resend', null, 'POST'))
  }

  profile (token) {
    return this.service.profile(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/profile', token, 'GET'))
  }

  validateTermsAndCondition (token) {
    return this.service.validateTermsAndCondition(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/agreements/tnc', token, 'POST'))
  }

  /* Update Profile */

  updateDescription (token, description) {
    return this.service.updateDescription(token, description)
      .pipe(ServiceErrorOperator('hr/benefits/v1/description', token, 'PUT'))
  }

  updateEmailAddress (token, emailAddress) {
    return this.service.updateEmailAddress(token, emailAddress)
      .pipe(ServiceErrorOperator('hr/benefits/v1/email', token, 'PUT'))
  }

  updateAddress (token, address, file) {
    return this.service.updateAddress(token, address, file)
      .pipe(ServiceErrorOperator('hr/benefits/v1/profile/address', token, 'PUT'))
  }

  updateContactNumber (token, number) {
    return this.service.updateContactNumber(token, number)
      .pipe(ServiceErrorOperator('hr/benefits/v1/profile/mobile', token, 'PUT'))
  }

  updateProfilePicture (token, image) {
    return this.service.updateProfilePicture(token, image)
      .pipe(ServiceErrorOperator('hr/employees/v1/employees/profile/image', token, 'PUT'))
  }

  updateCivilStatus (token, civilStatus) {
    return this.service.updateCivilStatus(token, civilStatus)
      .pipe(ServiceErrorOperator('hr/benefits/v1/profile/civil-status', token, 'PUT'))
  }

  getProfilePicture (token, file) {
    return this.service.getProfilePicture(token, file)
      .pipe(ServiceErrorOperator('hr/files/v1/uploads?folder=attachments', token, 'GET'))
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

  /* Get Devices */

  getDevices (token) {
    return this.service.getDevices(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/devices', token, 'GET'))
  }

  /* Unlock Account */

  requestUnlockAccount (token, empId, date) {
    return this.service.requestUnlockAccount(token, empId, date)
      .pipe(ServiceErrorOperator('hr/benefits/v1/account/unlock', token, 'POST'))
  }

  /* Reset Password */

  requestEmailVerification (token, empId, date) {
    return this.service.requestEmailVerification(token, empId, date)
      .pipe(ServiceErrorOperator('hr/benefits/v1/password/otp', token, 'POST'))
  }

  requestOtpVerification (token) {
    return this.service.requestOtpVerification(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/account/unlock/email', token, 'POST'))
  }

  requestNewPassword (token, otp, date, empId, password) {
    return this.service.requestNewPassword(token, otp, date, empId, password)
      .pipe(ServiceErrorOperator('hr/benefits/v1/password/reset', token, 'POST'))
  }

  /*  Unlock Get and Post PIN */

  getRequestPinOtp (token) {
    return this.service.getRequestPinOtp(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/pin/otp', token, 'GET'))
  }

  requestUnlockPin (token, otp, newCode) {
    return this.service.requestUnlockPin(token, otp, newCode)
      .pipe(ServiceErrorOperator('hr/benefits/v1/pin/reset', token, 'GET'))
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

  /* Selected Pin Code */

  setPinCode (status) {
    this.sessionProvider.setPinCode(status)
  }

  getPinCode () {
    return this.sessionProvider.getPinCode()
  }

  // Set New Hire Employee

  getNEOStatus () {
    return this.sessionProvider.getNEOStatus()
  }

  setNEOStatus (status) {
    this.sessionProvider.setNEOStatus(status)
  }

  setEmploymentStatus (status) {
    this.sessionProvider.setEmploymentStatus(status)
  }

  getEmploymentStatus () {
    return this.sessionProvider.getEmploymentStatus()
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
      .pipe(ServiceErrorOperator(`hr/benefits/accounts/v1/${accountNumber}`, token, 'GET'))
  }

  updateAccountNumber (token, accountNumber) {
    return this.service.updateAccountNumber(token, accountNumber)
      .pipe(ServiceErrorOperator(`hr/employees/v1/employees/accounts`, token, 'GET'))
  }

  /* rds */
  getReleasingCenters (token) {
    return this.service.getReleasingCenters(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/rds/centers', token, 'GET'))
  }

  /* books */
  getBooks (token, pageNumber, find) {
    return this.service.getBooks(token, pageNumber, find)
      .pipe(ServiceErrorOperator(`v1/books?pageNumber=${pageNumber}&find=${find}`, token, 'GET'))
  }

  getBooksRecommended (token, pageNumber, find, isEditorsPick) {
    return this.service.getBooksRecommended(token, pageNumber, find, isEditorsPick)
      .pipe(ServiceErrorOperator(`v1/books?pageNumber=${ pageNumber }&find=${ find }&isEditorsPick=${ isEditorsPick }`, token, 'GET'))
  }

  getBooksBorrowed (token, borrowedPageNumber, find) {
    return this.service.getBooksBorrowed(token, borrowedPageNumber, find)
      .pipe(ServiceErrorOperator(`v1/books/history?pageNumber=${borrowedPageNumber}&find=${find}`, token, 'GET'))
  }


  addRating (token, bookParam) {
    return this.service.addRating(token, bookParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/books/rate', token, 'POST'))
  }


  reserveBook (token, BookReserveParam) {
    return this.service.reserveBook(token, BookReserveParam)
        .pipe(ServiceErrorOperator('hr/benefits/v1/books/reservation', token, 'POST'))
  }

  getBooksComments (token , itemId, page, items) {
    return this.service.getBooksComments(token , itemId, page, items)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/books/comments?bookId=${itemId}&page=${page}&items=${items}`, token, 'GET'))
  }

  addBookRequestCancel (token, objectParam) {
    return this.service.addBookRequestCancel(token, objectParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/books/requests/cancel', token, 'POST'))
  }

  /* optical */
  getOptical (token) {
    return this.service.getOptical(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/reimbursements/optical/validate', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/reimbursements/optical/submit', token, 'POST'))
  }

  getPodcasts (token) {
    return this.service.getPodcasts(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/podcasts', token, 'GET'))
  }

  getPodcast (token, id) {
    return this.service.getPodcast(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/podcasts', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/podcasts/reviews', token, 'GET'))
  }

  getPodcastsRecommendations (token) {
    return this.service.getPodcastsRecommendations(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/podcasts/recommendations', token, 'GET'))
  }

  getPodcastsViewed (token) {
    return this.service.getPodcastsViewed(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/podcasts/history/members', token, 'GET'))
  }

  paddRating (token, podcastParam) {
    return this.service.paddRating(token, podcastParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/podcasts/rate', token, 'GET'))
  }

  /* dental reimbursement */
  getDentalReimbursement (token) {
    return this.service.getDentalReimbursement(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/reimbursements/dental/validate?type=1', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/reimbursements/dental/submit', token, 'POST'))
  }

  /* dental loa */

  getDentalLoa (token) {
    return this.service.getDentalLoa(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/issuances/dental/loa/validate?type=1', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/issuances/dental/loa/submit', token, 'POST'))
  }

  /* News */
  getNews (token) {
    return this.service.getNews(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/news', token, 'GET'))
  }

  getNewsImage (token, file) {
    return this.service.getNewsImage(token, file)
      .pipe(ServiceErrorOperator('hr/benefits/v1/uploads?folder=news', token, 'GET'))
      .map(resp => {
        return resp.data
      })
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
  /* Transactions Personal */
  getTransactionsPersonal (token) {
    return this.service.getTransactionsPersonal(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/transactions?type=1', token, 'GET'))
  }

  /* Transactions Approval */
  getTransactionsApproval (token) {
    return this.service.getTransactionsApproval(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/transactions?type=2&status=2', token, 'GET'))
  }

  /* Transaction Details */
  getTransactionsDetails (token, GetTransactionParam) {
    return this.service.getTransactionsDetails(token, GetTransactionParam)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/transactions/${  GetTransactionParam}`, token, 'GET'))
  }

  /* Faqs */
  getFaqs (token) {
    return this.service.getFaqs(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/faqs', token, 'GET'))
  }

  getFaqDetails (token, faqParam) {
    return this.service.getFaqDetails(token, faqParam)
      .pipe(ServiceErrorOperator(`v1/faqs/${faqParam}`, token, 'GET'))
  }

  getFaqsCategories (token) {
    return this.service.getFaqsCategories(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/faqs/categories', token, 'GET'))
  }

  /* Notice of Undertaking */
  updateNotice (token, noticeParam) {
    return this.service.updateNotice(token, noticeParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/agreements', token, 'PUT'))
  }

  /* Feedback */
  getFeedback (token, FeedbackParam) {
    return this.service.getFeedback(token, FeedbackParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/feedback', token, 'GET'))
  }

  addFeedback (token, addFeedbackParam) {
    return this.service.addFeedback(token, addFeedbackParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/feedback', token, 'POST'))
  }

  getPayslipFeedbackCategoriesDiscrepancy (token) {
    return this.service.getPayslipFeedbackCategoriesDiscrepancy(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/payroll/discrepancies/categories', token, 'GET'))
  }

  addPayslipFeedbackDiscrepancy (token, addPayslipFeedbackParam) {
    return this.service.addPayslipFeedbackDiscrepancy(token, addPayslipFeedbackParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/payroll/discrepancies', token, 'POST'))
  }

  addBenefitFeedback (token, addBenefitFeedbackParam) {
    return this.service.addBenefitFeedback(token, addBenefitFeedbackParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/feedback/ratings', token, 'POST'))
  }
  /* Remarks */
  getRemarks (token, remarksParam) {
    return this.service.getRemarks(token, remarksParam)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/transactions/matrix/remarks?benefitId=${  remarksParam}`, token, 'GET'))
  }

  getFaqsCategories (token) {
    return this.service.getFaqsCategories(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/faqs/categories', token, 'GET'))
  }

  updateRemarks (token, remarksParam) {
    return this.service.updateRemarks(token, remarksParam)
      .pipe(ServiceErrorOperator(`v1/transactions/${  remarksParam.transactionId}`, token, 'PUT'))
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
      .pipe(ServiceErrorOperator(`v1/loans/mpl?loanId=${ loanTypesId }&purposeOfAvailment=${ purposeOfLoan }&subcategoryLevel=${ subcategoryLevel }`, token, 'GET'))
  }

  getMplTypes (token) {
    return this.service.getMplTypes(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/loans/mpl/types', token, 'GET'))
  }

  getMplValidate (token, mplValidateParam) {
    return this.service.getMplValidate(token, mplValidateParam)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/loans/mpl/validate?loanId=${ mplValidateParam.loanTypeId }`, token, 'GET'))
  }

  getMplFormAttachments (token, mplGetFormParam) {
    return this.service.getMplFormAttachments (token, mplGetFormParam)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/attachments?purposeOfLoan=${ mplGetFormParam.formRequesting }&loanId=${ mplGetFormParam.loanId }`, token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/loans/mpl/submit', token, 'POST'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/loans/mpl/submit', token, 'POST'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/loans/mpl/submit', token, 'POST'))
  }

  getCarValidate (token) {
    return this.service.getCarValidate(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/leases/car/validate', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/leases/car', token), 'POST')
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/grants/education/personal/submit', token, 'POST'))
  }

  addCarLeasePayment (token, leasesConfirmpaymentParam) {
    return this.service.addCarLeasePayment(token, leasesConfirmpaymentParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/leases/car/payment', token, 'POST'))
  }

  addCarLeaseConfirmation (token, leasesCarConfirm) {
    return this.service.addCarLeaseConfirmation(token, leasesCarConfirm)
      .pipe(ServiceErrorOperator('hr/benefits/v1/leases/car/confirm', token, 'POST'))
  }

  addCarLeaseReleasing (token, leasesCarLeaseReleasingParam) {
    return this.service.addCarLeaseReleasing(token, leasesCarLeaseReleasingParam)
    .pipe(ServiceErrorOperator('hr/benefits/v1/leases/car/release', token, 'POST'))
  }

  getPayslip (token) {
    return this.service.getPayslip(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/leases/car/confirm', token, 'GET'))
  }

  addPayslipSelectedDate (token, payslipParam) {
    return this.service.addPayslipSelectedDate(token, payslipParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/pay', token, 'POST'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/reimbursements/education/personal/submit', token, 'POST'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/grants/education/dependent/submit', token, 'POST'))
  }

  validateGrantAid (token) {
    return this.service.validateGrantAid(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/grants/education/personal/validate', token, 'GET'))
  }

  validateGrantPlan (token) {
    return this.service.validateGrantPlan(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/grants/education/dependent/validate', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v2/reimbursements/education/dependent/submit', token, 'POST'))
  }

  validateAid (token) {
    return this.service.validateAid(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/reimbursements/education/personal/validate', token, 'GET'))
  }

  validateGroupAid (token) {
    return this.service.validateGroupAid(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/reimbursements/education/dependent/validate', token, 'GET'))
  }

  /* Bereavement */
  validateBereavement (token) {
    return this.service.validateBereavement(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/bereavement/validate', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/bereavement/availment', token, 'POST'))
  }

  /* Calamity Assitance */
  validateCalamityAssistance (token) {
    return this.service.validateCalamityAssistance(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/calamity/validate', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/calamity/availment', token, 'POST'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/medical/exam/validate', token, 'GET'))
  }

  getHospitalBranch (token, id) {
    return this.service.getHospitalBranch(token, id)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/medical/hospitals/${ id }/branches`, token, 'GET'))
  }

  addMedicalScheduling (
    token,
    addMedicalSchedulingParam
  ) {
    return this.service.addMedicalScheduling (
      token,
      addMedicalSchedulingParam)
    .pipe(ServiceErrorOperator('hr/benefits/v1/medical/exam/submit',token, 'POST'))
  }

  /* Outpatient Reimbursement */
  validateOutPatientReimbursement (token) {
    return this.service.validateOutPatientReimbursement(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/outpatient/validate', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/outpatient/submit', token, 'POST'))
  }

  /* Employee Trainings */

  getEmployeeTraining (token) {
    return this.service.getEmployeeTraining (token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/trainings', token, 'GET'))
  }

  getEmployeeTrainingDetails (token, id) {
    return this.service.getEmployeeTrainingDetails (token, id)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/trainings/${id}`, token, 'GET'))
  }

  enrollEmployee (token, id) {
    return this.service.enrollEmployee(token, id)
      .pipe(ServiceErrorOperator('hr/benefits/v1/trainings/enroll', token, 'POST'))
  }

  getEnrolledTrainings (token) {
    return this.service.getEnrolledTrainings (token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/trainings/learners/enrolled', token, 'GET'))
  }

  getNeedApprovalTrainings (token) {
    return this.service.getNeedApprovalTrainings (token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/trainings/learners/requests', token, 'GET'))
  }

  getApprovedTrainings (token) {
    return this.service.getApprovedTrainings (token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/trainings/learners/approved', token, 'GET'))
  }

  getApprovalTrainingDetails (id, token) {
    return this.service.getApprovalTrainingDetails (id, token)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/trainings/learners/enrollments/${id}`, token, 'GET'))
  }

  trainingRequest (trainingId, ApprovalTrainingParam, token) {
    return this.service.trainingRequest (trainingId, ApprovalTrainingParam, token)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/trainings/${trainingId}/requests`, token, 'POST'))
  }

  /* Maternity Assistance */
  validateMaternityAssistance (token) {
    return this.service.validateMaternityAssistance(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/maternity/validate', token, 'GET'))
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
    .pipe(ServiceErrorOperator('hr/benefits/v1/maternity/submit', token, 'POST'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/maternity/submit/sss/mat1', token, 'POST'))
  }


  /* Code of Conduct  */

  getCompliancesPdf (token) {
    return this.service.getCompliancesPdf(token)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/compliances/coc`, token, 'GET'))
  }

  submitPin (token, code) {
    return this.service.submitPin(token, code)
      .pipe(ServiceErrorOperator('hr/benefits/v1/compliances/coc', token, 'POST'))
  }

  /* My Existing Loans */
  getExistingLoans (token) {
    return this.service.getExistingLoans(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/loans/mpl/outstanding', token, 'GET'))
  }

  getNonExistingLoans (token) {
    return this.service.getNonExistingLoans(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/loans', token, 'GET'))
  }

  /* Phenom Loans */
  getPhenomDiscounts (token) {
    return this.service.getPhenomDiscounts(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/phenom/discounts?type=corporate', token, 'GET'))
  }

  getPhenomSelectedDiscounts (token, id) {
    return this.service.getPhenomSelectedDiscounts(token, id)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/phenom/discounts/${ id }`, token, 'GET'))
  }

  addPhenomIsHeart (token, id, isHeart) {
    return this.service.addPhenomIsHeart(token, id, isHeart)
      .pipe(ServiceErrorOperator('hr/benefits/v1/phenom/reactions?type=corporate', token, 'POST'))
  }

  getPhenomImage (token, file) {
    return this.service.getPhenomImage(token, file)
      .pipe(ServiceErrorOperator('hr/benefits/v1/uploads?folder=phenom', token, 'GET'))
      .map(resp => {
        return resp.data
      })
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/uploads?folder=phenom', token, 'GET'))
      .map(resp => {
        return resp.data
      })
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/leaves', token, 'POST'))
  }

  /* Pin Enrollment */
  postEnrollPin (token, id) {
    return this.service.postEnrollPin(token , id)
      .pipe(ServiceErrorOperator('hr/benefits/v1/pin', token, 'POST'))
  }

  putEnrollPin (token, putPINParam) {
    return this.service.putEnrollPin(token, putPINParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/pin', token, 'PUT'))
  }

  validateEmployeePin (token, employeePinParam) {
    return this.service.validateEmployeePin(token, employeePinParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/pin/validate', token, 'GET'))
  }

  /* Staff Accounts */
  getForConfirmation (token, id) {
    return this.service.getForConfirmation(token, id)
      .pipe(ServiceErrorOperator('hr/employees/v1/accounts', token, 'GET'))
  }

  addStaffAccounts (token, staffAccountsParam) {
    return this.service.addStaffAccounts(token, staffAccountsParam)
      .pipe(ServiceErrorOperator('hr/employees/v1/accounts', token, 'POST'))
  }

  updateStaffAccounts (token, staffAccountsParam) {
    return this.service.updateStaffAccounts(token, staffAccountsParam)
      .pipe(ServiceErrorOperator('hr/employees/v1/accounts', token, 'PUT'))
  }

  /* Pre Employment */

  getPreEmploymentMessageStatus (token) {
    return this.service.getPreEmploymentMessageStatus (token)
    .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/letters/status', token, 'GET'))
  }

  postPreEmploymentMessageStatus (token, id) {
    return this.service.postPreEmploymentMessageStatus (token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/letters?status=${ id }`, token, 'POST'))
  }

  getPreEmploymentStatus (token) {
    return this.service.getPreEmploymentStatus (token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/requirements/status', token, 'GET'))
  }

  getPreEmploymentAffirmationId (token, affirmId, affirmPage) {
    return this.service.getPreEmploymentAffirmationId(token, affirmId, affirmPage)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/affirmation/${affirmId}?page=${affirmPage}`, token, 'GET'))
  }

  postAffirmPreEmploymentUndertaking (token) {
    return this.service.postAffirmPreEmploymentUndertaking(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/affirmations/employers', token, 'POST'))
  }

  getOnBoardingDocument (token, link) {
    return this.service.getOnBoardingDocument(token, link)
    .pipe(ServiceErrorOperator('hr/files/v1/uploads?folder=documents', token, 'GET'))
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
    .pipe(ServiceErrorOperator('hr/onboarding/v1/uploads?folder=onboarding-requirements', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/affirmations/status', token, 'GET'))
  }

  getFinancialStatus (token) {
    return this.service.getFinancialStatus(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/finances/status', token, 'GET'))
  }

  getFinancialDetails (token) {
    return this.service.getFinancialDetails(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/finances', token, 'GET'))
  }

  addFinancialStatus (token, financialStatusParam) {
    return this.service.addFinancialStatus(token, financialStatusParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/finances', token, 'POST'))
  }

  putFinancialStatus (token, financialStatusParam) {
    return this.service.putFinancialStatus(token, financialStatusParam)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/finances/${financialStatusParam.financeId}`, token, 'PUT'))
  }

  getEmployeeTin (token) {
    return this.service.getEmployeeTin(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/tin', token, 'GET'))
  }

  addEmployeeTin (token, employeeTinParam) {
    return this.service.addEmployeeTin(token, employeeTinParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/tin', token, 'POST'))
  }

  getEmployeeSSS (token) {
    return this.service.getEmployeeSSS(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/sss', token, 'GET'))
  }

  addEmployeeSSS (token, employeeSSSParam) {
    return this.service.addEmployeeSSS(token, employeeSSSParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/sss', token, 'PUT'))
  }

  getPreEmploymentForm (token) {
    return this.service.getPreEmploymentForm(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/requirements?phase=1', token, 'GET'))
  }

  postEnrollPinAffirmationsEmployment (token, pin) {
    return this.service.postEnrollPinAffirmationsEmployment(token, pin)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/affirmations/employers', token, 'POST'))
  }

  postEnrollPinAffirmationsPolicy (token, pin) {
    return this.service.postEnrollPinAffirmationsPolicy(token, pin)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/affirmations/policy', token, 'POST'))
  }

  postEnrollPinAffirmationsConfidential (token, pin) {
    return this.service.postEnrollPinAffirmationsConfidential(token, pin)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/affirmations/confidentiality', token, 'POST'))
  }

  postEnrollPinAffirmationsSecrecy (token, pin) {
    return this.service.postEnrollPinAffirmationsSecrecy(token, pin)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/affirmations/secrecy', token, 'POST'))
  }

  getWorkExperience (token) {
    return this.service.getWorkExperience(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/employers', token, 'GET'))
  }

  getWorkExperienceForm (token) {
    return this.service.getWorkExperienceForm(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/employers/forms/verify', token, 'GET'))
  }

  addWorkExperience (token, workExperienceParam) {
    return this.service.addWorkExperience(token, workExperienceParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/employers', token, 'POST'))
  }

  addEmployeeRequirement (token, requirementParam) {
    return this.service.addEmployeeRequirement(token, requirementParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/requirements?phase=1', token, 'POST'))
  }

  getCharacterReference (token) {
    return this.service.getCharacterReference(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/references', token, 'GET'))
  }

  getCharacterReferenceForm (token) {
    return this.service.getCharacterReferenceForm(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/references/forms', token, 'GET'))
  }

  deleteCharacterReference (token, id) {
    return this.service.deleteCharacterReference(token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/references/${ id }`, token, 'DELETE'))
  }

  postCharacterReference (token, postCharacterReferenceParam) {
    return this.service.postCharacterReference(token, postCharacterReferenceParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/references', token, 'POST'))
  }

  putCharacterReference (token, putCharacterReferenceParam) {
    return this.service.putCharacterReference(token, putCharacterReferenceParam)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/references/{${ putCharacterReferenceParam.id }}`, token, 'PUT'))
  }

  getEmployeeSchool (token) {
    return this.service.getEmployeeSchool(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/school', token, 'GET'))
  }

  getSchoolRecordVerificationForm (token) {
    return this.service.getSchoolRecordVerificationForm(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/school/forms/verify', token, 'GET'))
  }

  getSchoolData (token, pageNumber, find) {
    return this.service.getSchoolData(token, pageNumber, find)
    .pipe(ServiceErrorOperator(`hr/onboarding/v1/schools?pageNumber=${ pageNumber }&find=${ find }`, token, 'GET'))
  }

  addEducationSchool(token, educationParam) {
    return this.service.addEducationSchool(token, educationParam)
    .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/school', token, 'POST'))
  }

  putWorkExperience (token, workExperienceParam) {
    return this.service.putWorkExperience(token, workExperienceParam)
    .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/employers/${workExperienceParam.workExpId}`, token, 'PUT'))
  }

  putEducationSchool(token, educationParam) {
    return this.service.putEducationSchool(token, educationParam)
    .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/school/${educationParam.educId}`, token, 'PUT'))
  }

  getSpouse (token) {
    return this.service.getSpouse(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/spouse', token, 'GET'))
  }

  postSpouseForm (token, spouseFormParam) {
    return this.service.postSpouseForm(token, spouseFormParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/spouse', token, 'POST'))
  }

  putSpouseForm (token, spouseFormParam) {
    return this.service.putSpouseForm(token, spouseFormParam)
      .pipe(ServiceErrorOperator(`v1/employees/spouse/${ spouseFormParam.spouseId }`, token, 'PUT'))
  }

  getChildren (token) {
    return this.service.getChildren(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/children' , token, 'GET'))
  }

  postChildren (token, childrenParam) {
    return this.service.postChildren(token, childrenParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/children', token, 'POST'))
  }

  putChildren (token, childrenParam) {
    return this.service.putChildren(token, childrenParam)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/children/${ childrenParam.childrenId }`, token, 'PUT'))
  }

  addPagibigLoan (token, pagibigParam) {
    return this.service.addPagibigLoan(token, pagibigParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/pagibig/deductions', token, 'POST'))
  }

  getPagibiLoanDeduction (token) {
    return this.service.getPagibiLoanDeduction(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/pagibig/deductions', token, 'GET'))
  }

  getMedicalAppointment (token) {
    return this.service.getMedicalAppointment(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/medical/details', token, 'GET'))
  }

  getMedicalAppointmentProcedures (token) {
    return this.service.getMedicalAppointmentProcedures(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/medical/procedures', token, 'GET'))
  }

  updateMedicalAppointment (token, date, date2, id) {
    return this.service.updateMedicalAppointment(token, date, date2, id)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/medical/schedules', token, 'PUT'))
  }

  getParents (token) {
    return this.service.getParents(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/plans/hospitalization/parents', token, 'GET'))
  }

  updateParentForm (token, parentsParam) {
    return this.service.updateParentForm(token, parentsParam)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/plans/hospitalization/parents/${parentsParam.parentId}`, token, 'PUT'))
  }

  addParentForm (token, parentsParam) {
    return this.service.addParentForm(token, parentsParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/plans/hospitalization/parents', token, 'POST'))
  }

  getSiblings (token) {
    return this.service.getSiblings(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/siblings', token, 'GET'))
  }

  updateSiblingsForm (token, siblingsParam) {
    return this.service.updateSiblingsForm(token, siblingsParam)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/siblings/${siblingsParam.parentId}`, token, 'PUT'))
  }

  addSiblingsForm (token, siblingsParam) {
    return this.service.addSiblingsForm(token, siblingsParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/siblings', token, 'POST'))
  }

  removeWorkExperience (token, id) {
    return this.service.removeWorkExperience(token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/employers/${id}`, token, 'DELETE'))
  }

  removeSchool (token, id) {
    return this.service.removeSchool(token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/school/${id}`, token, 'DELETE'))
  }

  removeSpouse (token, id) {
    return this.service.removeSpouse(token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/spouse/${id}`, token, 'DELETE'))
  }

  removeChildren (token, id) {
    return this.service.removeChildren(token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/children/${id}`, token, 'DELETE'))
  }

  removeParents (token, id) {
    return this.service.removeParents(token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/plans/hospitalization/parents/${id}`, token, 'DELETE'))
  }

  removeSiblings (token, id) {
    return this.service.removeSiblings(token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/siblings/${id}`, token, 'DELETE'))
  }

  removeFinancial (token, id) {
    return this.service.removeFinancial(token, id)
      .pipe(ServiceErrorOperator(`hr/onboarding/v1/employees/finances/${id}`, token, 'DELETE'))
  }

  /*  Post Employment */

  getPostEmployment (token) {
    return this.service.getPostEmployment(token)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/requirements?phase=2', token, 'GET'))
  }

  addPostRequirement (token, employeeParam) {
    return this.service.addPostRequirement(token, employeeParam)
      .pipe(ServiceErrorOperator('hr/onboarding/v1/employees/requirements?phase=2', token, 'POST'))
  }

  /* Vaccines Requisitions */


  validateVaccine (token) {
    return this.service.validateVaccine(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/vaccinations/validate', token, 'GET'))
  }

  addVaccine (token, data) {
    return this.service.addVaccine(token, data)
      .pipe(ServiceErrorOperator('hr/benefits/v1/vaccinations/submit', token, 'POST'))
  }

  /* Devices */

  getEmployeeDevice (token) {
    return this.service.getEmployeeDevice(token)
    .pipe(ServiceErrorOperator())
  }

  /* Laptop Lease */

  confirmLaptopLease (token, transactionId, isConfirm) {
    return this.service.confirmLaptopLease(token, transactionId, isConfirm)
      .pipe(ServiceErrorOperator('hr/benefits/v1/leases/laptop/confirm', token, 'POST'))
  }

  validateLaptopLease (token) {
    return this.service.validateLaptopLease(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/leases/laptop/validate', token, 'GET'))
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
      .pipe(ServiceErrorOperator('hr/benefits/v1/leases/laptop', token, 'POST'))
  }

  /* Travel */

  getAreaData (token, pageNumber, find) {
    return this.service.getAreaData(token, pageNumber, find)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/travels/areas?find=${find}&pageNumber=${pageNumber}`, token, 'GET'))
  }

  getTravels (token, statusId) {
    return this.service.getTravels(token, statusId)
    .pipe(ServiceErrorOperator(`v1/travels${ statusId ? `?status=${statusId}` : ''}`, token, 'GET'))
  }

  getTravelGroup (token) {
    return this.service.getTravelGroup(token)
    .pipe(ServiceErrorOperator('hr/benefits/v1/travels/groups', token, 'GET'))
  }

  getApproval (token) {
    return this.service.getApproval(token)
    .pipe(ServiceErrorOperator('hr/benefits/v1/travels/approval', token, 'GET'))
  }

  addRequestOneWay (
    token,
    requestParam,
    ) {
    return this.service.addRequestOneWay(
      token,
      requestParam,
    )
    .pipe(ServiceErrorOperator('hr/benefits/v1/travels', token, 'POST'))
  }

  addRequestRoundTrip (
    token,
    requestParam,
    ) {
    return this.service.addRequestRoundTrip(
      token,
      requestParam,
    )
    .pipe(ServiceErrorOperator('hr/benefits/v1/travels', token, 'POST'))
  }

  addBookFlight (
    token,
    bookParam,
    ) {
    return this.service.addBookFlight(
      token,
      bookParam,
    )
    .pipe(ServiceErrorOperator('hr/benefits/v1/travels/book', token, 'POST'))
  }

  addLiquidation (
    token,
    liquidationParam,
    ) {
    return this.service.addLiquidation(
      token,
      liquidationParam,
    )
    .pipe(ServiceErrorOperator('hr/benefits/v1/travels/liquidate', token, 'POST'))
  }

  addApproval (
    token,
    approvalParam,
    ) {
    return this.service.addApproval(
      token,
      approvalParam,
    )
    .pipe(ServiceErrorOperator('hr/benefits/v1/travels/approval', token, 'POST'))
  }

  getTravelTraining (token) {
    return this.service.getTravelTraining(token)
    .pipe(ServiceErrorOperator('hr/benefits/v1/travels/trainings'))
  }

  /* News isHeart */

  addNewsIsHeart (token, id, isHeart) {
    return this.service.addNewsIsHeart(token, id, isHeart)
      .pipe(ServiceErrorOperator('hr/benefits/v1/news/likes', token, 'POST'))
  }

  /* Events Budget */

  validateEventsBudget (token) {
    return this.service.validateEventsBudget(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/events/validate?pageNumber=1&pageItem=1', token, 'GET'))
  }

  uploadEventsBudgetReceipt (token, id, attachments) {
    return this.service.uploadEventsBudgetReceipt (token, id, attachments)
      .pipe(ServiceErrorOperator('hr/benefits/v1/events/submit', token, 'POST'))
  }

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
      .pipe(ServiceErrorOperator('hr/benefits/v1/events/submit', token, 'POST'))
  }

  // Pay For Skills
  getPaySkills (token) {
    return this.service.getPaySkills(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/skills/programs', token, 'GET'))
  }

  getPaySkillsList (token, id) {
    return this.service.getPaySkillsList(token, id)
      .pipe(ServiceErrorOperator('hr/benefits/v1/skills/details', token, 'GET'))
  }

  submitPaySkills (token, bodyParam) {
    return this.service.submitPaySkills(token, bodyParam)
      .pipe(ServiceErrorOperator('hr/benefits/v1/skills/submit', token, 'POST'))
  }

  /* My Goals */
  getGoals (token, goalType) {
    return this.service.getGoals(token, goalType)
    .pipe(ServiceErrorOperator('hr/benefits/v1/goals?status=', token, 'GET'))
  }

  addRequestedGoals (token, requestedGoalsParam) {
    return this.service.addRequestedGoals(token, requestedGoalsParam)
    .pipe(ServiceErrorOperator('hr/benefits/v1/goals?goalType=personal', token, 'POST'))
  }

  updateGoals (token, goalId, startDate, dueDate) {
    return this.service.updateGoals(token, goalId, startDate, dueDate)
    .pipe(ServiceErrorOperator(`v1/goal/${goalId.goalId}?goalType=${ goalId.goalType }`))
  }

  getForApprovalGoals (token) {
    return this.service.getForApprovalGoals(token)
    .pipe(ServiceErrorOperator('hr/benefits/v1/goals/reports?goalType=personal&status=1,4,5', token, 'GET'))
  }

  approveGoal (token, approvalGoalsParam) {
    return this.service.approveGoal(token, approvalGoalsParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/approval?goalType=${approvalGoalsParam.goalType}`, token, 'POST'))
  }

  requestCoach (token, requestCoachParam) {
    return this.service.requestCoach(token, requestCoachParam)
    .pipe(ServiceErrorOperator('hr/benefits/v1/coach', token, 'POST'))
  }

  addGoalTask (token, goalTaskParam) {
    return this.service.addGoalTask(token, goalTaskParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/tasks?goalId=${goalTaskParam.body.id}&goalType=${goalTaskParam.goalType}`, token, 'POST'))
  }

  getGoalTask (token, goalId) {
    return this.service.getGoalTask(token, goalId)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/tasks?goalType=${goalTask.goalType}&goalId=${goalTask.goalId}`, token, 'GET'))
  }

  addGoalComment (token, goalCommentParam) {
    return this.service.addGoalComment(token, goalCommentParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/comments?goalType=${goalCommentParam.goalType}`, token, 'POST'))
  }

  getGoalComment (token, goalId, pageNumber, pageItem) {
    return this.service.getGoalComment(token, goalId, pageNumber, pageItem)
    .pipe(ServiceErrorOperator(`hr/benefits/hrv1/goals/comments?pageNumber=${pageNumber}&pageItem=${pageItem}&goalId=${goalId.goalId}&goalType=${goalId.goalType}`, token, 'GET'))
  }

  getSquadGoalComment (token, goalId, pageNumber, pageItem, goalType) {
    return this.service.getSquadGoalComment(token, goalId, pageNumber, pageItem, goalType)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/comments?pageNumber=${pageNumber}&pageItem=${pageItem}&goalId=${goalId}&goalType=${goalType}`, token, 'GET'))
  }

  updateGoalTask (token, goalId, taskDescription, isCompleted) {
    return this.service.updateGoalTask(token,  goalId, taskDescription, isCompleted)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/tasks/${goalId.taskId}?goalType=${goalId.goalType}`, token, 'PUT'))
  }

  updateGoalComment (token, commentId, goalComment) {
    return this.service.updateGoalComment(token, commentId, goalComment)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/comments/${commentId}`, token, 'PUT'))
  }

  deleteGoal (token, goalId) {
    return this.service.deleteGoal(token, goalId)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/goal/${goalParam.goalId}?goalType=${goalParam.goalType}`, token, 'DELETE'))
  }

  deleteTask (token, taskId) {
    return this.service.deleteTask(token, taskId)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/tasks/${taskId}?isArchived=1`, token, 'DELETE'))
  }

  deleteComment (token, commentId) {
    return this.service.deleteComment(token, commentId)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/comments/${commentId}?isArchived=1`, token, 'DELETE'))
  }

  getTeamGoals (token, goalType) {
    return this.service.getTeamGoals(token, goalType)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/reports?goalType=${goalType}&status=1,2,5,8`, token, 'GET'))
  }

  addSquadGoalComment (token, squadCommentParam) {
    return this.service.addSquadGoalComment(token, squadCommentParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/comments?goalType=${squadGoalParam.type}`, token, 'POST'))
  }

  getGoalsHistory (token, goalId, pageNumber, pageItem) {
    return this.service.getGoalsHistory(token, goalId, pageNumber, pageItem)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/${goalId}/history?pageItem=${pageItem}&pageNumber=${pageNumber}`, token, 'GET'))
  }

  addRatingGoal (token, ratingParam) {
    return this.service.addRatingGoal(token, ratingParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/${ratingParam.goalId}/rate?goalType=${ratingParam.goalType}`, token, 'POST'))
  }

  markAsCompletedWithType (token, markParam) {
    return this.service.markAsCompletedWithType(token, markParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/${markParam.id}/remarks or v1/goals/${markParam.goalId}/completion?goalType=${markParam.type}`, token, 'POST'))
  }

  addTeamGoals (token, teamGoalsParam) {
    return this.service.addTeamGoals(token, teamGoalsParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals?goalType=${teamGoalsParam.goalType}`, token, 'POST'))
  }

  addSquadGoals (token, squadGoalsParam) {
    return this.service.addSquadGoals(token, squadGoalsParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals?goalType=${squadGoalsParam.goalType}`, token, 'POST'))
  }

  getSquadGoals (token, goalType) {
    return this.service.getSquadGoals(token, goalType)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/members?goalType=${goalType}`, token, 'GET'))
  }

  getMembersGoals (token, goalType) {
    return this.service.getMembersGoals(token, goalType)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/members?goalType=${goalType}`, token, 'GET'))
  }

  getDirectReportGoals (token, status) {
    return this.service.getDirectReportGoals(token, status)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/reports?goalType=personal&status=2,6,8`, token, 'GET'))
  }

  getGoalsForConfirmation (token) {
    return this.service.getGoalsForConfirmation(token)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/goals?status=1`, token, 'GET'))
  }

  getGoalGroupList (token) {
    return this.service.getGoalGroupList(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/goals/groups', token, 'GET'))
  }

  getGroupDetailsById (token, id) {
    return this.service.getGroupDetailsById(token, id)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/groups/${ id }`, token, 'GET'))
  }

  /* Certificaqte of Employment */

  getPurposeCoeType (token, data) {
    return this.service.getPurposeCoeType(token, data)
    .pipe(ServiceErrorOperator(`v1/coe/libraries?type=${ data }`, token, 'GET'))
  }

  getCountryCoeType (token, data) {
    return this.service.getCountryCoeType(token, data)
    .pipe(ServiceErrorOperator(`v1/coe/libraries?type=${ data }`, token, 'GET'))
  }

  submitCoe (token, bodyParam) {
    return this.service.submitCoe(token, bodyParam)
    .pipe(ServiceErrorOperator(`v1/coe`, token, 'POST'))
  }

  // PensionFunds

  getPensionFunds (token) {
    return this.service.getPensionFunds(token)
    .pipe(ServiceErrorOperator('/appian/pension/v1/investments', token, 'GET'))
  }

  cancelContributionalAmount (token, code) {
    return this.service.cancelContributionalAmount(token, code)
    .pipe(ServiceErrorOperator('appian/pension/v1/cancel', token, 'POST'))
  }

  getPensionFundsDocuments (token) {
    return this.service.getPensionFundsDocuments (token)
    .pipe(ServiceErrorOperator('appian/pension/v1/agreements', token, 'GET'))
  }

  addPensionFundsDocuments (token) {
    return this.service.addPensionFundsDocuments (token)
    .pipe(ServiceErrorOperator('appian/pension/v1/agreements', token, 'POST'))
  }

  addPensionContributional (token, amount, code) {
    return this.service.addPensionContributional (token, amount, code)
    .pipe(ServiceErrorOperator('appian/pension/v1/availments', token, 'POST'))
  }

  updatePensionContributional (token, amount, code, id) {
    return this.service.updatePensionContributional (token, amount, code, id)
    .pipe(ServiceErrorOperator(`appian/pension/v1/contribution/${id ? id : null}`, token, 'PUT'))
  }

  getPensionFundsHistory (token) {
    return this.service.getPensionFundsHistory (token)
    .pipe(ServiceErrorOperator())
  }

  getPensionValidate (token) {
    return this.service.getPensionValidate(token)
    .pipe(ServiceErrorOperator('appian/pension/v1', token, 'GET'))
  }

  getPensionFundsDatePagination (token, limit, start, fromDate, toDate) {
    // const objectParam = {
    //   limit : 100,
    //   totalRecords: 1,
    //   page: 1,
    //   records : [
    //     {
    //       id: 0,
    //       applicableNavDate: '2019-01-04',
    //       description: '',
    //       bidRate: 11.0
    //     },
    //     {
    //       id: 1,
    //       applicableNavDate: '2019-02-03',
    //       description: '',
    //       bidRate: 20.0
    //     },
    //     {
    //       id: 2,
    //       applicableNavDate: '2019-02-24',
    //       description: '',
    //       bidRate: 5.0
    //     },
    //     {
    //       id: 3,
    //       applicableNavDate: '2019-02-22',
    //       description: '',
    //       bidRate: 10.0
    //     },
    //     {
    //       id: 4,
    //       applicableNavDate: '2019-02-18',
    //       description: '',
    //       bidRate: 14.0
    //     },
    //   ]
    // }
    // return Observable.create(observer => {
    //   observer.next(objectParam)
    //   observer.complete()
    // })
    return this.service.getPensionFundsDatePagination(token, limit, start, fromDate, toDate)
    .pipe(ServiceErrorOperator(`finacle/v1/uitf/products/navpu?fromDate=${fromDate}&page=1&toDate=${toDate}&limit=${limit}&product=TF107`, token, 'GET'))
  }

  // Reward Goals
  getRewardsDNAMoment (token, id) {
    return this.service.getRewardsDNAMoment(token, id)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/rewards?awardId=${ id }`, token, 'GET'))
  }

  getRewardAwards (token) {
    return this.service.getRewardAwards(token)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/rewards/awards`, token, 'GET'))
  }

  getRewardPoints (token) {
    return this.service.getRewardPoints(token)
      .pipe(ServiceErrorOperator('hr/benefits/v1/rewards?', token, 'GET'))
  }

  getRewardsAccountValidate (token, id) {
    return this.service.getRewardsAccountValidate(token, id)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/rewards/validate?awardType=${id}`, token, 'GET'))
  }

  getRewardGiftsDetails (token, id) {
    return this.service.getRewardGiftsDetails(token, id)
    .pipe(ServiceErrorOperator(`hr/giftaway/v1/merchants/${ id }`, token, 'GET'))
  }

  getRewardGifts (token) {
    return this.service.getRewardGifts(token)
    .pipe(ServiceErrorOperator(`hr/giftaway/v1/merchants`, token, 'GET'))
  }

  addRewardGiftsDenominations (token, merchant, mode) {
    return this.service.addRewardGiftsDenominations (token, merchant, mode)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/rewards/redeem?mode=${mode}`, token, 'POST'))
  }

  submitAwards (token, objectParam) {
    return this.service.submitAwards(token, objectParam)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/rewards`, token, 'POST'))
  }

  getEligibleInRewards (token, type, string) {
    return this.service.getEligibleInRewards(token, type, string)
    .pipe(ServiceErrorOperator(`hr/benefits/v1/rewards/candidates?awardType=${type}&keyword=${ string }`, token, 'GET'))
  }

  getGiftOrderDetails (token, refNo) {
    return this.service.getGiftOrderDetails(token, refNo)
    .pipe(ServiceErrorOperator(`hr/benefits/hr/giftaway/v1/orders?referenceNo=${refNo}`, token, 'GET'))
  }

  // Bir2316 My Documents
  getBir2316List (token) {
    return this.service.getBir2316List(token)
    .pipe(ServiceErrorOperator('v1/bir/history', token, 'GET'))
  }

  requestBIR2316 (token, year) {
    return this.service.requestBIR2316(token, year)
    .pipe(ServiceErrorOperator('v1/bir', token, 'POST'))
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

  //Squads and Workforce
  getSquads (token, squadId, page) {
    return this.service.getSquads(token, squadId, page)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/squad?page=${page}`, token, 'GET'))
  }

  getVacancies (token, positionId, squadId, pageNumber) {
    return this.service.getVacancies(token, positionId, squadId, pageNumber)
      .pipe(ServiceErrorOperator(`hr/benefits/v1/goals/vacancies?goalType=squad&squadId=${squadId}`, token, 'GET'))
  }

  submitSquads (token, positionId) {
    return this.service.submitSquads(token, positionId)
      .pipe(ServiceErrorOperator('hr/benefits/v1/goals/vacancies/submit', token, 'GET'))
  }

  getStatusSquadApplication (token, isActive) {
    return this.service.getStatusSquadApplication(token, isActive)
      .pipe(ServiceErrorOperator(`v1/goals/squad/applications?status=${ isActive }`, token, 'GET'))
  }
}
