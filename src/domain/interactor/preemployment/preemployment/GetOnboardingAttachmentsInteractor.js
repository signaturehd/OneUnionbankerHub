export default class GetOnboardingAttachmentsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (file) {
    return this.client.getOnBoardingAttachments(this.client.getToken(), file)
  }
}
