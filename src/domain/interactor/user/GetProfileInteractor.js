export default class GetProfileInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.profile(this.client.getToken())
      .do(profileResp => this.client.setProfile(profileResp))
      .do(profileResp => this.client.setAccountNumber(profileResp.accountNumber))
  }
}
