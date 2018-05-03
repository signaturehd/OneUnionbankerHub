import AddDentalLoaInteractor from '../../../domain/interactor/dentalLoa/AddDentalLoaInteractor'


export default class DentalLoaPresenter {
 constructor (container) {
  this.AddDentalLoaInteractor = new AddDentalLoaInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 addDentalLoa () {
  this.view.showLoading()

  this.AddDentalLoalInteractor.execute()
   .subscribe(dentalloa => {
    this.view.hideLoading()
    this.view.showDentalLoa(dentalloa)
   }, e => {
    this.view.hideLoading()
    // TODO prompt generic error
   })
 }
}
