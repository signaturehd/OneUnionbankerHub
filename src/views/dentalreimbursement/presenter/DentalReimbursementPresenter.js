import AddDentalReimbursementInteractor from '../../../domain/interactor/dentalreimbursement/AddDentalReimbursementInteractor'
import GetDentalReimbursementInteractor from '../../../domain/interactor/dentalreimbursement/GetDentalReimbursementInteractor'


export default class DentalReimbursementPresenter {
 constructor (container) {
   this.AddDentalReimbursementInteractor = new AddDentalReimbursementInteractor(container.get('HRBenefitsClient'))
   this.GetDentalReimbursementInteractor = new GetDentalReimbursementInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 getDentalReimbursement () {
   this.view.showLoading()

   this.getDentalReimbursementInteractor.execute()
    .subscribe(dentalreimbursement => {
      this.view.hideLoading()
      this.view.dentalReimbursement(dentalreimbursement)
    }, e => {
      this.view.hideLoading()
    })

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
