export default class UpdateAddressInteractor {
  constructor (client) {
    this.client = client
  }

  execute (address, file) {
    return this.client.updateAddress(this.client.getToken(), address, file)
  }
}
