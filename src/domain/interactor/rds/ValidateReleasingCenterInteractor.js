export default class ValidateReleasingCenterInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getReleasingCenter()
  }
}
