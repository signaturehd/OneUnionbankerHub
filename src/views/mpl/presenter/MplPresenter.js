import GetTypesInteractor from '../../../domain/interactor/mpl/GetTypesInteractor'
import GetPurposeOfAvailmentInteractor from '../../../domain/interactor/mpl/GetPurposeOfAvailmentInteractor'

import store from '../../../actions'
import { NotifyActions } from '../../../actions'

export default class MPLPresenter {
  constructor (container) {
    this.getTypesInteractor =
      new GetTypesInteractor(container.get('HRBenefitsClient'))
    this.getPurposeOfAvailmentInteractor =
      new GetPurposeOfAvailmentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getMPLTypes () {
    this.getTypesInteractor.execute()
      .subscribe(
        data => {
          this.view.showTypes(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Dental Reimbursement',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }
  getMPLPurposeOfAvailment () {
    this.getPurposeOfAvailmentInteractor.execute()
      .subscribe(
        data => {
          this.view.showPurposeOfAvailment(data)
        },
        error => {
          store.dispatch(NotifyActions.addNotify({
            title: 'Error',
            message : error.message,
            type : 'error',
            duration : 2000
          })
         )
        }
      )
    }
  }
