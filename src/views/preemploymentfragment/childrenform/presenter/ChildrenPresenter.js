import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/GetFinanceStatusInteractor'
import AddFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/AddFinanceStatusInteractor'
import PutFinanceStatusInteractor from '../../../../domain/interactor/preemployment/financial/PutFinanceStatusInteractor'
import GetFinanceDetailsInteractor from '../../../../domain/interactor/preemployment/financial/GetFinanceDetailsInteractor'
import addFinancialStatusParam from '../../../../domain/param/AddFinancialStatusParam'

import GetChildrenInteractor from '../../../../domain/interactor/preemployment/children/GetChildrenInteractor'

export default class ChildrenPresenter {
  constructor (container) {
    this.getChildrenInteractor = new GetChildrenInteractor(container.get('HRBenefitsClient'))
    this.getFinanceStatusInteractor = new GetFinanceStatusInteractor(container.get('HRBenefitsClient'))
    this.addFinanceStatusInteractor = new AddFinanceStatusInteractor(container.get('HRBenefitsClient'))
    this.putFinanceStatusInteractor = new PutFinanceStatusInteractor(container.get('HRBenefitsClient'))
    this.getFinanceDetailsInteractor = new GetFinanceDetailsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getChildren () {
    this.view.showCircularLoader()
    this.getChildrenInteractor.execute()
    .subscribe(data => {
      this.view.showChildrenDetails(data)
      this.view.hideCircularLoader()
    }, erro => {
      this.view.hideCircularLoader()
    })
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
}
