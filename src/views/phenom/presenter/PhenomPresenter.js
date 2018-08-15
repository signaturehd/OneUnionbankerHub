import GetPhenomDiscountsInteractor from '../../../domain/interactor/phenom/GetPhenomDiscountsInteractor'

export default class PhenomPresenter {
  constructor (container) {
    this.getPhenomDiscountsInteractor =
      new GetPhenomDiscountsInteractor(container.get('HRBenefitsClient'))
  }

  setView(view) {
    this.view = view
  }

  getPhenomDiscounts () {
    this.view.showCircularLoader(true)
    this.getPhenomDiscountsInteractor.execute()
    .subscribe(data => {
      this.view.showPhenomDiscountList(data)
      this.showCircularLoader(false)
    }, error => {

    })
  }
}
