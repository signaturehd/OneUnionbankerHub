export default class AddOpticalInteractor {
  constructor (client) {
    this.client = client
  }

  execute (opticalParam) {
    return this.client.addOptical(this.client.getToken(),
      this.client.getAccountToken(), this.client.getAccountNumber(), opticalParam)
  }
}
