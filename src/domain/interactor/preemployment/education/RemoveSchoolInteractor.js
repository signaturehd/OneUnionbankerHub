export default  class RemoveSchoolInteractor {
  constructor (client) {
    this.client =  client
  }

  execute (id) {
    return  this.client.removeSchool(this.client.getToken(), id)
  }
}
