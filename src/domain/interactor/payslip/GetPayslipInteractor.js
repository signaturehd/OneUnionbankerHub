export default class GetPayslipInteractor {

  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPayslip(this.client.getToken())
  }
}
