export default class GetBiographicalAttachmentsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (file) {
    return this.client.getOnboardingAttachments(this.client.getToken(), file)
  }
}
