import AddDentalReimbursementInteractor from '../../../domain/interactor/dentalreimbursement/AddDentalReimbursementInteractor'


export default class DentalReimbursementPresenter {
 constructor (container) {
  this.AddDentalReimbursementInteractor = new AddDentalReimbursementInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 addDentalReimbursement () {
  this.view.showLoading()

  this.AddDentalReimbursementInteractor.execute()
   .subscribe(dentalreimbursement => {
    this.view.hideLoading()
    this.view.showDentalReimbursement(dentalreimbursement)
   }, e => {
    this.view.hideLoading()
    // TODO prompt generic error
   })
 }
}
