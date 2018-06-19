export default class VerifyOtpInteractor {
  constructor (client) {
    this.client = client
  }

  execute (otpParam) {
    return this.client.otp(otpParam)
      .do(authResp => {
        if (authResp && authResp.termsAndCondition.accepted) {
          this.client.setToken(authResp.token)
        } else {
          this.client.setInitialToken(authResp.token)
        }
      })
  }
}
