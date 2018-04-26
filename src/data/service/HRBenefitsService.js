import { Observable } from 'rxjs'

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
    // return Observable.create(observer => {
    //   observer.next({
    //     status: 200,
    //     data: {
    //       token: '368d2384c4867ca569d50b461a65436de852a71402e290bccd41b020fc3ef2aa0620c603e7c9c8221934e6a6ee92353c4b2f755020fafe7e0e271ce924f2d666'
    //     }
    //   })
    //
    //   observer.complete()
    // })
    return this.apiClient.post('v1/otp', otpParam)
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
}
