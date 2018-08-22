
export default class HRBenefitsService {
  constructor (apiClient, accountClient, fileClient) {
    this.apiClient = apiClient
    this.accountClient = accountClient
    this.fileClient = fileClient

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
      type : dentalReimbursementParam.dependentId.id !== 1 ? 2 : 1,
      procedures : dentalReimbursementParam.procedure,
      dependentId : dentalReimbursementParam.dependentId.id
    }

    formData.append('uuid', 12345)
    formData.append('dentcert1', dentalReimbursementParam.file1)
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
      officialReceiptDate: opticalParam.oRDate,
      officialReceiptNumber : opticalParam.orNumber,
      releasingCenter,
      distributor: 'distributorTest'
    }
    formData.append('uuid', 123345)
    opticalParam.attachmentData.map((resp) => (
      formData.append(resp.name, resp.file)
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
      formData.append('uuid', 12345)
      formData.append('body', JSON.stringify(multiLoanBodyObject))
      mplPurposeLoanAddParam.attachments &&
      mplPurposeLoanAddParam.attachments.map((attachment, key) => (
        formData.append(attachment.name, attachment.file)
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
    formData.append('uuid', 12345)
    formData.append('body', JSON.stringify(multiLoanBodyObject))
    addMotorLoanParam.attachments.map((attachment, key) => (
      formData.append(attachment.name, attachment.file)
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
    formData.append('uuid', 12345)
    formData.append('body', JSON.stringify(multiLoanBodyObject))
    addComputerLoanParam.attachments.map((attachment, key) => (
      formData.append(attachment.name, attachment.file)
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
    const addCarleaseObject = {
      accountNumber,
      releasingCenter,
      brand : carRequestParam.carBrand,
      model : carRequestParam.carModel,
      year : carRequestParam.year,
      insurancePayment: '1',
      leaseMode : parseInt(carRequestParam.leaseMode),
      primaryColor : carRequestParam.primaryColor,
      secondaryColor : carRequestParam.secondaryColor,
    }
    formData.append('body', JSON.stringify(addCarleaseObject))
    formData.append('uuid', 12345)
    formData.append('attachment1', carRequestParam.attachments ? carRequestParam.attachments : null)
    return this.apiClient.post('v1/leases/car', formData, {
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
      }
      formData.append('uuid', 12345)
      formData.append('cert1', educationAidParam.attachments[0].file)
      formData.append('cert2', educationAidParam.attachments[1].file)
      formData.append('cert3', educationAidParam.attachments[2].file)
      formData.append('body', JSON.stringify(educationAidObject))
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
    formData.append('uuid', 12345)
    formData.append('cert', grantAidParam.file)
    formData.append('body', JSON.stringify(grantAidObject))
    return this.apiClient.post('v2/grants/education/personal/submit', formData, {
      headers : { token }
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

  addGrantPlan (token, accountToken, accountNumber, releasingCenter, grantPlanParam) {
    const formData = new FormData()
    const grantPlanObject = {
      grantType : grantPlanParam.grantId,
      accountNumber,
      releasingCenter
    }
    formData.append('uuid', 12345)
    formData.append('cert', grantPlanParam.file)
    formData.append('body', JSON.stringify(grantPlanObject))
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
     const groupPlanObject = {
        accountNumber,
        releasingCenter,
        dependentId: groupAidParam.dependentId,
        amount: groupAidParam.desiredAmount,
        effectivityDate: groupAidParam.effectiveDate,
        companyName: groupAidParam.company,
        paymentDurationId: groupAidParam.durationOfPaymentId
     }
     formData.append('uuid', 12345)
     groupAidParam.attachments.map((resp, key) =>
      (
        formData.append(resp.name, resp.file)
      ))
     formData.append('body', JSON.stringify(groupPlanObject))
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
    formData.append('uuid', 12345)
    formData.append('file', addBereavementParam.file)
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
    const calamityObject = {
      id: calamityAssistanceParam.calamityId,
      accountNumber,
      releasingCenter,
      date: calamityAssistanceParam.date,
      damageProperty: [{
        propertyName: calamityAssistanceParam.property,
        description: calamityAssistanceParam.propertyDesc,
        propertyType: calamityAssistanceParam.propertyType,
        acquisitionValue: calamityAssistanceParam.acquisitionValue,
        repairCost: calamityAssistanceParam.estimatedCost
      }]
    }

    formData.append('uuid', 12345)
    formData.append('Barangay Certificate', calamityAssistanceParam.file1)
    formData.append('Damaged Property', calamityAssistanceParam.file2)
    formData.append('body', JSON.stringify(calamityObject))
    return this.apiClient.post('v1/calamity/availment', formData,{
      headers: { token }
    })
  }

  uploadTransactionCalamity (token, id, files) {
    const formData = new FormData()
    formData.append('uuid', 12345)
    files.map((file, key) => (
      formData.append(file.name, file.file)
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
    formData.append('uuid', 12345)
    files.map((file, key) => (
      formData.append(file.name, file.file)
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
    formData.append('uuid', 12345)
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
        formData.append(resp.name, resp.file)
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
    formData.append('uuid', 12345)
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
        formData.append(resp.name, resp.file)
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
    return this.apiClient.get(`v1/phenom/reactions?type=corporate`, objectPhenomIsHeart, {
      headers : { token }
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
}
