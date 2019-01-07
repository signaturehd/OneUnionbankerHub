import GetPensionFundsInteractor from '../../../domain/interactor/pensionfunds/GetPensionFundsInteractor'

let phenomData = [], phenomLength = 0

export default class PensionFundsPresenter {
  constructor (container) {
    this.getPensionFundsInteractor = this.GetPensionFundsInteractor(container.get('HRBenefitsClient'))
  }

  setView(view) {
    this.view = view
  }

  getPensionFunds () {
    this.getPensionFundsInteractor.execute()
    this.view.showCircularLoader(true)
    .subscribe(data => {
      this.view.setPensionFundsData(data)
      this.view.showCircularLoader(false)
    }, error => {
      this.view.showCircularLoader(false)
    })
  }

}
