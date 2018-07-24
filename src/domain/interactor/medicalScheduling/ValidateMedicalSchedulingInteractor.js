export default class ValidateMedicalSchedulingInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateMedicalScheduling(this.client.getToken())
  }
}
