import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

export default class GetPreEmploymentStatusInteractor {
  constructor (client) {
    this.client = client
  }

  execute () {
    return this.client.getPreEmploymentStatus(this.client.getToken())
      .subscribe(preEmploymentStatus => {
        let objectParam = {
          "id" : preEmploymentStatus && preEmploymentStatus.id,
          "status" : preEmploymentStatus && preEmploymentStatus.status,
        }
        this.client.setEmploymentStatus(objectParam)
      }, e => {
        store.dispatch(NotifyActions.resetNotify())
        let objectParam = {
          "id": 6,
          "status": 'Regular'
        }
        this.client.setEmploymentStatus(objectParam)
      })
    }
}
