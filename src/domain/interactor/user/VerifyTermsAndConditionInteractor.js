export default class VerifyTermsAndConditionInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateTermsAndCondition(this.client.getInitialToken())
      .do(authResp => {
        if (authResp) {
          this.client.setToken(this.client.getInitialToken())
        }
      })
  }
}
