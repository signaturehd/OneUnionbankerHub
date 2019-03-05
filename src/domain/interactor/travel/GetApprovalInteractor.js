export default class GetApprovalInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getApproval(this.client.getToken())
  }
}
