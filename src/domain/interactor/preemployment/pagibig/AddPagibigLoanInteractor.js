export default class AddPagibigLoanInteractor {
  constructor (client) {
    this.client = client
  }

  execute (pagibigParam) {
    return this.client.addPagibigLoan(this.client.getToken(), pagibigParam)
  }
}
