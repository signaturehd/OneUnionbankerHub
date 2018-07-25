export default class ValidateOutPatientReimbursementInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.validateOutPatientReimbursement(this.client.getToken())
  }
}
