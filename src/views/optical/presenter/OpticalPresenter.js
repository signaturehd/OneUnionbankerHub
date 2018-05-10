import AddOpticalInteractor from '../../../domain/interactor/optical/AddOpticalInteractor'
import GetOpticalInteractor from '../../../domain/interactor/optical/GetOpticalInteractor'
import OpticalParam from '../../../domain/param/OpticalParam'

export default class OpticalPresenter {
 constructor (container) {
   this.AddOpticalInteractior = new AddOpticalInteractor(container.get('HRBenefitsClient'))
   this.GetOpticalInteractor = new GetOpticalInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 addOptical (amount, form1, form2) {
  this.view.showLoading()
  this.AddOpticalInteractior.execute(OpticalParam(amount, form1, form2))
   .subscribe(optical => {
    this.view.hideLoading()
    // this.view.showOptical(optical)
   }, e => {
    this.view.hideLoading()
    // TODO prompt generic error
   })
 }

 getOptical () {
   this.view.showLoading()
   this.GetOpticalInteractor.execute()
    .subscribe(response => {
      this.view.hideLoading()
      this.view.isEligible(response)
    }, e => {
      this.view.hideLoading()
    })
 }

}
