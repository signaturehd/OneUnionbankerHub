import ValidateLaptopLeaseInteractor from
'../../../domain/interactor/laptoplease/ValidateLaptopLeaseInteractor'

import AddLaptopLeaseInteractor from
'../../../domain/interactor/laptoplease/AddLaptopLeaseInteractor'

let storedAmount = '', storedTerms = '', storedColor = '', storedDeliveryOption = '', storedFile = []

export default class LaptopLeasePresenter {
  constructor (container) {
    this.validateLaptopLeaseInteractor = new ValidateLaptopLeaseInteractor(container.get('HRBenefitsClient'))
    this.addLaptopLeaseInteractor = new AddLaptopLeaseInteractor(container.get('HRBenefitsClient'))
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

  setFile (file) {
    storedFile = file
    this.view.setFile(file)
  }

  setDeliveryOption (deliveryOption) {
    storedDeliveryOption = deliveryOption
    this.view.setDeliveryOption(deliveryOption)
  }

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
    this.view.showCircularLoader()
    this.addLaptopLeaseInteractor.execute(storedAmount, storedTerms, storedColor, storedDeliveryOption, storedFile)
      .subscribe(data => {
        this.view.hideCircularLoader()
      }, e => {
        this.view.hideCircularLoader()
        console.log(e)
      })
  }


}
