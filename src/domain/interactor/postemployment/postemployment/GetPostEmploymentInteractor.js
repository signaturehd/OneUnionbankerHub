export default class GetPostEmploymentInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPostEmployment(this.client.getToken())
  }
}
