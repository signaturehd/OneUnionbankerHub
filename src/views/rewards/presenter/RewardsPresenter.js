import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetRewardsAwardsInteractor from '../../../domain/interactor/rewards/GetRewardsAwardsInteractor'

let storedRecognizedAwards = []

export default class RewardsPresenter {
  constructor (container) {
    this.getRewardsAwardsInteractor = new GetRewardsAwardsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setRecognizedRewards (data) {
    storedRecognizedAwards = data
    this.view.setRecognizedRewards(data)
  }

  getRewardAwards () {
    this.getRewardsAwardsInteractor.execute()
    .subscribe(data => {
      this.setRecognizedRewards(data)
    }, error => {
    })
  }

}
