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
    .map(data => {
      let arrayOption = []

      data &&
      data.deliveryOptions.map((resp, key) => (
        arrayOption.push({
          id : resp.id,
          name : resp.address
        })
      ))
      this.view.showLaptopLeaseValidate(data)
      this.view.showDeliveryOptions(arrayOption)
    })
    .subscribe(data => {
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
