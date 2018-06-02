export default class VerifyOtpInteractor {
  constructor (client) {
    this.client = client
  }

  execute (otpParam) {
    return this.client.otp(otpParam)
      .do(authResp => {
        if (authResp) {
          this.client.setInitialToken(authResp.token)
        }
      })
  }
}
