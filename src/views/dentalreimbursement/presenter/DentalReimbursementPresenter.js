import AddDentalReimbursementInteractor from '../../../domain/interactor/dentalReimbursement/AddDentalReimbursementInteractor'
import GetDentalReimbursementInteractor from '../../../domain/interactor/dentalReimbursement/GetDentalReimbursementInteractor'
import { Observable } from 'rxjs'

export default class DentalReimbursementPresenter {
 constructor (container) {
   this.AddDentalReimbursementInteractor = new AddDentalReimbursementInteractor(container.get('HRBenefitsClient'))
   this.getDentalReimbursementInteractor = new GetDentalReimbursementInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 getDentalReimbursement () {
   this.view.showCircularLoader()
   this.getDentalReimbursementInteractor.execute()
   .map(dentalreimbursement => this.view.getDentalReimbursement(dentalreimbursement))
   .toArray()
   .do(dentalreimbursement => this.view.hideCircularLoader(),
           dentalreimbursement => this.view.hideCircularLoader())
   .subscribe()
 }
 addDentalReimbursement () {
  this.view.showCircularLoader()
  this.AddDentalReimbursementInteractor.execute()
  .do(adddentalreimbursement => this.view.addDentalReimbursement(adddentalreimbursement))
  .do(adddentalreimbursement => this.view.hideCircularLoader(),
          e => this.view.hideCircularLoader())
  .subscribe()
 }
}
