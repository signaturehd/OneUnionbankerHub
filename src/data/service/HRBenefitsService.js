import { Observable } from 'rxjs'

export default class HRBenefitsService {

  constructor(apiClient, accountClient) {
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

  resend (resendOtpParam) {
    return this.apiClient.post('v1/otp/resend', resendOtpParam)
  }

  profile (token) {
    return this.apiClient.get('v1/profile', {
      headers : { token }
    })
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
<<<<<<< HEAD
  validateAccountNumber (accountNumber) {
    return this.accountClient.get(
    `accounts/v1/${accountNumber}`, {
=======
  validateAccountNumber (token, accountNumber) {
    return this.accountClient.get(`accounts/v1/${accountNumber}`, {
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2
      headers: {
        token,
        referenceId : Math.random().toString(36)
<<<<<<< HEAD
        .substring(7)
=======
          .substring(7),
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2
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
<<<<<<< HEAD
      headers: { token }
    })
  }

  /* library */
  getTransactions (token) {
    return this.apiClient.get('v1/transactions', {
        headers: { token }
    })
  }

=======
        headers: { token }
    })
  }

  getBooksBorrowed (token) {
    return this.apiClient.get('v1/books/history', {
        headers: { token }
    })
  }



  addRating (token, bookParam) {
    return this.apiClient.post('v1/books/rate', bookParam, {
      headers : { token }
    })
  }


  // news
  getNews (token) {
    return this.apiClient.get('v1/news', {
      headers: {
        token
      }
    })
  }

  // faqs
  getFaqs (token) {
    return this.apiClient.get('v1/faqs', {
      headers: { token }
    })
  }
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2
}
