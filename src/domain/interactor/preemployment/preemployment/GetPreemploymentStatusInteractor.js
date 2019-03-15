export default class GetPreEmploymentStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPreEmploymentStatus(this.client.getToken())
      .subscribe(preEmploymentStatus => {
        const objectParam = {
          "id" : preEmploymentStatus && preEmploymentStatus.id,
          "status" : preEmploymentStatus && preEmploymentStatus.status,
        }
        this.client.setPreEmploymentStatus(objectParam)
      }, e => {
        const objectParam = {
        "id": 6,
        "status": 'regular'
        }
        this.client.setPreEmploymentStatus(objectParam)
      })
    }
}
