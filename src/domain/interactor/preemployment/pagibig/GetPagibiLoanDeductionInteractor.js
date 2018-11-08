export default class GetPagibiLoanDeductionInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPagibiLoanDeduction(this.client.getToken())
  }
}
