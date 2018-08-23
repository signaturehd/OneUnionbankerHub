import AddDentalReimbursementInteractor from
'../../../domain/interactor/dentalReimbursement/AddDentalReimbursementInteractor'

import GetDentalReimbursementInteractor from
'../../../domain/interactor/dentalReimbursement/GetDentalReimbursementInteractor'

import { Observable } from 'rxjs'

import dentalReimbursementParam from '../../../domain/param/DentalRParam'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

export default class DentalReimbursementPresenter {
  constructor (container) {
  this.AddDentalReimbursementInteractor =
    new AddDentalReimbursementInteractor(container.get('HRBenefitsClient'))

  this.getDentalReimbursementInteractor =
    new GetDentalReimbursementInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
  this.view = view
  }

  getDentalReimbursement () {
    this.view.showCircularLoader()
    this.getDentalReimbursementInteractor.execute()
  .map(dentalreimbursement =>
    this.view.showDentalReimbursementValidate(dentalreimbursement))
  .toArray()
  .do(dentalreimbursement => this.view.hideCircularLoader(),
      dentalreimbursement => this.view.hideCircularLoader())
  .subscribe()
  }

  addDentalReimbursement (orDate, orNumber, dependentId, procedure, attachments) {
    this.view.showCircularLoader()
    this.AddDentalReimbursementInteractor.execute(
      dentalReimbursementParam(orDate, orNumber, dependentId, procedure, attachments))
      .subscribe(
        data => {
         this.view.hideCircularLoader()
         this.view.noticeOfUndertaking(data)
      },
      error => {
         this.view.hideCircularLoader()
        }
      )
    }
  }
