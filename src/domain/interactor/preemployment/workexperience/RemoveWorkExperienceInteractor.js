export default  class RemoveWorkExperienceInteractor {
  constructor (client) {
    this.client =  client
  }

  execute (id) {
    return  this.client.removeWorkExperience(this.client.getToken(), id)
  }
}
