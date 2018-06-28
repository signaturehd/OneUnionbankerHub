export default class GetManagersCheckInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    const user = this.client.getProfile()
    return user !== undefined ? user.employee && user.employee.allowManagersCheck : null 
  }
}
