export default class addGrantAidInteractor {
  constructor (client) {
    this.client = client
  }

  execute (grantAidParam) {
    return this.client.addGrantAid(
    this.client.getToken(),
    this.client.getAccountToken(),
    this.client.getAccountNumber(),
    this.client.getReleasingCenter(),
    grantAidParam)
  }
}
