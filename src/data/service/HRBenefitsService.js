export default class HRBenefitsService {
  constructor (apiClient, accountClient, fileClient, onboardingClient) {
    this.apiClient = apiClient
    this.accountClient = accountClient
    this.fileClient = fileClient
    this.onboardingClient = onboardingClient
  }

  /* user */
  login (loginParam) {
    return this.apiClient.post('v1/login', loginParam)
  }

  logout (token) {
    return this.apiClient.post('v1/logout', { token })
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

  /* Updated Profile */

  updateDescription (token, description) {
    return this.accountClient.put('v1/profile/description', {
      description
    },{
      headers : { token }
    })
  }

  updateEmailAddress (token, emailAddress) {
    return this.apiClient.put('v1/profile/email', {
      emailAddress
    },{
      headers : { token }
    })
  }

  updateContactNumber(token, mobileNumber) {
    console.log('service')
    return this.apiClient.put('v1/profile/mobile', {
      mobileNumber
    },{
      headers : { token }
    })
  }

  updateAddress (token, address, file) {
    const formData = new FormData()
    const objectParam = {
      address : address.address,
      region: address.region,
      country: address.country,
      postalCode: address.postalCode,
    }

    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    file.map((resp, key) => (
      formData.append('file', resp.file)
    ))
    formData.append('body', JSON.stringify(objectParam))
    return this.apiClient.put('v1/profile/address', formData, {
      headers : { token }
    })
  }

  updateProfilePicture (token, image) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    console.log(image)
    image.map((resp, key) =>
      formData.append('file', resp.file)
    )
    return this.accountClient.put('v1/employees/profile/image', formData, {
      headers : { token }
    })
  }

  updateCivilStatus (token, civilStatus) {
    return this.apiClient.put('v1/profile/civil-status', {
      civilStatus
    }, {
      headers : { token }
    })
  }

  getProfilePicture (token, file) {
    return this.fileClient.get('v1/uploads?folder=attachments', {
      headers : {
        token,
        file : file
      },
      responseType : 'blob'
    })
  }

  /* Get Registered Deveices*/

  getDevices (token) {
    return this.apiClient.get('v1/devices', {
      headers : { token }
    })
  }


  /* Reset Password */
  requestEmailVerification (token, empId, date) {
    const objectParam = {
      employeeNumber: empId,
      birthDate : date,
    }
    return this.apiClient.post('v1/password/reset/email', objectParam, {
      headers : { token }
    })
  }

  requestOtpVerification (token, otp) {
    const objectParam = {
      otp : otp
    }
    return this.apiClient.post('v1/password/email/otp', objectParam, {
      headers : { token }
    })
  }

  requestNewPassword (token, newPassword, otp) {
    const objectParam = {
      password: newPassword,
    }
    return this.apiClient.post('v1/password/reset', objectParam, {
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
      type : dentalLoaParam.dependent === 1 ? 1 : 2,
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
      type : dentalReimbursementParam.dependentId !== 1 ? 2 : 1,
      procedures : dentalReimbursementParam.procedure,
      dependentId : dentalReimbursementParam.dependentId,
      orNumber :  dentalReimbursementParam.orNumber,
      orDate : dentalReimbursementParam.orDate.format('MM/DD/YYYY')
    }

    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    formData.append('body', JSON.stringify(dentalRObject))
    dentalReimbursementParam.attachments.map((resp, key) => (
      formData.append(resp.name.replace('/', '-'), resp.file)
      )
    )
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
    formData.append('uuid', 123345)
    const opticalObject = {
      accountNumber,
      releasingCenter,
      amount: opticalParam.amount,
      orDate: opticalParam.orDate,
      orNumber : opticalParam.orNumber,
      distributor: 'distributorTest'
    }
    opticalParam.attachmentData.map((resp) => (
      formData.append(resp.name.replace('/', '-'), resp.file)
      )
    )
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
           referenceId : Math.random().toString(36)
            .substring(7),
       }
     })
   }

  updateAccountNumber (token, accountNumber) {
    return this.accountClient.post(`v1/employees/accounts`, { accountNumber }, {
      headers : { token }
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

  getBooksRecommended (token, pageNumber, find, isEditorsPick) {
    return this.apiClient.get(`v1/books?pageNumber=${ pageNumber }&find=${ find }&isEditorsPick=${ isEditorsPick }`, {
      headers : { token }
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
    const objectBook = {
      id : bookParam.id,
      rate : bookParam.rate,
      comments : bookParam.comments,
    }
    return this.apiClient.post('v1/books/rate', objectBook, {
      headers : { token }
    })
  }

  getBooksComments (token , itemId, page, items) {
    return this.apiClient.get(`v1/books/comments?bookId=${itemId}&page=${page}&items=${items}`, {
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

  getPayslipFeedbackCategoriesDiscrepancy (token) {
    return this.apiClient.get('v1/payroll/discrepancies/categories', {
      headers : { token }
    })
  }

  addPayslipFeedbackDiscrepancy (token, addPayslipFeedbackParam) {
    return this.apiClient.post('v1/payroll/discrepancies', addPayslipFeedbackParam, {
      headers : { token }
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
      accountNumber,
      releasingCenter,
      loan : {
        id : mplPurposeLoanAddParam.loanType,
        purpose : mplPurposeLoanAddParam.poaText,
        mode : mplPurposeLoanAddParam.modeOfLoanId,
        term : mplPurposeLoanAddParam.termId,
        principalAmount : mplPurposeLoanAddParam.amountValue
      },
        promissoryNoteNumbers : mplPurposeLoanAddParam.selectedOffsetLoan,
        distributor : mplPurposeLoanAddParam.dealerName,
      }
      formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
      formData.append('body', JSON.stringify(multiLoanBodyObject))
      mplPurposeLoanAddParam.attachments &&
      mplPurposeLoanAddParam.attachments.map((attachment, key) => (
        formData.append(attachment.label, attachment.file)
      ))
    return this.apiClient.post('v2/loans/mpl/submit', formData, {
      headers : { token }
    })
  }

  addLoanMotor (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addMotorLoanParam) {
    const formData = new FormData()
    const multiLoanBodyObject = {
      releasingCenter,
      accountNumber,
      promissoryNoteNumbers : addMotorLoanParam.selectedOffsetLoan,
      distributor : addMotorLoanParam.dealerName,
      loan : {
        id : addMotorLoanParam.loanType,
        mode : addMotorLoanParam.modeOfLoanId ? 2 : 1,
        principalAmount : addMotorLoanParam.amountValue,
        purpose : addMotorLoanParam.poaText,
        term : addMotorLoanParam.termId,
      },
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    formData.append('body', JSON.stringify(multiLoanBodyObject))
    addMotorLoanParam.attachments.map((attachment, key) => (
      formData.append(attachment.label, attachment.file)
    ))
    return this.apiClient.post('v2/loans/mpl/submit', formData, {
      headers : { token }
    })
  }

  addLoanComputer (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addComputerLoanParam) {
    const formData = new FormData()
    const multiLoanBodyObject = {
      releasingCenter,
      accountNumber,
      loan : {
        id : addComputerLoanParam.loanType,
        mode : addComputerLoanParam.modeOfLoanId ? 2 : 1,
        principalAmount : addComputerLoanParam.amountValue,
        purpose : addComputerLoanParam.poaText,
        term : addComputerLoanParam.termId,
      },
      promissoryNoteNumbers : addComputerLoanParam.selectedOffsetLoan,
      distributor : addComputerLoanParam.supplierName,
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    formData.append('body', JSON.stringify(multiLoanBodyObject))
    addComputerLoanParam.attachments.map((attachment, key) => (
      formData.append(attachment.label, attachment.file)
    ))
    return this.apiClient.post('v2/loans/mpl/submit', formData, {
      headers : { token }
    })
  }

  getCarValidate (token) {
    return this.apiClient.get('v1/leases/car/validate', {
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
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    const addCarleaseObject = {
      accountNumber,
      releasingCenter,
      brand : carRequestParam.carBrand,
      model : carRequestParam.carModel,
      year : carRequestParam.makeYear,
      insurancePayment: carRequestParam.insurancePayment,
      leaseMode : carRequestParam.leaseMode,
      solRC: carRequestParam.solRCDefault,
      solId: carRequestParam.solId,
      primaryColor : carRequestParam.primaryColor,
      secondaryColor : carRequestParam.secondaryColor,
    }
    carRequestParam.file.map((attachment, key) =>
      (
        formData.append(attachment.name.replace('/', '-'), attachment.file)
      )
    )
    formData.append('body', JSON.stringify(addCarleaseObject))
    return this.apiClient.post('v1/leases/car', formData, {
      headers: { token }
    })
  }

  addCarLeasePayment (token, leasesConfirmpaymentParam) {
    const formData = new FormData()
    const leasesConfirmpaymentObject = {
      transactionId : leasesConfirmpaymentParam.transactionId,
      uuid : Math.floor(Math.random()*90000) + 10000
    }
    leasesConfirmpaymentParam.file.map((resp, key) =>
      formData.append(file.name.replace('/', '-'), file.file)
    )
    formData.append(body, JSON.stringify(leasesConfirmpaymentObject))
    return this.apiClient.post('v1/leases/car/payment', formData, {
      headers: { token }
    })
  }

  addCarLeaseReleasing (token, leasesCarLeaseReleasingParam) {
    const paramObject = {
      transactionId : leasesCarLeaseReleasingParam.transactionId
    }
    return this.apiClient.post('v1/leases/car/release', paramObject, {
      headers : { token }
    })
  }

  addCarLeaseConfirmation (token, leasesCarConfirm) {
    const leasesConfirmObject = {
      transactionId : leasesCarConfirm.transactionId,
      isConfirm: leasesCarConfirm.isConfirm
    }
    return this.apiClient.post('v1/leases/car/confirm', leasesConfirmObject, {
      headers: { token }
    })
  }

  getPayslip (token) {
    return this.apiClient.get('v1/pay/periods', {
      headers : { token }
    })
  }

  addPayslipSelectedDate (token, payslipParam) {
    const payslipObject = {
      id : payslipParam.employeeId,
      period : payslipParam.date
    }
    return this.apiClient.post('v1/pay', payslipObject, {
      headers : { token }
    })
  }

  getPdf (token, file) {
    return this.fileClient.get('v1/uploads?folder=' + file.folder, {
      headers : {
        token,
        file : file.file
      },
      responseType : 'blob'
    })
  }

  validateGrantAid (token) {
    return this.apiClient.get('v1/grants/education/personal/validate', {
      headers: { token }
    })
  }

  /* validate grant plan */
  validateGrantPlan (token) {
    return this.apiClient.get('v1/grants/education/dependent/validate', {
      headers: { token }
    })
  }

  addEducationAid (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    educationAidParam) {
      const formData = new FormData()
      const educationAidObject = {
        accountNumber,
        releasingCenter,
        course : educationAidParam.course,
        academicYear : educationAidParam.academicYear,
        semester : educationAidParam.semester,
        generalWeightedAverage : educationAidParam.gwa,
        tuitionFee : educationAidParam.tuitionFee,
        registrationFee : educationAidParam.registrationFee,
        schoolId : educationAidParam.schoolId,
        orNumber : educationAidParam.orNumber,
        orDate : educationAidParam.orDate
      }
      formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
      formData.append('body', JSON.stringify(educationAidObject))

      educationAidParam.attachments.map((resp, key ) => formData.append(resp.name.replace('/', '-'), resp.file))

      return this.apiClient.post('v2/reimbursements/education/personal/submit', formData, {
        headers : { token }
      })
    }

    /* validate grant aid */
    addGrantAid (token, accountToken, accountNumber, releasingCenter, grantAidParam) {
      const formData = new FormData()
      const grantAidObject = {
        grantType : grantAidParam.grantId,
        accountNumber,
        releasingCenter
      }
      formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
      formData.append('cert', grantAidParam.file)
      formData.append('body', JSON.stringify(grantAidObject))
      return this.apiClient.post('v2/grants/education/personal/submit', formData, {
        headers : { token }
      })
    }

  addGrantPlan (token, accountToken, accountNumber, releasingCenter, grantPlanParam) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    const grantPlanObject = {
      grantType : grantPlanParam.grantId,
      accountNumber,
      releasingCenter
    }
    formData.append('body', JSON.stringify(grantPlanObject))
    formData.append('cert', grantPlanParam.file)
    return this.apiClient.post('v2/grants/education/dependent/submit', formData, {
      headers : { token }
    })
  }

  /* Education Aid and Group Aid */
   validateAid (token) {
     return this.apiClient.get('v1/reimbursements/education/personal/validate', {
       headers: { token }
     })
   }

   /* validate group aid */
   validateGroupAid (token) {
     return this.apiClient.get('v1/reimbursements/education/dependent/validate', {
       headers: { token }
     })
   }

   addGroupAid (token, accountToken, accountNumber, releasingCenter, groupAidParam) {
     const formData = new FormData()
     formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
     const groupPlanObject = {
        accountNumber,
        releasingCenter,
        dependentId: groupAidParam.dependentId,
        amount: groupAidParam.desiredAmount,
        effectivityDate: groupAidParam.effectiveDate,
        companyName: groupAidParam.company,
        paymentDurationId: groupAidParam.durationOfPaymentId,
        orDate: groupAidParam.orDate,
        orNumber: groupAidParam.orNumber
     }
     formData.append('body', JSON.stringify(groupPlanObject))
     groupAidParam.attachments.map((resp, key) =>
      (
        formData.append(resp.name.replace('/', '-'), resp.file)
      ))
     return this.apiClient.post('v2/reimbursements/education/dependent/submit', formData, {
       headers : { token }
     })
   }


  /* bereavement benefit */
  validateBereavement (token) {
    return this.apiClient.get('v1/bereavement/validate', {
      headers: { token }
    })
  }

  addBereavement (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addBereavementParam) {
    const formData = new FormData()
    const bereavementObject = {
      id : addBereavementParam.dependentId,
      accountNumber,
      releasingCenter,
      date : addBereavementParam.objectDate,
      funeral : addBereavementParam.objectFuneral,
      memorial: addBereavementParam.objectMemorial,
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    addBereavementParam.file.map((resp, key) =>
      formData.append(resp.name, resp.file)
    )
    formData.append('body', JSON.stringify(bereavementObject))
    return this.apiClient.post('v1/bereavement/availment', formData, {
      headers: { token }
    })
  }

  /* Calamity Assitance */
  validateCalamityAssistance (token) {
    return this.apiClient.post('v1/calamity/validate', null, {
      headers: { token }
    })
  }

  addCalamityAssistance (token, accountToken, accountNumber, releasingCenter, calamityAssistanceParam) {

    const formData = new FormData()
    const damageProperty = calamityAssistanceParam.damageProperty

    //Attachments
    let imageKeys = []

    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    calamityAssistanceParam.attachmentArray.map((resp, key) => (
      formData.append(resp.name.replace('/', '-'), resp.file)
    ))

    calamityAssistanceParam.damageProperty.map((resp, key) => (
      resp &&
      resp.imageKey &&
      resp.imageKey.map((resp1, key) => {
        formData.append(resp1.name, resp1.file)
        imageKeys.push(resp1.name)
      })
    ))

    //Body
    calamityAssistanceParam.damageProperty.map((property, key) => {
      const length = property.imageKey.length
      if (length > 0) {
        delete damageProperty[key].imageKey
        property.imageKey = imageKeys
      }
    })

    const calamityObject = {
      id: calamityAssistanceParam.id,
      accountNumber,
      releasingCenter,
      date: calamityAssistanceParam.date,
      damageProperty: damageProperty
    }

    formData.append('body', JSON.stringify(calamityObject))
    return this.apiClient.post('v1/calamity/availment', formData, {
      headers: { token }
    })
  }

  uploadTransactionCalamity (token, id, files) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    files.map((file, key) => (
      formData.append(file.name.replace('/', '-'), file.file)
    ))
    formData.append('body', JSON.stringify({
      transactionId : id
    }))
    return this.apiClient.post('v1/calamity/receipt', formData, {
      headers: { token }
    })
  }

  uploadTransactionBereavement (token, id, files) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    files.map((file, key) => (
      formData.append(file.name.replace('/', '-'), file.file)
    ))
    formData.append('body', JSON.stringify({
      transactionId : id
    }))
    return this.apiClient.post('v1/bereavement/receipt', formData, {
      headers : { token }
    })
  }

  /* Medical Scheduling */

  validateMedicalScheduling (token) {
    return this.apiClient.get('v1/medical/exam/validate', {
      headers: { token }
    })
  }

  addMedicalScheduling (
    token,
    accounToken,
    accountNumber,
    releasingCenter,
    addMedicalSchedulingParam
  ) {
    const medicalSchedulingObject = {
      date : addMedicalSchedulingParam.preferredDate,
      clinicId : addMedicalSchedulingParam.clinicId,
      packageId : addMedicalSchedulingParam.packageId,
    }
    return this.apiClient.post('v1/medical/exam/submit', medicalSchedulingObject, {
      headers : { token }
    })
  }

  /* Outpatient Reimbursement */

  validateOutPatientReimbursement (token) {
    return this.apiClient.get('v1/outpatient/validate?type=1', {
      headers: { token }
    })
  }

  addOutPatientReimbursement (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    outPatientParam
  ) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
      const objectOutPatient = {
        accountNumber,
        releasingCenter,
        type : outPatientParam.type,
        dependentId : outPatientParam.dependentId,
        diagnosis : outPatientParam.diagnosisText,
        procedure : outPatientParam.procedure,
        officialReceiptNumber : outPatientParam.orNumber,
        officialReceiptDate : outPatientParam.orDate,
        amount : outPatientParam.amount,
      }
      outPatientParam.attachments.map((resp, key) => (
        formData.append(resp.name.replace('/', '-'), resp.file)
        )
      )
    formData.append('body', JSON.stringify(objectOutPatient))
      return this.apiClient.post('v1/outpatient/submit', formData, {
        headers : { token }
    })
  }

  /* Employee Trainings */

  getEmployeeTraining (token) {
    return this.apiClient.get('v1/trainings', {
      headers : { token }
    })
  }

  getEmployeeTrainingDetails (token, id) {
    return this.apiClient.get(`v1/trainings/${id}`, {
      headers : { token }
    })
  }

  enrollEmployee (token, id) {
    return this.apiClient.post('v1/trainings/enroll', {
      id
    }, {
      headers : { token }
    })
  }

  getEnrolledTrainings (token) {
    return this.apiClient.get('v1/trainings/learners/enrolled', {
      headers : { token }
    })
  }

  getNeedApprovalTrainings (token) {
    return this.apiClient.get('v1/trainings/learners/requests', {
      headers : { token }
    })
  }

  getApprovedTrainings (token) {
    return this.apiClient.get('v1/trainings/learners/approved', {
      headers : { token }
    })
  }

  getApprovalTrainingDetails (id, token) {
    return this.apiClient.get(`v1/trainings/learners/enrollments/${id}`, {
      headers : { token }
    })
  }

  trainingRequest (trainingId, ApprovalTrainingParam, token) {
    return this.apiClient.post(`v1/trainings/${trainingId}/requests`, ApprovalTrainingParam, {
      headers : { token }
    })
  }

  /* Maternity Assistance */
  validateMaternityAssistance (token) {
    return this.apiClient.get('v1/maternity/validate', {
      headers : { token }
    })
  }

  addMaternityAssistance (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    addMaternityAssistanceParam
  ) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    const objectMaternity = {
      accountNumber,
      releasingCenter,
      deliveryType : addMaternityAssistanceParam.typeDeliveryId,
      deliveryDate : addMaternityAssistanceParam.deliveryDate,
      amount : addMaternityAssistanceParam.amount,
      orNumber : addMaternityAssistanceParam.orNumberText,
      orDate : addMaternityAssistanceParam.preferredDate,
    }
    addMaternityAssistanceParam.attachmentArray.map((resp) =>
      (
        formData.append(resp.name.replace('/', '-'), resp.file)
      )
    )

    formData.append('body', JSON.stringify(objectMaternity))
    return this.apiClient.post('v1/maternity/submit', formData, {
      headers : { token }
    })
  }

  /* Maternity Assistance SSS */

  addMaternityAssistanceSSS (
    token,
    accountToken,
    accountNumber,
    releasingCenter,
    maternityAssistanceSSSParam
  ) {
    const objectMaternitySSS = {
      accountNumber,
      releasingCenter,
      address : {
        room : maternityAssistanceSSSParam.roomNumber,
        house : maternityAssistanceSSSParam.houseNumber,
        street: maternityAssistanceSSSParam.street,
        subdivision: maternityAssistanceSSSParam.subdivision,
        barangay: maternityAssistanceSSSParam.barangay,
        city : maternityAssistanceSSSParam.city,
        province : maternityAssistanceSSSParam.province,
        zipCode : maternityAssistanceSSSParam.zipCode,
      },
      numberOfPregnancy : maternityAssistanceSSSParam.noOfPregnancy,
      numberOfMiscarriage : maternityAssistanceSSSParam.noOfMiscarriage,
      numberOfDelivery: maternityAssistanceSSSParam.noOfDelivery,
      expectedDateOfDelivery : maternityAssistanceSSSParam.expectedDateOfDelivery,
    }
    return this.apiClient.post('v1/maternity/submit/sss/mat1', objectMaternitySSS, {
      headers : { token }
    })
  }

  /*  My Existing Loans */

  getExistingLoans (token) {
    return this.apiClient.get('v1/loans/mpl/outstanding', {
      headers : { token }
    })
  }

  getNonExistingLoans (token) {
    return this.apiClient.get('v1/loans', {
      headers : { token }
    })
  }

  /* Code of Conduct  */

  getCompliancesPdf (token) {
    return this.apiClient.get(`v1/compliances/coc`, {
      headers : { token }
    })
  }

  submitPin (token, code) {
    return this.apiClient.post('v1/compliances/coc', { code }, {
      headers : { token }
    })
  }

  /* Phenom */

  getPhenomDiscounts (token) {
    return this.apiClient.get('v1/phenom/discounts?type=corporate', {
      headers : { token }
    })
  }

  getPhenomSelectedDiscounts (token, id) {
    return this.apiClient.get(`v1/phenom/discounts/${ id }`, {
      headers : { token }
    })
  }

  addPhenomIsHeart (token, id, isHeart) {
    const objectPhenomIsHeart = {
      phenomId : id,
      isLiked : isHeart
    }
    return this.apiClient.post(`v1/phenom/reactions?type=corporate`, objectPhenomIsHeart, {
      headers : { token }
    })
  }

  getPhenomImage (token, file) {
    return this.fileClient.get('v1/uploads?folder=phenom', {
      headers : {
        token,
        file : file
      },
      responseType : 'blob'
    })
  }

  getVendorImage (token, file) {
    return this.fileClient.get('v1/uploads?folder=phenom', {
      headers : {
        token,
        file : file
      },
      responseType : 'blob'
    })
  }


  /* Leave Filing  */
  addLeaveFiling (token, leaveFilingParam) {
    const objectLeaveFiling = {
      type : leaveFilingParam.type,
      dateFrom : leaveFilingParam.dateFrom,
      dateTo : leaveFilingParam.dateTo,
      reason: leaveFilingParam.reason,
      remarks : leaveFilingParam.remarks
    }
    return this.apiClient.post('v1/leaves', objectLeaveFiling, {
      headers : { token }
    })
  }

  /* Pin Enrollment */
  postEnrollPin (token, id) {
    const objectPostPin = {
      code: id
    }
    return this.apiClient.post('v1/pin' , objectPostPin, {
      headers : { token }
    })
  }

  putEnrollPin (token, putPINParam) {
    return this.apiClient.put('v1/pin', putPINParam, {
      headers : { token }
    })
  }

  validateEmployeePin (token, employeePinParam) {
    const validateObject = {
      code: employeePinParam,
    }
    return this.apiClient.post('v1/pin/validate', validateObject, {
      headers : { token }
    })
  }

  /* Staff accounts */
  getForConfirmation (token, id) {
    return this.accountClient.get('v1/accounts', {
      headers : { token }
    })
  }

  addStaffAccounts (token, staffAccountsParam) {
    const staffAccountObject = {
      employeeName : staffAccountsParam.fullName,
      account: {
        name: staffAccountsParam.fullName,
        number: staffAccountsParam.accountNumber,
        type: staffAccountsParam.type,
        capacity : staffAccountsParam.capacity,
        remarks: staffAccountsParam.remarks,
      }
    }
    return this.accountClient.post('v1/accounts', staffAccountObject , {
      headers : { token }
    })
  }

  updateStaffAccounts (token, staffAccountsParam) {
    const staffAccontObject = {
      employeeName : staffAccountsParam.fullName,
      account: {
        number: staffAccountsParam.accountNumber,
      },
      sequence : staffAccountsParam.sequence
    }
    return this.accountClient.put('v1/accounts', staffAccontObject , {
      headers : { token }
    })
  }

  /* Pre-Employment */

  getPreEmploymentMessageStatus (token) {
    return this.onboardingClient.get('v1/employees/letters/status', {
      headers : { token }
    })
  }

  postPreEmploymentMessageStatus (token, id) {
    return this.onboardingClient.post(`v1/employees/letters?status=${ id }`, null, {
      headers : { token }
    })
  }

  getPreEmploymentForm (token) {
    return this.onboardingClient.get('v1/employees/requirements?phase=1', {
      headers: { token }
    })
  }

  getPreEmploymentStatus (token) {
    return this.onboardingClient.get('v1/employees/requirements/status', {
      headers : { token }
    })
  }

  getPreEmploymentAffirmationId (token, affirmId, affirmPage) {
    return this.onboardingClient.get(`v1/employees/affirmation/${affirmId}?page=${affirmPage}`, {
      headers : { token }
    })
  }

  getOnBoardingDocument (token, link) {
    return this.fileClient.get('v1/uploads?folder=documents', {
      headers: {
        token : token,
        file : link,
      },
      responseType : 'blob'
    })
  }

  getOnBoardingAttachments (token, file) {
    return this.fileClient.get('v1/uploads?folder=onboarding-requirements', {
      headers: {
        token : token,
        file : file,
      },
      responseType : 'blob'
    })
  }

  postAffirmPreEmploymentUndertaking (token) {
    return this.onboardingClient.post('v1/employees/affirmations/employers', {
      headers : { token }
    })
  }

  getAffirmationsStatus (token) {
    return this.onboardingClient.get('v1/employees/affirmations/status', {
      headers : { token }
    })
  }

  getFinancialStatus (token) {
    return this.onboardingClient.get('v1/employees/finances/status', {
      headers : { token }
    })
  }

  getFinancialDetails (token) {
    return this.onboardingClient.get('v1/employees/finances', {
      headers : { token }
    })
  }

  addFinancialStatus (token, financialStatusParam) {
    const objectParam = {
      bank : financialStatusParam.bank,
      obligation: financialStatusParam.obligation,
      amount: financialStatusParam.amount,
      status: financialStatusParam.statusId,
    }
    return this.onboardingClient.post('v1/employees/finances', objectParam, {
      headers : { token }
    })
  }

  putFinancialStatus (token, financialStatusParam) {
    const objectParam = {
      bank : financialStatusParam.bank,
      obligation: financialStatusParam.obligation,
      amount: financialStatusParam.amount,
      status: financialStatusParam.statusId,
    }
    return this.onboardingClient.put(`v1/employees/finances/${financialStatusParam.financeId}`, objectParam, {
      headers : { token }
    })
  }

  getEmployeeTin (token) {
    return this.onboardingClient.get('v1/employees/tin', {
      headers : { token }
    })
  }

  addEmployeeTin (token, employeeTinParam) {
    const objectParam = {
      tin : employeeTinParam.tinId
    }

    return this.onboardingClient.put('v1/employees/tin', objectParam, {
      headers : { token }
    })
  }

  getEmployeeSSS (token) {
    return this.onboardingClient.get('v1/employees/sss', {
      headers : { token }
    })
  }

  addEmployeeSSS (token, employeeParam) {
    const objectParam = {
      sss : employeeParam.sssInput
    }

    return this.onboardingClient.put('v1/employees/sss', objectParam, {
      headers : { token }
    })
  }

  postEnrollPinAffirmationsEmployment (token, pin) {
    const objectParam = {
      code : pin,
    }
    return this.onboardingClient.post('v1/employees/affirmations/employers', objectParam,{
      headers : { token }
    })
  }

  postEnrollPinAffirmationsPolicy (token, pin) {
    const objectParam = {
      code : pin,
    }
    return this.onboardingClient.post('v1/employees/affirmations/policy', objectParam,{
      headers : { token }
    })
  }

  postEnrollPinAffirmationsConfidential (token, pin) {
    const objectParam = {
      code : pin,
    }
    return this.onboardingClient.post('v1/employees/affirmations/confidentiality', objectParam,{
      headers : { token }
    })
  }

  postEnrollPinAffirmationsSecrecy (token, pin) {
    const objectParam = {
      code : pin,
    }
    return this.onboardingClient.post('v1/employees/affirmations/secrecy', objectParam,{
      headers : { token }
    })
  }

  getWorkExperience (token) {
    return this.onboardingClient.get('v1/employees/employers', {
      headers: { token }
    })
  }

  getWorkExperienceForm (token) {
    return this.onboardingClient.get('v1/employees/employers/forms/verify', {
      headers: { token }
    })
  }

  addWorkExperience (token, workExperienceParam) {
    const objectParam = {
      companyName : workExperienceParam.companyName,
      address : workExperienceParam.address,
      position : workExperienceParam.position,
      description : workExperienceParam.description,
      contactNumber : workExperienceParam.contactNo,
      startMonth : workExperienceParam.fromMonthName,
      startYear : workExperienceParam.fromYear,
      endMonth : workExperienceParam.toMonthName,
      endYear : workExperienceParam.toYear
    }
    return this.onboardingClient.post('v1/employees/employers', objectParam, {
      headers : { token }
    })
  }

  addEmployeeRequirement (token, requirementParam) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    const objectParam = {
      documentType : requirementParam.documentId
    }
    requirementParam.attachments.map((resp) =>
      (
        formData.append(resp.name.replace('/', '-'), resp.file)
      )
    )

    formData.append('body', JSON.stringify(objectParam))
    return this.onboardingClient.post('v1/employees/requirements?phase=1', formData, {
      headers : { token }
    })
  }

  getCharacterReference (token) {
    return this.onboardingClient.get('v1/employees/references' , {
      headers : { token }
    })
  }

  getCharacterReferenceForm (token) {
    return this.onboardingClient.get('v1/employees/references/forms' , {
      headers : { token }
    })
  }

  deleteCharacterReference (token, id) {
    return this.onboardingClient.delete(`v1/employees/references/${ id }`, {
      headers : { token }
    })
  }

  postCharacterReference (token, postCharacterReferenceParam) {
    const objectParam = {
      name : postCharacterReferenceParam.name,
      relationship: postCharacterReferenceParam.relationship,
      numberOfYearsKnown: postCharacterReferenceParam.numberOfYearsKnown,
      contactNumber: postCharacterReferenceParam.contactNumber,
      address: postCharacterReferenceParam.address,
      email: postCharacterReferenceParam.email,
      occupation: postCharacterReferenceParam.occupation,
      company : {
        position: postCharacterReferenceParam.company.company.position,
        name: postCharacterReferenceParam.company.company.name,
        departmentFloor: postCharacterReferenceParam.company.company.departmentFloor,
        buildingName:  postCharacterReferenceParam.company.company.buildingName,
        street: postCharacterReferenceParam.company.company.street,
        district: postCharacterReferenceParam.company.company.district,
        baranggay: postCharacterReferenceParam.company.company.baranggay,
        city: postCharacterReferenceParam.company.company.city,
        town: postCharacterReferenceParam.company.company.town
      }
    }
    return this.onboardingClient.post('v1/employees/references', objectParam, {
      headers : { token }
    })
  }

  putCharacterReference (token, putCharacterReferenceParam) {
    const objectParam = {
      name : putCharacterReferenceParam.name,
      relationship: putCharacterReferenceParam.relationship,
      numberOfYearsKnown: putCharacterReferenceParam.numberOfYearsKnown,
      contactNumber: putCharacterReferenceParam.contactNumber,
      address: putCharacterReferenceParam.address,
      email: putCharacterReferenceParam.email,
      occupation: putCharacterReferenceParam.occupation,
      company : {
        position: putCharacterReferenceParam.company.company.position,
        name: putCharacterReferenceParam.company.company.name,
        departmentFloor: putCharacterReferenceParam.company.company.departmentFloor,
        buildingName:  putCharacterReferenceParam.company.company.buildingName,
        street: putCharacterReferenceParam.company.company.street,
        district: putCharacterReferenceParam.company.company.district,
        baranggay: putCharacterReferenceParam.company.company.baranggay,
        city: putCharacterReferenceParam.company.company.city,
        town: putCharacterReferenceParam.company.company.town
      }
    }
    return this.onboardingClient.put(`v1/employees/references/{${ putCharacterReferenceParam.id }}`, objectParam, {
      headers : { token }
    })
  }

  getEmployeeSchool (token) {
    return this.onboardingClient.get('v1/employees/school', {
      headers: { token }
    })
  }

  getSchoolRecordVerificationForm (token) {
    return this.onboardingClient.get('v1/employees/school/forms/verify', {
      headers: { token }
    })
  }

  getSchoolData (token, pageNumber, find) {
    return this.accountClient.get(`v1/schools?pageNumber=${ pageNumber }&find=${ find }`, {
      headers : { token }
    })
  }

  addEducationSchool (token, educationParam) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    const objectParam = {
        studentNo : educationParam.studentNo,
        schoolName : educationParam.schoolName,
        startYear : educationParam.startYear,
        endYear : educationParam.endYear,
        course : educationParam.course,
        degree : educationParam.degree,
        honor : educationParam.honor,
        address : educationParam.address,
      }
    formData.append('body', JSON.stringify(objectParam))


      educationParam &&
      educationParam.torFormData &&
      educationParam.torFormData.map((resp) =>
        (
          formData.append(resp.name.replace('/', '-'), resp.file)
        )
      )

    return this.onboardingClient.post('v1/employees/school', formData, {
      headers : { token }
    })
  }

  putWorkExperience (token, workExperienceParam) {
    const objectParam = {
      companyName : workExperienceParam.companyName,
      address : workExperienceParam.address,
      position : workExperienceParam.position,
      description : workExperienceParam.description,
      contactNumber : workExperienceParam.contactNo,
      startMonth : workExperienceParam.fromMonthName,
      startYear : workExperienceParam.fromYear,
      endMonth : workExperienceParam.toMonthName,
      endYear : workExperienceParam.toYear
    }
    return this.onboardingClient.put(`v1/employees/employers/${workExperienceParam.workExpId}`, objectParam, {
      headers :{ token }
    })
  }

  putEducationSchool (token, educationParam) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    const objectParam = {
      schoolName : educationParam.schoolName,
      studentNo : educationParam.studentNo,
      startYear : educationParam.startYear,
      endYear : educationParam.endYear,
      degree : educationParam.degree,
      honor : educationParam.honor,
      course : educationParam.course,
      address : educationParam.address,
    }

    educationParam &&
    educationParam.torFormData.map((resp) =>
      formData.append(resp.name, resp.file)
    )
    formData.append('body', JSON.stringify(objectParam))

    return this.onboardingClient.put(`v1/employees/school/${educationParam.educId}`, formData, {
      headers : { token }
    })
  }

  getSpouse (token) {
    return this.onboardingClient.get('v1/employees/spouse', {
      headers : { token }
    })
  }

  postSpouseForm (token, spouseFormParam) {
    const formData = new FormData()
    const objectParam = {
      name : {
        first : spouseFormParam.firstName,
        middle: spouseFormParam.middleName,
        last : spouseFormParam.lastName
      },
        birthDate: spouseFormParam.birthDate,
        occupation: spouseFormParam.occupation,
        status: spouseFormParam.status,
        gender : spouseFormParam.gender,
        healthHospitalizationPlan : spouseFormParam.healthHospitalizationPlan,
        groupLifeInsurance: spouseFormParam.groupLifeInsurance,
        bloodType : spouseFormParam.bloodType,
        contactNumber: spouseFormParam.contact,
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)

    spouseFormParam.spouseAttachmentsArray &&
    spouseFormParam.spouseAttachmentsArray.map((resp, key) =>
      formData.append(resp.name, resp.file)
    )
    formData.append('body', JSON.stringify(objectParam))
    return this.onboardingClient.post('v1/employees/spouse', formData, {
      headers : { token }
    })
  }

  putSpouseForm (token, spouseFormParam) {
    const formData = new FormData()
    const objectParam = {
      name : {
        first : spouseFormParam.firstName,
        middle: spouseFormParam.middleName,
        last : spouseFormParam.lastName
      },
        birthDate: spouseFormParam.birthDate,
        occupation: spouseFormParam.occupation,
        status: spouseFormParam.status,
        healthHospitalizationPlan : spouseFormParam.healthHospitalizationPlan,
        groupLifeInsurance: spouseFormParam.groupLifeInsurance,
        bloodType : spouseFormParam.bloodType,
        contactNumber: spouseFormParam.contact,
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    spouseFormParam.spouseAttachmentsArray.map((resp, key) =>
      formData.append(resp.name, resp.file)
    )
    formData.append('body', JSON.stringify(objectParam))
    return this.onboardingClient.put(`v1/employees/spouse/${ spouseFormParam.spouseId }`, formData, {
      headers : { token }
    })
  }

  getChildren (token) {
    return this.onboardingClient.get('v1/employees/children', {
      headers : { token }
    })
  }

  postChildren (token, childrenParam) {
    const formData = new FormData()
    const objectParam = {
      name : {
        first : childrenParam.firstName,
        middle : childrenParam.middleName,
        last : childrenParam.lastName,
      },
      bloodType : childrenParam.bloodTypeName,
      contactNumber : childrenParam.contact,
      birthDate : childrenParam.birthDate,
      gender : childrenParam.genderId,
      occupation : childrenParam.occupationName,
      healthHospitalizationPlan: childrenParam.hospitalization,
      groupLifeInsurance : childrenParam.groupPlan,
      status: childrenParam.statusId,
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    formData.append('body', JSON.stringify(objectParam))
    childrenParam.defaultAttachmentsArray.map((resp) => (
      formData.append(resp.name.replace('/', '-'), resp.file)
      )
    )

    return this.onboardingClient.post('v1/employees/children', formData, {
      headers : { token }
    })
  }

  putChildren (token, childrenParam) {
    const formData = new FormData()
    const objectParam = {
      name : {
        first : childrenParam.firstName,
        middle : childrenParam.middleName,
        last : childrenParam.lastName,
      },
      bloodType : childrenParam.bloodTypeName,
      contactNumber : childrenParam.contact,
      birthDate : childrenParam.birthDate,
      gender : childrenParam.genderId,
      occupation : childrenParam.occupationName,
      healthHospitalizationPlan: childrenParam.hospitalization,
      groupLifeInsurance : childrenParam.groupPlan,
      status: childrenParam.statusId,
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    formData.append('body', JSON.stringify(objectParam))
    childrenParam.defaultAttachmentsArray.map((resp) =>
      formData.append(resp.name, resp.file)
    )
    return this.onboardingClient.put(`v1/employees/children/${ childrenParam.childrenId }`, formData, {
      headers : { token }
    })
  }

  addPagibigLoan (token, pagibigParam) {
    const objectParam = {
      deductionLoan : pagibigParam.pagibigInput
    }

    return this.onboardingClient.put('v1/employees/pagibig/deductions', objectParam, {
      headers : { token }
    })
  }

  getPagibiLoanDeduction (token) {
    return this.onboardingClient.get('v1/employees/pagibig/deductions', {
      headers : { token }
    })
  }

  getMedicalAppointmentProcedures (token) {
    return this.onboardingClient.get('v1/employees/medical/procedures', {
      headers : { token }
    })
  }

  getMedicalAppointment (token) {
    return this.onboardingClient.get('v1/employees/medical/details', {
      headers : { token }
    })
  }

  updateMedicalAppointment (token, date, date2, id) {
    const objectParam = {
      preferredDate : [
        date, date2
      ]
    }
    return this.onboardingClient.put('v1/employees/medical/schedules', objectParam, {
      headers : { token }
    })
  }

  getParents (token) {
    return this.onboardingClient.get('v1/employees/plans/hospitalization/parents', {
      headers : { token }
    })
  }

  updateParentForm (token, parentsParam) {
    const objectParam = {
      name : {
        first : parentsParam.firstName,
        middle : parentsParam.middleName,
        last : parentsParam.lastName,
      },
      bloodType : parentsParam.bloodTypeName,
      contactNumber : parentsParam.contact,
      birthDate : parentsParam.birthDate,
      gender : parentsParam.genderId,
      occupation : parentsParam.occupationName,
      relationship : parentsParam.relationship,
      healthHospitalizationPlan: parentsParam.hospitalization,
      groupLifeInsurance : parentsParam.groupPlan,
      status: parentsParam.statusId,
    }

    return this.onboardingClient.put(`v1/employees/plans/hospitalization/parents/${parentsParam.parentId}`, objectParam, {
      headers : { token }
    })
  }

  addParentForm (token, parentsParam) {
    const objectParam = {
      name : {
        first : parentsParam.firstName,
        middle : parentsParam.middleName,
        last : parentsParam.lastName,
      },
      bloodType : parentsParam.bloodTypeName,
      contactNumber : parentsParam.contact,
      birthDate : parentsParam.birthDate,
      gender : parentsParam.genderId,
      occupation : parentsParam.occupationName,
      relationship : parentsParam.relationship,
      healthHospitalizationPlan: parentsParam.healthHospitalizationPlan,
      groupLifeInsurance : parentsParam.groupLifeInsurance,
      status: parentsParam.statusId,
    }

    return this.onboardingClient.post(`v1/employees/plans/hospitalization/parents`, objectParam, {
      headers : { token }
    })
  }


  getSiblings (token) {
    return this.onboardingClient.get('v1/employees/siblings', {
      headers : { token }
    })
  }

  updateSiblingsForm (token, siblingsParam) {
    const objectParam = {
      name : {
        first : siblingsParam.firstName,
        middle : siblingsParam.middleName,
        last : siblingsParam.lastName,
      },
      bloodType : siblingsParam.bloodTypeName,
      contactNumber : siblingsParam.contact,
      birthDate : siblingsParam.birthDate,
      gender : siblingsParam.genderId,
      occupation : siblingsParam.occupationName,
      healthHospitalizationPlan: siblingsParam.hospitalization,
      groupLifeInsurance : siblingsParam.groupPlan,
      status: siblingsParam.statusId,
    }

    return this.onboardingClient.put(`v1/employees/siblings/${siblingsParam.parentId}`, objectParam, {
      headers : { token }
    })
  }

  addSiblingsForm (token, siblingsParam) {
    const objectParam = {
      name : {
        first : siblingsParam.firstName,
        middle : siblingsParam.middleName,
        last : siblingsParam.lastName,
      },
      bloodType : siblingsParam.bloodTypeName,
      contactNumber : siblingsParam.contact,
      birthDate : siblingsParam.birthDate,
      gender : siblingsParam.genderId,
      occupation : siblingsParam.occupationName,
      healthHospitalizationPlan: siblingsParam.hospitalization,
      groupLifeInsurance : siblingsParam.groupPlan,
      status: siblingsParam.statusId,
    }

    return this.onboardingClient.post(`v1/employees/siblings`, objectParam, {
      headers : { token }
    })
  }

  /* Remove */

  removeWorkExperience (token, id) {
    return this.onboardingClient.delete(`v1/employees/employers/${id}`, {
      headers: { token }
    })
  }

  removeSchool (token, id) {
    return this.onboardingClient.delete(`v1/employees/school/${id}`, {
      headers : { token }
    })
  }

  removeSpouse (token, id) {
    return this.onboardingClient.delete(`v1/employees/spouse/${id}`, {
      headers : { token }
    })
  }

  removeChildren (token, id) {
    return this.onboardingClient.delete(`v1/employees/children/${id}`, {
      headers : { token }
    })
  }

  removeParents (token, id) {
    return this.onboardingClient.delete(`v1/employees/plans/hospitalization/parents/${id}`, {
      headers : { token }
    })
  }

  removeSiblings (token, id) {
    return this.onboardingClient.delete(`v1/employees/siblings/${id}`, {
      headers : { token }
    })
  }

  removeFinancial (token, id) {
    return this.onboardingClient.delete(`v1/employees/finances/${id}`, {
      headers : { token }
    })
  }

  /*  Post Employment */

  getPostEmployment (token) {
    return this.onboardingClient.get('v1/employees/requirements?phase=2', {
      headers: { token }
    })
  }

  addPostRequirement (token, requirementParam) {
    const formData = new FormData()
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    const objectParam = {
      documentType : requirementParam.documentId
    }
    requirementParam.attachments.map((resp) =>
      (
        formData.append(resp.name.replace('/', '-'), resp.file)
      )
    )

    formData.append('body', JSON.stringify(objectParam))
    return this.onboardingClient.post('v1/employees/requirements?phase=2', formData, {
      headers : { token }
    })
  }

  /* Vaccines Requisitions */
  validateVaccine (token) {
    return this.apiClient.get('v1/vaccinations/validate', {
      headers: { token }
    })
  }

  addVaccine (token, data) {
    return this.apiClient.post('v1/vaccinations/submit', data, {
      headers : { token }
    })
  }

  /* Laptop Lease */

  confirmLaptopLease (token, transactionId, isConfirm) {
    return this.apiClient.post('v1/leases/laptop/confirm', {
      transactionId,
      isConfirm,
    }, {
      headers: { token }
    })
  }

  validateLaptopLease (token) {
     return this.apiClient.get('v1/leases/laptop/validate', {
       headers : { token }
     })
   }

  addLaptopLease (
     token,
     accountToken,
     accountNumber,
     releasingCenter,
     laptopLeaseParam) {
   const formData = new FormData()
   const object = {
     color: laptopLeaseParam.color,
     term: laptopLeaseParam.terms,
     estimatedCost : laptopLeaseParam.estimatedAmount,
     deliveryOptionId: laptopLeaseParam.deliveryOption
   }
   formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
   laptopLeaseParam.attachments &&
   laptopLeaseParam.attachments.map((resp, key) =>(
     formData.append('qoutation', resp.file)
   ))
   formData.append('body', JSON.stringify(object))
   return this.apiClient.post('v1/leases/laptop',  formData, {
     headers : { token }
   })
  }

  /* Travel */

  getAreaData (token, pageNumber, find) {
    return this.apiClient.get(`v1/travels/areas?find=${find}&pageNumber=${pageNumber}`, {
      headers : { token }
    })
  }

  getTravels (token, statusId) {
    return this.apiClient.get(`v1/travels?status=${statusId}`, {
      headers : { token }
    })
  }

  getApproval (token) {
    return this.apiClient.get('v1/travels/approval', {
      headers : { token }
    })
  }

  addRequestOneWay (token, requestParam) {
    const object = {
      purposeId : requestParam.purposeId,
      departure: {
        origin: requestParam.departureOriginId,
        destination: requestParam.departureDestinationId,
        date: requestParam.departureDate,
        time: requestParam.departureTime,
        remarks: requestParam.departureRemarks
      }
    }
    return this.apiClient.post('v1/travels', object, {
      headers : { token }
    })
  }

  addRequestRoundTrip (token, requestParam) {
    const object = {
      purposeId : requestParam.purposeId,
      departure: {
        origin: requestParam.departureOriginId,
        destination: requestParam.departureDestinationId,
        date: requestParam.departureDate,
        time: requestParam.departureTime,
        remarks: requestParam.departureRemarks
      },
      return: {
        origin: requestParam.returnOriginId,
        destination: requestParam.returnDestinationId,
        date: requestParam.returnDate,
        time: requestParam.returnTime,
        remarks: requestParam.returnRemarks
      }
    }
    return this.apiClient.post('v1/travels', object, {
      headers : { token }
    })
  }

  addBookFlight (
      token,
      bookParam) {
    const formData = new FormData()
    const object = {
      requestId: bookParam.requestId,
      cost: {
        flight: bookParam.totalCostOfFlight,
        serviceCharge: bookParam.totalServiceCharge,
        VAT: bookParam.valueAddedTax
      },
      departureTime : bookParam.departureTime,
      returnTime: bookParam.returnTime
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    bookParam.attachmentsData &&
    bookParam.attachmentsData.map((resp, key) =>(
      formData.append('attachment', resp.file)
    ))
    formData.append('body', JSON.stringify(object))
    return this.apiClient.post('v1/travels/book',  formData, {
      headers : { token }
    })
  }

  addLiquidation (
      token,
      liquidationParam) {
    const formData = new FormData()
    const object = {
      requestId: liquidationParam.requestId,
      isTicketUsed: liquidationParam.ticketMode,
      remarks : liquidationParam.whyTicketUsed
    }
    formData.append('uuid', Math.floor(Math.random()*90000) + 10000)
    liquidationParam.attachmentsData &&
    liquidationParam.attachmentsData.map((resp, key) =>(
      formData.append('attachment', resp.file)
    ))
    formData.append('body', JSON.stringify(object))
    return this.apiClient.post('v1/travels/liquidate',  formData, {
      headers : { token }
    })
  }

  addApproval (token, approvalParam) {
    const object = {
      requestId: approvalParam.requestId,
      isApprove: approvalParam.isApprove,
      remark : approvalParam.rejectedRemarks
    }
    return this.apiClient.post('v1/travels/approval', object, {
      headers : { token }
    })
  }

  /* News isHeart */

  addNewsIsHeart (token, id, isHeart) {
    const objectNewsIsHeart = {
      newsId : id,
      isLike : isHeart
    }
    return this.apiClient.post('v1/news/likes', objectNewsIsHeart, {
      headers : { token }
    })
  }

  /* Events Budget */

  validateEventsBudget (token) {
    return this.apiClient.get('v1/events/validate', {
      headers: { token }
    })
  }

  addEventsBudget (
    token,
    accountToken,
    accountNo,
    releasingCenter,
    addEventParam) {
    const objectParam = {
      accountNumber : accountNo,
      releasingCenter: releasingCenter,
      requestId: addEventParam.requestId,
      venueName: addEventParam.venueName,
      address: addEventParam.address,
      region: addEventParam.region,
      province: addEventParam.province,
      city: addEventParam.city,
      targetDate : addEventParam.date,
      attendees: addEventParam.attendees,
    }
    return this.apiClient.post('v1/events/submit', objectParam, {
      headers : { token }
    })
  }
}
