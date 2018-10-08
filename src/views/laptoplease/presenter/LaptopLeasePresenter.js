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

      return data = {
        attachments: [{
          name: 'Laptop Specifications'
        }],
        isValid: data.isValid == 1 ? true : false,
        deliveryOptions: arrayOption
      }

    })
    .subscribe(data => {
      this.view.isLaptopLeaseValidate(data.isValid)
      this.view.setDeliveryOptionList(data.deliveryOptions)
      this.view.setAttachment(data.attachments)
      console.log(data)
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
