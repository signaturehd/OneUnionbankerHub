export default class GetAffirmationStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getAffirmationsStatus(this.client.getToken())
  }
}
