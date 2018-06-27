
export default class HRBenefitsService {
  constructor (apiClient, imageClient) {
    this.apiClient = apiClient
    this.imageClient = imageClient
  }

  /* user */
  login (loginParam) {
    return this.apiClient.post('v1/login', loginParam)
  }

  logout (token) {
    return this.apiClient.post('v1/logout', {token})
  }

  otp (otpParam) {
    return this.apiClient.post('v2/otp', otpParam)
  }

  resend (resendOtpParam) {
    return this.apiClient.post('v1/otp/resend', resendOtpParam)
  }

  profile (token) {
    return this.apiClient.get('v1/profile', {
      headers : { token }
    })
  }

  validateTermsAndCondition (token) {
    return this.apiClient.post('v1/agreements/tnc', null, {
      headers : { token }
    })
  }

  /* dental loa */

  getDentalLoa (token) {
    return this.apiClient.get('v1/issuances/dental/loa/validate?type=1', {
      headers: { token }
    })
  }

  addDentalLoa (
    token,
    accountToken,
    accountNo,
    releasingCenter,
    dentalLoaParam) {
    const dentalLoaObject = {
      accountNo,
      releasingCenter,
      type : 1,
      dependentId : dentalLoaParam.dependent,
      dentalClinicId : dentalLoaParam.branch,
      preferredDate : dentalLoaParam.date,
      dentalProcedure : dentalLoaParam.procedure
    }
    return this.apiClient.post('v1/issuances/dental/loa/submit', dentalLoaObject, {
      headers : { token }
    })
  }

  /* dental reimbursements */

  getDentalReimbursement (token) {
    return this.apiClient.get('v1/reimbursements/dental/validate?type=1', {
      headers: { token }
    })
  }

  addDentalReimbursement (token, accountToken, accountNumber, releasingCenter, dentalReimbursementParam) {
    const formData = new FormData()
    const dentalRObject = {
      accountNumber,
      releasingCenter,
      type : 1,
      procedures : dentalReimbursementParam.procedure
    }

    formData.append('uuid', 12345)
    formData.append('dentcert1', dentalReimbursementParam.file1)
    formData.append('dependentId', dentalReimbursementParam.dependentId)
    formData.append('dentcert2', dentalReimbursementParam.file2)
    formData.append('body', JSON.stringify(dentalRObject))
    return this.apiClient.post('v2/reimbursements/dental/submit', formData, {
      headers : { token }
    })
  }

  /* Optical */
  getOptical (token) {
    return this.apiClient.get('v1/reimbursements/optical/validate', {
      headers : { token }
    })
  }

  addOptical (token, accountToken, accountNumber, releasingCenter, opticalParam) {
    const formData = new FormData()
    const opticalObject = {
      accountNumber,
      amount: opticalParam.amount,
      releasingCenter,
      distributor: 'distributorTest'
    }
    formData.append('uuid', 123345)
    formData.append('med', opticalParam.medCert)
    formData.append('opt', opticalParam.optCert)
    formData.append('body', JSON.stringify(opticalObject))
    return this.apiClient.post('v2/reimbursements/optical/submit', formData, {
      headers : { token }
    })
  }



  /* account */
  validateAccountNumber (token, accountNumber) {
     return this.apiClient.get(`accounts/v1/${accountNumber}`, {
        headers: {
           'Content-Type': 'application/json',
           token,
           referenceId : Math.random().toString(36).substring(7),
       }
     })
   }
  /* rds */
  getReleasingCenters (token) {
    return this.apiClient.get('v1/rds/centers', {
      headers: { token }
    })
  }

  /* library */
  getBooks (token, pageNumber, find) {
    return this.apiClient.get(`v1/books?pageNumber=${pageNumber}&find=${find}`, {
      headers: { token }
    })
  }

  getBooksBorrowed (token, borrowedPageNumber, find) {
    return this.apiClient.get(`v1/books/history?pageNumber=${borrowedPageNumber}&find=${find}`, {
        headers: { token }
    })
  }

