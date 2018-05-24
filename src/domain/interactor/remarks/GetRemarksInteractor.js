export default class GetRemarksInteractor {
  constructor (client) {
      this.client = client
  }

  execute (GetRemarksParam) {
    return this.client.getTransactionsPersonal(this.client.getToken(), GetRemarksParam)
  }
}
