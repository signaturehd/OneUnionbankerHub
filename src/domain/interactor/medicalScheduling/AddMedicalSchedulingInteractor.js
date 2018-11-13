export default class AddMedicalSchedulingInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addMedicalSchedulingParam) {
    return this.client.addMedicalScheduling(
      this.client.getToken(),
      addMedicalSchedulingParam
    )
  }
}
