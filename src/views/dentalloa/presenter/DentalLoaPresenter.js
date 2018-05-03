import AddDentalLoalInteractor from '../../../domain/interactor/dentalLoa/AddDentalLoalInteractor'


export default class DentalLoaPresenter {
 constructor (container) {
  this.AddDentalLoalInteractor = new AddDentalLoalInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 addOptical () {
  this.view.showLoading()

  this.AddDentalLoalInteractor.execute()
   .subscribe(dentalloa => {
    this.view.hideLoading()
    this.view.showOptical(dentalloa)
   }, e => {
    this.view.hideLoading()
    // TODO prompt generic error
   })
 }
}
