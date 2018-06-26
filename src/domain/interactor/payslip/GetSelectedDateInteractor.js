export default class GetSelectedDateInteractor {
  constructor (client) {
    this.client = client
  }

  execute (payslipParam) {
    return this.client.getPayslipSelectedDate(this.client.getToken(), payslipParam)
  }
}
