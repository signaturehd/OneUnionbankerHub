import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetRewardsAwardsInteractor from '../../../domain/interactor/rewards/GetRewardsAwardsInteractor'
import SubmitAwardsInteractor from '../../../domain/interactor/rewards/SubmitAwardsInteractor'
import GetRewardPointsInteractor from '../../../domain/interactor/rewards/GetRewardPointsInteractor'
import SubmitAwardsParam from '../../../domain/param/SubmitAwardsParam'

let storedRecognizedAwards = []

export default class RewardsPresenter {
  constructor (container) {
    this.getRewardsAwardsInteractor = new GetRewardsAwardsInteractor(container.get('HRBenefitsClient'))
    this.getRewardPointsInteractor = new GetRewardPointsInteractor(container.get('HRBenefitsClient'))
    this.submitAwardsInteractor = new SubmitAwardsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setRecognizedRewards (data) {
    storedRecognizedAwards = data
    this.view.setRecognizedRewards(data)
  }

  submitAwards (selectedId, employeeName, employeeMessage) {
    if (!employeeName) {
      store.dispatch(NotifyActions.addnotify({
        message: 'You have to choose an employee first.',
        type: 'warning',
        duration: 2000
      }))
    }
    else {
      this.view.showLoading()
      this.submitAwardsInteractor.execute(SubmitAwardsParam(selectedId, ["16","17"], employeeMessage))
      .subscribe (data=> {
        this.view.showSuccessMessage(data)
        this.view.hideLoading()
      }, e => {
        this.view.hideLoading()
      })

    }
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
