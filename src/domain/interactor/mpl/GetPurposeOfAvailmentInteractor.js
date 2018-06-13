export default class GetPurposeOfAvailmentInteractor {
  constructor (client) {
    this.client = client
  }

  execute ({
    loanTypesId,
    purposeOfLoan,
    subcategoryLevel }) {
    return this.client.getMplPurposeOfAvailment(
      this.client.getToken(), {
      loanTypesId,
      purposeOfLoan,
      subcategoryLevel })
  }
}
