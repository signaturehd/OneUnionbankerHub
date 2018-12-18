export default class GetPreEmploymentFormInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPreEmploymentForm(this.client.getToken())
  }
}
