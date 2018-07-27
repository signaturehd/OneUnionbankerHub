export default class AddOutPatientReimbursementInteractor {
  constructor (client) {
    this.client = client
  }

  execute (addOutPatientReimbursementParam) {
    return this.client.addOutPatientReimbursement(
        this.client.getToken(),
        this.client.getAccountToken(),
        this.client.getAccountNumber(),
        this.client.getReleasingCenter(),
        addOutPatientReimbursementParam)
  }
}
