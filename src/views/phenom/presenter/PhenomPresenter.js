import GetPhenomDiscountsInteractor from '../../../domain/interactor/phenom/GetPhenomDiscountsInteractor'
import GetPhenomDetailsInteractor from '../../../domain/interactor/phenom/GetPhenomDetailsInteractor'

export default class PhenomPresenter {
  constructor (container) {
    this.getPhenomDiscountsInteractor =
      new GetPhenomDiscountsInteractor(container.get('HRBenefitsClient'))
    this.getPhenomDetailsInteractor =
      new GetPhenomDetailsInteractor(container.get('HRBenefitsClient'))
  }

  setView(view) {
    this.view = view
  }

  getPhenomDiscounts () {
    this.view.showCircularLoader(true)
    this.getPhenomDiscountsInteractor.execute()
    .subscribe(data => {
      this.view.showCircularLoader(false)
      this.view.showPhenomDiscountList(data)
    }, error => {
      this.showCircularLoader(false)
    })
  }

  getPhenomSelectedDiscounts (id) {
    this.view.showCircularLoader(true)
    this.getPhenomDetailsInteractor.execute(id)
    .subscribe(data => {
      this.view.showPhenomDetails(data, true)
      this.view.showCircularLoader(false)
    }, error => {
      this.view.showCircularLoader(false)
    })
  }

  addPhenomIsHeart (like) {
    this.view.showCircularLoader(true)
    this.addPhenomIsHeartInteractor.execute(like)
    .subscribe(data => {
      this.view.showDataUponClickingLike(data)
      this.getPhenomDiscounts()
    }, error => {
      this.view.showCircularLoader(false)
    })
  }

}
