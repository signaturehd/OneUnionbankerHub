import GetCarNewValidateInteractor from '../../../domain/interactor/carlease/GetCarNewValidateInteractor'
import GetCarNewFormSubmissionInteractor from '../../../domain/interactor/carlease/GetCarNewFormSubmissionInteractor'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

import addCarParam from '../../../domain/param/AddCarleaseRequestParam'

export default class CarLeasePresenter {

  constructor (container) {

    this.carNewValidateInteractor =
      new GetCarNewValidateInteractor(container.get('HRBenefitsClient'))

    this.carNewSubmissionInteractor =
      new GetCarNewFormSubmissionInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  getCarValidate () {
    this.view.hideCircularLoader()
    this.carNewValidateInteractor.execute()
      .do(data => this.view.showValidate(data))
      .do(data => this.view.hideCircularLoader(),
          data => this.view.hideCircularLoader())
      .subscribe()
  }

  addCarRequest (
    carBrand,
    carModel,
    makeYear,
    primaryColor,
    secondaryColor,
    file
  ) {
    this.carNewSubmissionInteractor.execute(addCarParam(
      carBrand,
      carModel,
      makeYear,
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
         this.view.showCircularLoader()
       }, error => {
           store.dispatch(NotifyActions.addNotify({
               title : 'Warning',
               message : error.message,
               type : 'warning',
               duration : 2000
             }
           )
         )
       }
     )
  }
}
