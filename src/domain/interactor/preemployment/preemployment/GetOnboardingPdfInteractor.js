export default class GetOnboardingPdfInteractor {
  constructor (client) {
    this.client = client
  }

  execute (link) {
    return this.client.getOnBoardingDocument(this.client.getToken(), link)
  }
}
