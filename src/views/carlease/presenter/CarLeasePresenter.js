import GetCarNewValidateInteractor from '../../../domain/interactor/carlease/GetCarNewValidateInteractor'
import GetCarNewFormSubmissionInteractor from '../../../domain/interactor/carlease/GetCarNewFormSubmissionInteractor'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

import addCarParam from '../../../domain/param/AddCarleaseRequestParam'

export default class CarLeasePresenter {
  constructor (container) {

    this.carNewSubmissionInteractor =
      new GetCarNewFormSubmissionInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  addCarRequest (
    carBrand,
    carModel,
    makeYear,
    leaseMode,
    primaryColor,
    secondaryColor,
    file
  ) {
    this.view.showCircularLoader()
    this.carNewSubmissionInteractor.execute(addCarParam(
      carBrand,
      carModel,
      makeYear,
      leaseMode,
      primaryColor,
      secondaryColor,
      file
    ))
     .subscribe(
       data => {
         store.dispatch(NotifyActions.addNotify({
             title : 'Success',
             message : data.message,
             type : 'success',
             duration : 2000
             }
           )
         )
         this.view.hideCircularLoader()
       }, error => {
           store.dispatch(NotifyActions.addNotify({
             title : 'Warning',
             message : error.message,
             type : 'warning',
             duration : 2000
           })
         )
         this.view.hideCircularLoader()
       }
     )
  }
}
