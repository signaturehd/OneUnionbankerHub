import { Observable } from 'rxjs'
let page = 1
let list1 = []

export default class GetVacanciesInteractor {
  constructor (client) {
    this.client = client
  }

  execute (positionId, squadId, pageNumber) {
    return this.client.getVacancies(this.client.getToken(), positionId, squadId, page)
    .flatMap(resp => {
      return Observable.range(1, this.addPageNumber())
    })

    .flatMap(dateResp => {
      return this.client.getVacancies(this.client.getToken(), positionId, squadId, page)
    })
  }
}
