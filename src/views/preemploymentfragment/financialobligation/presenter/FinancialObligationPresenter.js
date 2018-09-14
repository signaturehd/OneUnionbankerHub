import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/GetFinanceStatusInteractor'


export default class FinancialObligationPresenter {
  constructor (container) {
    this.getFinanceStatusInteractor = new GetFinanceStatusInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getFinancialStatus () {
    this.view.circularLoader(true)
    this.getFinanceStatusInteractor.execute()
    .map(data => {
      let singleInputArray = []

      data.map((resp, key) => {
        singleInputArray.push({
          id: resp.id,
          name : resp.status,
        })
      })
      this.view.showFinanceStatus(singleInputArray)
    })
    .subscribe(data => {
      this.view.circularLoader(false)
    }, error => {
      this.view.circularLoader(false)
    })
  }
}
