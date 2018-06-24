export default class GetCarNewValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCarValidate(this.client.getToken())
  }
}
