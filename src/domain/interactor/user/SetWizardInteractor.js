export default class SetWizardInteractor {
  constructor (client) {
    this.client = client
  }

  execute (wizard) {
    return this.client.setWizardValidation(wizard)
  }
}
