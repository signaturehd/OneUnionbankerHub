export default class GetNonExistingLoansInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getNonExistingLoans(this.client.getToken())
    .map((resp) => {
      let arrayList = []
      resp.carLeases.map((data) => {
        arrayList.push(data)
      })
      resp.carLoans.map((data) => {
        arrayList.push(data)
      })
      resp.equityLoans.map((data) => {
        arrayList.push(data)
      })
      resp.governmentLoans.map((data) => {
        arrayList.push(data)
      })
      resp.housingLoans.map((data) => {
        arrayList.push(data)
      })
      resp.laptopLeases.map((data) => {
        arrayList.push(data)
      })
      resp.silp.map((data) => {
        arrayList.push(data)
      })
      return arrayList
    })
  }
}
