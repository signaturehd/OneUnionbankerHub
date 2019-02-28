export default class GetSquadsInteractor {
  constructor (client) {
    this.client = client
  }

  execute (squadId, pageNumber) {
    return this.client.getSquads(this.client.getToken(), squadId, pageNumber)
    // .flatMap(resp => {
    //   return Observable.range(1, pageCount)
    // })
    // .flatMap(resp => {
    //   if(resp.length !== 0) {
    //     setInterval(() => {
    //         pageNumber += 1
    //         pageCount += 1
    //         return this.client.getSquads(this.client.getToken(), squadId, pageNumber)
    //     }, 1000)
    //   }
    // })
    // .map(resp => {
    //   return resp
    // })
    // .reduce((resp) => {
    //   return [...resp]
    // })
  }
}
