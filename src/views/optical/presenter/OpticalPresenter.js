import AddOpticalInteractor from '../../../domain/interactor/optical/AddOpticalInteractor'


export default class OpticalPresenter {
 constructor (container) {
  this.AddOpticalInteractior = new AddOpticalInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 addOptical () {
  this.view.showLoading()

  this.AddOpticalInteractior.execute()
   .subscribe(optical => {
    this.view.hideLoading()
    this.view.showOptical(optical)
   }, e => {
    this.view.hideLoading()
    // TODO prompt generic error
   })
 }
}