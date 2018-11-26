export default class GetProgramsInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPaySkills(this.client.getToken())
  }
}
