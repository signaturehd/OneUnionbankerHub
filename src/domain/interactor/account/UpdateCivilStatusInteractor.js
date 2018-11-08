export default class UpdateCivilStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute (civilStatus) {
    return this.client.updateCivilStatus(this.client.getToken(), civilStatus)
  }
}
