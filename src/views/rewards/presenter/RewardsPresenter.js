import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetEligibleInRewardsInteractor from '../../../domain/interactor/rewards/GetEligibleInRewardsInteractor'
import GetRewardsAwardsInteractor from '../../../domain/interactor/rewards/GetRewardsAwardsInteractor'
import SubmitAwardsInteractor from '../../../domain/interactor/rewards/SubmitAwardsInteractor'
import GetRewardPointsInteractor from '../../../domain/interactor/rewards/GetRewardPointsInteractor'
import SubmitAwardsParam from '../../../domain/param/SubmitAwardsParam'
import * as AwardsFunction from '../function/AwardsFunction'

let storedRecognizedAwards = [], storedEmployeeList = [], storedId = []

export default class RewardsPresenter {
  constructor (container) {
    this.getEligibleInRewardsInteractor = new GetEligibleInRewardsInteractor(container.get('HRBenefitsClient'))
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

  checkedId (id) {
    storedEmployeeList.map((resp) => {
      if(id.toString() === resp.id.toString()) {
        return false
      } else {
        return true
      }
    })
  }

  validateAlphabet (e) {
    const validate = AwardsFunction.checkedValidatedAlphabet(e)
    this.view.setValidateAlphabet(validate)
  }

  reconstructEmployeeList (data) {
    storedEmployeeList = data
    this.view.setEmployeeList(data)
  }

  getEmployeeList (data) {
    const updateEmployee = [...storedEmployeeList]

    data.directReports.map((resp) => {
      updateEmployee.push({
        id: resp.id,
        name: resp.name,
        isChecked: false,
      })
    })
    data.squads.map((resp) => {
      updateEmployee.push({
        id: resp.id,
        name: resp.name,
        isChecked: false,
      })
    })
    data.squadMembers.map((resp) => {
      updateEmployee.push({
        id: resp.id,
        name: resp.name,
        isChecked: false,
      })
    })
    storedEmployeeList = updateEmployee
    this.view.setEmployeeList(storedEmployeeList)
  }

  getEligibleInRewards (data) {
    storedEmployeeList = ''
    this.view.showLoadingCircular(true)
    this.getEligibleInRewardsInteractor.execute(data)
    .subscribe(data => {
      this.view.showLoadingCircular(false)
      this.getEmployeeList(data)
    }, error => {
      this.view.showLoadingCircular(false)
    })
  }

  submitAwards (selectedId, employeeName, employeeMessage) {
    if (!employeeName) {
      store.dispatch(NotifyActions.addNotify({
        title: 'Required',
        message: 'You have to choose an employee first.',
        type: 'warning',
        duration: 5000
      }))
    }
    else if (!employeeMessage) {
      store.dispatch(NotifyActions.addNotify({
        title: 'Required',
        message: 'You have to choose an employee first.',
        type: 'warning',
        duration: 5000
      }))
    }
    else {
      this.view.showLoading(true)
      this.submitAwardsInteractor.execute(SubmitAwardsParam(selectedId, storedId, employeeMessage))
      .subscribe (data=> {
        this.view.showSuccessMessage(data)
        this.view.showLoading(false)
        this.resetData()
      }, e => {
        this.view.showLoading(false)
      })

    }
  }

  resetData () {
    storedId = []
    storedEmployeeList = []
  }

  setEmployeeId (data) {
    const listId = [...storedId]
    data.map((resp) => {
      if(resp.isChecked === true) {
        listId.push(resp.id)
      }
    })
    storedId = listId
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
