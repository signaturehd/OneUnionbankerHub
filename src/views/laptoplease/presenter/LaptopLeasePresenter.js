import ValidateLaptopLeaseInteractor from
'../../../domain/interactor/laptoplease/ValidateLaptopLeaseInteractor'

let storedAmount = '', storedTerms = '', storedColor = ''

export default class LaptopLeasePresenter {
  constructor (container) {
    this.validateLaptopLeaseInteractor = new ValidateLaptopLeaseInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setColor (color) {
    storedColor = color
    this.view.setColor(terms)
  }

  setAmount (amount) {
    storedAmount = amount
    this.view.setAmount(amount)
  }

  setTerms (terms) {
    storedTerms = terms
    this.view.setTerms(terms)
  }


  setShow

  validateLaptopLease () {
    this.view.showCircularLoader()
    this.validateLaptopLeaseInteractor.execute()
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

  addLaptopLease () {
    this.addLaptopLeaseInteractor.execute(storedAmount, storedTerms,)
  }


}
