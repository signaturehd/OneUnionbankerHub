export default class AddSelectedDateInteractor {
  constructor (client) {
    this.client = client
  }

  execute (payslipParam) {
    return this.client.addPayslipSelectedDate(this.client.getToken(), payslipParam)
  }
}
