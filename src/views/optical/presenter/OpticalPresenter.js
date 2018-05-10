import AddOpticalInteractor from '../../../domain/interactor/optical/AddOpticalInteractor'
import GetOpticalInteractor from '../../../domain/interactor/optical/GetOpticalInteractor'
import OpticalParam from '../../../domain/param/OpticalParam'

export default class OpticalPresenter {
 constructor (container) {
   this.addOpticalInteractior = new AddOpticalInteractor(container.get('HRBenefitsClient'))
   this.getOpticalInteractor = new GetOpticalInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 addOptical (amount, form1, form2) {
  this.view.showLoading()
  this.addOpticalInteractior.execute(OpticalParam(amount, form1, form2))
   .subscribe(optical => {
    this.view.hideLoading()
    console.log(optical)
    console.log(this.view)
    this.view.noticeOfUndertaking(optical)
    // this.view.showOptical(optical)
   }, e => {
    this.view.hideLoading()
    this.view.noticeResponse(e)
    // TODO prompt generic error
   })
 }

 getOptical () {
   this.view.showLoading()
   this.getOpticalInteractor.execute()
    .subscribe(response => {
      this.view.hideLoading()
      this.view.isEligible(response)
    }, e => {
      this.view.hideLoading()
    })
 }

}
