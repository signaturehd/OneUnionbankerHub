import { Observable } from 'rxjs'
export default class HRBenefitsService {
  constructor (apiClient, accountClient) {
    this.apiClient = apiClient
    this.accountClient = accountClient
  }

  /* user */
  login (loginParam) {
    return this.apiClient.post('v1/login', {
      body: loginParam,
      json: true,
    })
  }

  otp (otpParam) {
    return this.apiClient.post('v1/otp', {
      body: otpParam,
      json: true,
    })
  }

  /* account */
  validateAccountNumber (accountNumber) {
    return this.accountClient.get(`accounts/v1/${  accountNumber}`, {
      headers: {
        referenceid: Math.random().toString(36)
.substring(7)
      },
      json: true,
    })
  }

  /* rds */
  getReleasingCenters () {
    return this.apiClient.get('v1/rds/centers', {
      json: true,
    })
  }
   /* Library */
   getBooks () {
    return  Observable.create(observer => {
      observer.next({
        response: {
            statusCode: 200,
            body: [
              {
                Author: 'Dan Brown',
                Title: 'The Origin',
                id : 1007,
                Rating: 5,
              },
              {
                Author: 'Dan Brown',
                Title: 'The Lost Symbol',
                id : 1008,
                Rating: 4,
              },
              {
                Author: 'J.K.',
                Title: 'The Harry Potter Series',
                id : 1100,
                Rating: 4,
              }
            ]
         }
      })
      
       observer.complete()
      })
  }
  getNews () {
    return this.apiClient.get('v1/news', {
      json: true,
    })
  }
}
