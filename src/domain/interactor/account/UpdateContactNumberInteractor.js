export default class UpdateContactNumberInteractor {
  constructor (client) {
    this.client = client
  }

  execute (number) {
    return this.client.updateContactNumber(this.client.getToken(), number)
  }
}
