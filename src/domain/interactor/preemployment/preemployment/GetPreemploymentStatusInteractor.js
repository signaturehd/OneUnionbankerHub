export default class GetPreemploymentStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPreemploymentStatus(this.client.getToken())
  }
}
