import { Observable } from 'rxjs'
let limit = 100
let list1 = [], list2 = []

export default class GetPensionFundsDatePaginationInteractor {
  constructor (client) {
    this.client = client
  }

  execute (fromDate, toDate) {
    return this.client.getPensionFundsDatePagination(this.client.getToken(), limit, 1, fromDate, toDate)
      .flatMap(dateResp => {
        return Observable.range(1, this.calculatePageCount(dateResp.totalRecords, dateResp.limit))
      })
      .flatMap(dateResp => {
        return this.client.getPensionFundsDatePagination(this.client.getToken(), limit, 1, dateResp.fromDate, dateResp.toDate)
      })
      /*
        Get List
      */
      .map(resp => {
        return resp.records
      })
      .reduce((l1, l2) => {
        return [...l1, ...l2]
      })
    .single()
  }

  /**
  * calculate the page count base on total records and limit per page.
  *
  * if total record is lower than the limit given, return 1 page only.
  */
  calculatePageCount (totalRecords, limit) {
    if (limit > totalRecords) {
        return 1
    }

    return totalRecords / limit
  }
}
