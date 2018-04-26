export default class GetLibrariesInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.profile(this.client.getToken())
      .do(profileResp => this.client.setProfile(profileResp))
  }
}
