export default class UpdateRemarksInteractor {
  constructor (client) {
      this.client = client
  }

  execute (RemarksParam) {
    return this.client.updateTransactionRemarks(this.client.getToken(), RemarksParam)
  }
}
