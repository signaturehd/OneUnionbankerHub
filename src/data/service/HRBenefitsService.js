
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

  getDentalReimbursement (token) {
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
  validateAccountNumber (token, accountNumber) {
    return this.accountClient.get(`accounts/v1/${accountNumber}`, {
      headers: {
        token,
        referenceId : Math.random().toString(36)
          .substring(7),
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

  getBooksBorrowed (token) {
    return this.apiClient.get('v1/books/history', {
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
  paddRating (token, bookParam) {
    return this.apiClient.post('v1/books/podcasts', bookParam, {
      headers : { token }
    })
  }

  /* FAQ's */

  getFaqs (token) {
    return this.apiClient.get('v1/faqs', {
      headers: { token }
    })
  }

  getFaqsCategories (token) {
    return this.apiClient.get('v1/faqs/categories', {
      headers: { token }
    })
  }
}
