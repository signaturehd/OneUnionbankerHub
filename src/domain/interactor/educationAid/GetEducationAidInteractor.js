export default class GetEducationAidInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getEducationAid(this.client.getToken())
  }
}
