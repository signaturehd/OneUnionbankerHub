export default class GetStatusSquadApplicationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (isActive) {
    return this.client.getStatusSquadApplication(this.client.getToken(), isActive)
  }
}
