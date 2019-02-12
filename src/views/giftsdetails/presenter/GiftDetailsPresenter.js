import GetRewardGiftsDetailsInteractor from '../../../domain/interactor/gifts/GetRewardGiftsDetailsInteractor'

export default class GiftsPresenter {
  constructor (container) {
    this.getRewardGiftsDetailsInteractor = new GetRewardGiftsDetailsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getRewardGiftsDetails (id) {
    this.view.circularLoader(true)
    this.getRewardGiftsDetailsInteractor.execute(id)
    .subscribe(data => {
      this.view.circularLoader(false)
      this.view.setRewardGiftsDetails(data && data)
    }, error => {
      this.view.circularLoader(false)
    })
  }
}
