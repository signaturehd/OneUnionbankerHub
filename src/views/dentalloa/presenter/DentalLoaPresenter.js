import AddDentalLoaInteractor from '../../../domain/interactor/dentalLoa/AddDentalLoaInteractor'
import GetDentalLoaInteractor from '../../../domain/interactor/dentalLoa/GetDentalLoaInteractor'
import DentalLoaParam from '../../../domain/param/DentalLoaParam'


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


 addDentalLoa (accountNo, type, dependentId, releasingcCenter, branchId, procedures, preferedDate) {
  this.view.showLoading()
  this.addDentalLoaInteractor.execute(DentalLoaParam(accountNo, type, dependentId, releasingcCenter, branchId, procedures, preferedDate))
   .subscribe(dentalloa => {
    this.view.hideLoading()
    this.view.addDentalLoa(dentalloa)
   }, e => {
    this.view.hideLoading()
    // TODO prompt generic error
   })
 }
}
