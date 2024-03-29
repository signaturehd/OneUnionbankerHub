import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/GetFinanceStatusInteractor'
import AddFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/AddFinanceStatusInteractor'
import PutFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/PutFinanceStatusInteractor'
import GetFinanceDetailsInteractor from '../../../../domain/interactor/preemployment/financial/GetFinanceDetailsInteractor'
import RemoveFinancialObligationInteractor from '../../../../domain/interactor/preemployment/financial/RemoveFinancialObligationInteractor'
import addFinancialStatusParam from '../../../../domain/param/AddFinancialStatusParam'

export default class FinancialObligationPresenter {
  constructor (container) {
    this.getFinanceStatusInteractor = new GetFinanceStatusInteractor(container.get('HRBenefitsClient'))
    this.addFinanceStatusInteractor = new AddFinanceStatusInteractor(container.get('HRBenefitsClient'))
    this.putFinanceStatusInteractor = new PutFinanceStatusInteractor(container.get('HRBenefitsClient'))
    this.getFinanceDetailsInteractor = new GetFinanceDetailsInteractor(container.get('HRBenefitsClient'))
    this.removeFinancialObligationInteractor = new RemoveFinancialObligationInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getFinancialStatus () {
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

  getFinancialDetails () {
    this.view.showCircularLoader()
    this.getFinanceDetailsInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showFinanceDetails(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  addFinancialStatus (
    bankNameInstitution,
    natureObligation,
    amount,
    statusId,
    financeId
  ) {
    this.view.showCircularLoader()
    this.addFinanceStatusInteractor.execute(addFinancialStatusParam(
      bankNameInstitution,
      natureObligation,
      amount,
      statusId,
      financeId
    ))
    .subscribe(data => {
      this.view.noticeResponseFunc(data.message)
      this.getFinancialDetails()
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  putFinancialStatus (
    bankNameInstitution,
    natureObligation,
    amount,
    statusId,
    financeId
  ) {
    this.view.showCircularLoader()
    this.putFinanceStatusInteractor.execute(addFinancialStatusParam(
      bankNameInstitution,
      natureObligation,
      amount,
      statusId,
      financeId
    ))
    .subscribe(data => {
      this.view.noticeResponseFunc(data.message)
      this.getFinancialDetails()
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  removeFinancial (id) {
    this.view.showCircularLoader()
    this.removeFinancialObligationInteractor.execute(id)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseResp(data)
      this.view.resetMode()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
