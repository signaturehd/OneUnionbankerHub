import AddDentalLoaInteractor from '../../../domain/interactor/dentalLoa/AddDentalLoaInteractor'
import GetDentalLoaInteractor from '../../../domain/interactor/dentalLoa/GetDentalLoaInteractor'


export default class DentalLoaPresenter {
 constructor (container) {
   this.addDentalLoaInteractor = new AddDentalLoaInteractor(container.get('HRBenefitsClient'))
   this.getDentalLoaInteractor = new GetDentalLoaInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 getDentalLoa () {
   this.view.showCircularLoader()
   this.getDentalLoaInteractor.execute()

    .subscribe(response => {
      this.view.hideCircularLoader()
      this.view.getDentalLoa(response)
    }, e => {
      this.view.hideLoading()
    })
 }


 addDentalLoa () {
  this.view.showLoading()
  this.addDentalLoaInteractor.execute()
   .subscribe(dentalloa => {
    this.view.hideLoading()
    this.view.showDentalLoa(dentalloa)
   }, e => {
    this.view.hideLoading()
    // TODO prompt generic error
   })
 }
}
