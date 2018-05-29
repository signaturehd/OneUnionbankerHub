export default class UpdateRemarksInteractor {
  constructor (client) {
      this.client = client
  }

  execute (UpdateTransacitonParam) {
    return this.client.updateRemarks(this.client.getToken(), UpdateTransacitonParam)
  }
}
