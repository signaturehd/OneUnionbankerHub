import GetLaptopLeaseInteractor from
'../../../domain/interactor/laptoplease/GetLaptopLeaseInteractor'

export default class LaptopLeasePresenter {
  constructor (container) {
    this.getLaptopLeaseInteractor = new GetLaptopLeaseInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getLaptopLease () {
    this.view.showCircularLoader()
    this.getLaptopLeaseInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showLaptopLeaseValidate(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
