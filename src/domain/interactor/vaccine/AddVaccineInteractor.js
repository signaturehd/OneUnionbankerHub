export default class AddVaccineInteractor {
  constructor (client) {
    this.client = client
  }

  execute (data) {
    return this.client.addVaccine(this.client.getToken(), data)
  }
}
