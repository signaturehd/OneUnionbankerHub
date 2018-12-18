export default class GetMedicalAppointmentInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getMedicalAppointment(this.client.getToken())
  }

  executeProcedures () {
    return this.client.getMedicalAppointmentProcedures(this.client.getToken())
  }
}
