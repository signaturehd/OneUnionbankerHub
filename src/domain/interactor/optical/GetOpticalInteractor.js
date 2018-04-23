export default class GetOpticalInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getOptical(this.client.getToken())
  }
}
