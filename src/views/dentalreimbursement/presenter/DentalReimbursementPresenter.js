import AddDentalReimbursementInteractor from '../../../domain/interactor/dentalReimbursement/AddDentalReimbursementInteractor'
import GetDentalReimbursementInteractor from '../../../domain/interactor/dentalReimbursement/GetDentalReimbursementInteractor'

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

  addDentalReimbursement (file1, file2, dependentId, procedure) {
    this.view.showCircularLoader()
    this.AddDentalReimbursementInteractor.execute(
      dentalReimbursementParam(file1, file2, dependentId, procedure))
      .subscribe(
        data => {
          store.dispatch( NotifyActions.addNotify({
            title: 'Dental Reimbursement',
            message : data.message,
            type : 'success',
            duration : 2000
          })
         )
         store.dispatch( NotifyActions.addNotify({
           title: 'Dental Reimbursement',
           message : error.message,
           type : 'warning',
           duration : 2000
         })
        )
         this.view.hideCircularLoader()
        },
        error => {
          this.view.hideCircularLoader()
        }
      )
    }
  }
