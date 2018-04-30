
export default class HRBenefitsService {

  constructor (apiClient, accountClient) {
    this.apiClient = apiClient
    this.accountClient = accountClient
  }

  /* user */
  login (loginParam) {
    return this.apiClient.post('v1/login', loginParam)
  }

  otp (otpParam) {
    return this.apiClient.post('v1/otp', otpParam)
  }

  /* dental loa */
  validateDentalLoa (token) {
    return this.apiClient.get('v1/issuances/dental/loa/validate?type=1', {
      headers: { token }
    })
  }

  addDentalLoa (token, dentalLoaParam) {
    const formData = DentalLoaParam
    return this.apiClient.post('v1/issuances/dental/loa/submit', formData, {
      headers : { token }
    })
  }

  /* dental reimbursements */

  validateDentalReimbursement (token) {
    return this.apiClient.get('v1/reimbursements/dental/validate?type=1', {
      headers: { token }
    })
  }

  addDentalReimbursement (token, dentalLoaParam) {
    const formData = new FormData()
    return this.apiClient.post('v2/reimbursements/dental/submit', formData, {
      headers : { token }
    })
  }

  /* Optical */
  validateOptical (token) {
    return this.apiClient.get('v1/reimbursements/optical/validate', {
      headers : { token }
    })
  }

  addOptical (token, opticalParam) {
    const formData = new FormData()

    return this.apiClient.post('v2/reimbursements/optical/submit', formData, {
      headers : { token }
    })
  }

  /* account */
  validateAccountNumber (accountNumber) {
    return this.accountClient.get(`accounts/v1/${accountNumber}`, {
      headers: {
        referenceId : Math.random().toString(36)
          .substring(7)
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
  getBooks (token) {
    return this.apiClient.get('v1/books', {
        headers: { token }
    })
  }
   getNews (token) {
    return this.apiClient.get('v1/news', {
        headers: { token }
    })
  }


  addRating (token, bookParam) {
    return this.apiClient.post('v1/books/rate', bookParam, {
      headers : { token }
    })
  }
  
  getPodcast (token) {
      return this.apiClient.get('v1/news', {
          headers: { token }
      })
    }
  paddRating (token, bookParam) {
    return this.apiClient.post('v1/books/rate', bookParam, {
      headers : { token }
    })
  }
}
