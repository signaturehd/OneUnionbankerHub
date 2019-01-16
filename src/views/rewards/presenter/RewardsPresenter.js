import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetRewardsAwardsInteractor from '../../../domain/interactor/rewards/GetRewardsAwardsInteractor'
import GetRewardPointsInteractor from '../../../domain/interactor/rewards/GetRewardPointsInteractor'

let storedRecognizedAwards = []

export default class RewardsPresenter {
  constructor (container) {
    this.getRewardsAwardsInteractor = new GetRewardsAwardsInteractor(container.get('HRBenefitsClient'))
    this.getRewardPointsInteractor = new GetRewardPointsInteractor(container.get('HRBenefitsClient'))
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

  getRewardPoints () {
    this.getRewardPointsInteractor.execute()
    .subscribe(data => {
      this.view.setRewardPoints(data.points)
    }, error => {

    })
  }
}
