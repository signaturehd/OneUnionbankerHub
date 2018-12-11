export default class GetPurposeCoeTypeInteractor {
  constructor (client) {
    this.client = client
  }

  execute (type) {
    return this.client.getPurposeCoeType(this.client.getToken(), type)
  }
}
