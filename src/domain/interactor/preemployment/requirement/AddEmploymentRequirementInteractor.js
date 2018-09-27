export default class AddEmployeeRequirementInteractor {
  constructor (client) {
    this.client = client
  }

  execute (requirement) {
    return this.client.addEmployeeRequirement(this.client.getToken(), requirement)
  }
}
