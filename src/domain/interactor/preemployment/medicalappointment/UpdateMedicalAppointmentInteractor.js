export default class UpdateMedicalAppointmentInteractor {
  constructor (client) {
    this.client = client
  }

  execute (date, date2, id) {
    return this.client.updateMedicalAppointment(this.client.getToken(), date, date2, id)
  }
}
