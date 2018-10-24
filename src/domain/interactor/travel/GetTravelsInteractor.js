export default class GetTravelsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (statusId) {
    return this.client.getTravels(this.client.getToken(), statusId)
  }
}
