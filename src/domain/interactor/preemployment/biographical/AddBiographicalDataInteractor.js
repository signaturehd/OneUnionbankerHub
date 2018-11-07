export default class AddBiographicalDataInteractor {
  constructor (client) {
    this.client = client
  }

  execute (biographicalParam) {
    return this.client.addBiographicalData(this.client.getToken(), biographicalParam)
  }
}
