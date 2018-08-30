export default class ValidateEmployeePinInteractor {
  constructor (client) {
    this.client = client
  }

  execute (employeePinParam) {
    return this.client.validateEmployeePin(this.client.getToken(), employeePinParam)
  }
}
