export default class GetWizardInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getWizardValidation()
  }
}