 reserveBook (token, ReserveParam) {
    return this.apiClient.post('v1/books/reservation', {
      books: ReserveParam
    }, {
      headers: { token }
    })
  }

  addRating (token, bookParam) {
    return this.apiClient.post('v1/books/rate', bookParam, {
      headers : { token }
    })
  }

  /* News */
  getNews (token) {
    return this.apiClient.get('v1/news', {
        headers: { token }
    })
  }


 /* Podcasts */
  getPodcasts (token) {
    return this.apiClient.get('v1/podcasts', {
        headers: { token }
    })
  }

  getPodcast (token) {
    return this.apiClient.get('v1/podcasts', {
      headers: { token }
    })
  }

  getPodcastsReviews (token) {
    return this.apiClient.get('v1/podcasts/reviews', {
        headers: { token }
    })
  }

  getPodcastsRecommendations (token) {
    return this.apiClient.get('v1/podcasts/recommendations', {
        headers: { token }
    })
  }

  getPodcastsViewed (token) {
    return this.apiClient.get('v1/podcasts/history/members', {
        headers: { token }
    })
  }
  /* Updated Podcast rating */
  paddRating (token, podcastParam) {
    return this.apiClient.post('v1/podcasts/rate', podcastParam, {
      headers : { token }
    })
  }

  /* FAQ's */
  getFaqs (token) {
    return this.apiClient.get('v1/faqs', {
      headers: { token }
    })
  }

  getFaqDetails (token, faqParam) {
    return this.apiClient.get(`v1/faqs/${faqParam}`, {
      headers: { token }
    })
  }
  /* notice of undertaking */

  updateNotice (token, noticeParam) {
    return this.apiClient.put('v1/agreements', noticeParam, {
      headers: { token }
    })
  }
/* Feedback */

  getFeedback (token) {
    return this.apiClient.get('v1/feedback', {
      headers: { token }
    })
  }

  addFeedback (token,addFeedbackParam) {
    return this.apiClient.post('v1/feedback', addFeedbackParam, {
      headers: { token }
    })
  }

  addBenefitFeedback (token, addBenefitFeedbackParam) {
    return this.apiClient.post('v1/feedback/ratings', addBenefitFeedbackParam, {
      headers: { token }
    })
  }

  getFaqsCategories (token) {
    return this.apiClient.get('v1/faqs/categories', {
      headers: { token }
    })
  }

  /* Transactions Personal */
  getTransactionsPersonal (token) {
    return this.apiClient.get('v1/transactions?type=1', {
      headers: { token }
    })
  }

  /* Transactions Approval */
  getTransactionsApproval (token) {
    return this.apiClient.get('v1/transactions?type=2&status=2', {
      headers: { token }
    })
  }

  /* Transactions Details */
  getTransactionsDetails (token, GetTransactionParam) {
    return this.apiClient.get(`v1/transactions/${  GetTransactionParam}`, {
      headers: { token }
    })
  }

  /* Remarks */

  getRemarks (token, remarksParam) {
    return this.apiClient.get(`v1/transactions/matrix/remarks?benefitId=${  remarksParam}`, {
      headers: { token }
    })
  }

  updateRemarks (token, updateTransactionParam) {
    const transactionDetails = {
      approve : updateTransactionParam.approve,
      remarks : updateTransactionParam.remarks,
    }
    return this.apiClient.put(`v1/transactions/${  updateTransactionParam.transactionId}`, transactionDetails, {
      headers : { token }
    })
  }

  /* MPL Service */

  /* Purpose of Availment */

  getMplPurposeOfAvailment (token, {
    loanTypesId,
    purposeOfLoan,
    subcategoryLevel }
    ) {
      return this.apiClient.get(`v1/loans/mpl?loanId=${ loanTypesId }&purposeOfAvailment=${ purposeOfLoan }&subcategoryLevel=${ subcategoryLevel }`, {
        headers: { token }
      })
  }

