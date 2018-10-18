export default class GetEmployeeAttachmentsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (id) {
    return this.client.getEmployeeAttachments(this.client.getToken(), id)
  }
}
