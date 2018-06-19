export default class GetValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute (mplValidatedLoanParam) {
    return this.client.getMPLValidate(this.client.getToken(), mplValidatedLoanParam)
    .map(offsetLoan => {
      const modeOfLoan = {
        id: 1,
        name: 'New Loan',
      } // create instance of "New Loan"

      offsetLoan.offset.push(modeOfLoan) // add the New Loan to the offsets option

      return offsetLoan
    })
  }
}
