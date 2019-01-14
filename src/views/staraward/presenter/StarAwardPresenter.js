import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetRewardsAwardsInteractor from '../../../domain/interactor/rewards/GetRewardsAwardsInteractor'

export default class StarAwardPresenter {
  constructor (container) {
    this.getRewardsAwardsInteractor = new GetRewardsAwardsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getRewardAwards () {
    this.getRewardsAwardsInteractor.execute()
    .subscribe(data => {
      console.log(data)
    }, error => {
    })
  }
}
