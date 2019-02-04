import GetPhenomDiscountsInteractor from '../../../domain/interactor/phenom/GetPhenomDiscountsInteractor'
import GetPhenomDetailsInteractor from '../../../domain/interactor/phenom/GetPhenomDetailsInteractor'
import AddCheckedStatusIsHeartInteractor from '../../../domain/interactor/phenom/AddCheckedStatusIsHeartInteractor'

let phenomData = [], phenomLength = 0

export default class PhenomPresenter {
  constructor (container) {
    this.getPhenomDiscountsInteractor =
      new GetPhenomDiscountsInteractor(container.get('HRBenefitsClient'))
    this.getPhenomDetailsInteractor =
      new GetPhenomDetailsInteractor(container.get('HRBenefitsClient'))
    this.addCheckedStatusIsHeartInteractor =
      new AddCheckedStatusIsHeartInteractor(container.get('HRBenefitsClient'))

    this.getPhenomImage = container.get('FileClient')
  }

  setView(view) {
    this.view = view
  }

  getPhenomDiscounts () {
    phenomData = []
    this.view.showCircularLoader()
    this.getPhenomDiscountsInteractor.execute()
    .subscribe(resp => {
      phenomData.push(resp)
      if (phenomData.length !== 0) {
        this.view.showPhenomDiscountList(phenomData)
      }
      this.view.hideCircularLoader()
    }, e => {
      this.view.hideCircularLoader()
    })
    // .subscribe(data => {
    //   this.view.showCircularLoader(false)
    //   this.view.showPhenomDiscountList(data)
    // }, error => {
    //   this.view.showCircularLoader(false)
    // })
  }

  getPhenomDiscountsNoLoading () {
    phenomData = []
    this.getPhenomDiscountsInteractor.execute()
      .subscribe(resp => {
          phenomData.push(resp)
          if (phenomData.length !== 0) {
            this.view.showPhenomDiscountList(phenomData)
          }
        }, e => {
      })
    // .subscribe(data => {
    //   this.view.showCircularLoader(false)
    //   this.view.showPhenomDiscountList(data)
    // }, error => {
    //   this.view.showCircularLoader(false)
    // })
  }

  getPhenomSelectedDiscounts (id) {
    this.view.showCircularLoader()
    this.getPhenomDetailsInteractor.execute(id)
    .subscribe(data => {
      this.view.showPhenomDetails(data, true)
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  addPhenomIsHeart (id, isHeart) {
    this.addCheckedStatusIsHeartInteractor.execute(id, isHeart === 0 ? 1 : 0)
    .subscribe(data => {
      this.getPhenomDiscountsNoLoading()
    }, error => {
    })
  }

}
