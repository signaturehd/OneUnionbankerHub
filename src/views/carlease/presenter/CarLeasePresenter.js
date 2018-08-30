import GetCarNewValidateInteractor from '../../../domain/interactor/carlease/GetCarNewValidateInteractor'
import GetCarNewFormSubmissionInteractor from '../../../domain/interactor/carlease/GetCarNewFormSubmissionInteractor'
import GetCarValidateInteractor from '../../../domain/interactor/carlease/GetCarNewValidateInteractor'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

import carRequestParam from '../../../domain/param/AddCarleaseRequestParam'

export default class CarLeasePresenter {
  constructor (container) {

    this.carNewSubmissionInteractor =
      new GetCarNewFormSubmissionInteractor(container.get('HRBenefitsClient'))

    this.getCarValidateInteractor =
      new GetCarValidateInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }


  getCarValidate () {
    this.view.showCircularLoader()
    this.getCarValidateInteractor.execute()
    .subscribe(
      validate => {
        this.view.showCarValidated(validate)
        this.view.hideCircularLoader()
      }, error => {
        this.view.navigate()
      }
    )
  }

  addCarRequest (
    carBrand,
    carModel,
    makeYear,
    leaseMode,
    solRC,
    insurancePayment,
    cMUnit,
    primaryColor,
    secondaryColor,
    file
  ) {
    this.view.showCircularLoader()
    this.carNewSubmissionInteractor.execute(carRequestParam(
      carBrand,
      carModel,
      makeYear,
      leaseMode,
      solRC,
      insurancePayment,
      cMUnit,
      primaryColor,
      secondaryColor,
      file
    ))
     .subscribe(
       data => {
         this.view.hideCircularLoader()
         this.view.noticeOfUndertaking(data)
       }, error => {
         this.view.noticeResponseResp(error)
         this.view.hideCircularLoader()
       }
     )
  }
}
