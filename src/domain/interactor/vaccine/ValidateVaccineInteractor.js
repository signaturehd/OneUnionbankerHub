export default class ValidateVaccineInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateVaccine(this.client.getToken())
  }
}
