import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/GetFinanceStatusInteractor'
import AddFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/AddFinanceStatusInteractor'
import addFinancialStatusParam from '../../../../domain/param/AddFinancialStatusParam'

export default class FinancialObligationPresenter {
  constructor (container) {
    this.getFinanceStatusInteractor = new GetFinanceStatusInteractor(container.get('HRBenefitsClient'))
    this.addFinanceStatusInteractor = new AddFinanceStatusInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getFinancialStatus () {
    this.view.hideCircularLoader()
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
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  addFinancialStatus (
    bankNameInstitution,
    natureObligation,
    amount,
    statusId
  ) {
    this.view.showCircularLoader()
    this.addFinanceStatusInteractor.execute(addFinancialStatusParam(
      bankNameInstitution,
      natureObligation,
      amount,
      statusId
    ))
    .subsribe(data => {
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
