export default class CarNewValidateInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getCarValidate(this.client.getToken())
  }
}
