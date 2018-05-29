export default class GetRemarksInteractor {
  constructor (client) {
      this.client = client
  }

  execute (RemarksParam) {
    return this.client.getRemarks(this.client.getToken(), RemarksParam)
  }
}
