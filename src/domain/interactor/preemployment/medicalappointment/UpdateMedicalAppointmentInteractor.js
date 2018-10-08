export default class UpdateMedicalAppointmentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (date, id) {
    return this.client.updateMedicalAppointment(this.client.getToken(), date, id)
  }
}
