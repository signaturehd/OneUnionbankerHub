export default class GetPreEmploymentStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPreEmploymentStatus(this.client.getToken())
      .subscribe(preEmploymentStatus => {
        console.log(preEmploymentStatus)
        this.client.setPreEmploymentStatus(preEmploymentStatus)
      }, e => {
        this.client.setPreEmploymentStatus({id: 6, status: 'regular'})        
      })
  }
}
