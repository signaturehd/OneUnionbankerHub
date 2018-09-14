import GetPhenomDiscountsInteractor from '../../../domain/interactor/phenom/GetPhenomDiscountsInteractor'
import GetPhenomDetailsInteractor from '../../../domain/interactor/phenom/GetPhenomDetailsInteractor'
import AddCheckedStatusIsHeartInteractor from '../../../domain/interactor/phenom/AddCheckedStatusIsHeartInteractor'
export default class PhenomPresenter {
  constructor (container) {
    this.getPhenomDiscountsInteractor =
      new GetPhenomDiscountsInteractor(container.get('HRBenefitsClient'))
    this.getPhenomDetailsInteractor =
      new GetPhenomDetailsInteractor(container.get('HRBenefitsClient'))
    this.addCheckedStatusIsHeartInteractor =
      new AddCheckedStatusIsHeartInteractor(container.get('HRBenefitsClient'))

    this.getTransactionImage = container.get('FileClient')
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
      this.view.showCircularLoader(false)
    })
  }

  getPhenomDiscountNoLoading () {
    this.getPhenomDiscountsInteractor.execute()
    .subscribe(data => {
      this.view.showPhenomDiscountList(data)
    }, error => {
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

  addPhenomIsHeart (id, isHeart) {
    this.addCheckedStatusIsHeartInteractor.execute(id, isHeart === 0 ? 1 : 0)
    .subscribe(data => {
      this.getPhenomDiscountNoLoading()
    }, error => {
    })
  }

}