  /* Types */

  getMplTypes (token) {
    return this.apiClient.get('v1/loans/mpl/types', {
      headers: { token }
    })
  }

  /* Validate */

  getMplValidate (token, mplValidateParam) {
    return this.apiClient.get(`v1/loans/mpl/validate?loanId=${ mplValidateParam.loanTypeId }`, {
      headers: { token }
    })
  }

  getMplFormAttachments (token, mplGetFormParam) {
    return this.apiClient.get(`v1/attachments?purposeOfLoan=${ mplGetFormParam.formRequesting }&loanId=${ mplGetFormParam.loanId }`, {
        headers: { token }
    })
  }

  addLoan (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    mplPurposeLoanAddParam) {
    const formData = new FormData()
    const multiLoanBodyObject = {
      loan : {
        id : mplPurposeLoanAddParam.loanId,
        purpose : mplPurposeLoanAddParam.purposeOfLoan,
        mode : mplPurposeLoanAddParam.modeOfLoan,
        term : mplPurposeLoanAddParam.loanTerm,
        principalAmount : mplPurposeLoanAddParam.principalLoanAmount
      },
      accountNumber : accountNumber,
      promissoryNoteNumbers : [],
      relesingCenter : releasingCenter,
      distributor : "distributorTest",
    }
    formData.append('uuid', 12345)
    formData.append('body', JSON.stringify(multiLoanBodyObject))
    formData.append('MPL-cert', mplPurposeLoanAddParam.attachments)
    return this.apiClient.post('v2/loans/mpl/submit', formData, {
      headers : { token }
    })
  }

  getCarValidate (token) {
    return this.apiClient.get('v1/eligibility/car', {
      headers: { token }
    })
  }

  addCarRequest (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    carRequestParam) {
    const formData = new FormData()
    const addCarleaseObject = {
      accountNumber : accountNumber,
      releasingCenter : releasingCenter,
      brand : carRequestParam.carBrand,
      model : carRequestParam.carModel,
      year : carRequestParam.year,
      leaseMode : carRequestParam.leaseMode,
      primaryColor : carRequestParam.primaryColor,
      secondaryColor : carRequestParam.secondaryColor,
    }
    formData.append('uuid', 12345)
    formData.append('body', JSON.stringify(addCarleaseObject))
    formData.append('attachments', carRequestParam.attachments)
    return this.apiClient.post('v1/leases/car', carRequestParam, {
      headers: { token }
    })
  }

  addCarLeasePayment (token) {
    return this.apiClient.post('v1/leases/car/payment', {
      headers: { token }
    })
  }

  addCarLeaseConfirmation (token) {
    return this.apiClient.post('v1/leases/car/confirm', {
      headers: { token }
    })
  }

  /* Education */

  getEducationAid (token) {
    return this.apiClient.get('v1/reimbursements/education/personal/validate', {
      headers: { token }
    })
  }

  addEducationAid (
    token,
    accountToken,
    accountNo,
    releasingCenter,
    dentalLoaParam) {
    const dentalLoaObject = {
      accountNo,
      releasingCenter,
      type : 1,
      dependentId : dentalLoaParam.dependent,
      dentalClinicId : dentalLoaParam.branch,
      preferredDate : dentalLoaParam.date,
      dentalProcedure : dentalLoaParam.procedure
    }
    return this.apiClient.post('v1/issuances/dental/loa/submit', dentalLoaObject, {
      headers : { token }
      })
  }

  /* validate grant aid */
  validateGrantAid (token) {
    return this.apiClient.get('v1/grants/education/personal/validate', {
      headers: { token }
    })
  }

  getPayslip (token) {
    return this.apiClient.post('v1/payslip', {
      headers : { token }
    })
  }

  getPayslipSelectedDate (token, payslipParam) {
    return this.apiClient.post('v1/payslip/', payslipParam, {
      headers : { token }
    })
  }

}
