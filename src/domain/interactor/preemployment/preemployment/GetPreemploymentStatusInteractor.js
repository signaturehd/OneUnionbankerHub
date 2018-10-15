export default class GetPreEmploymentStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPreEmploymentStatus(this.client.getToken())
  }
}
