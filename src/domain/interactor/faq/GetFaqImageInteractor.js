export default class GetFaqImageInteractor {
  constructor (client) {
    this.client = client
  }

  execute (ImageParam) {
    return this.client.getFaqsImage(this.client.getAccountToken(), ImageParam)
  }
}
