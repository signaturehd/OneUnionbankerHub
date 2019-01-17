import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetEligibleInRewardsInteractor from '../../../domain/interactor/rewards/GetEligibleInRewardsInteractor'
import GetRewardsAwardsInteractor from '../../../domain/interactor/rewards/GetRewardsAwardsInteractor'
import SubmitAwardsInteractor from '../../../domain/interactor/rewards/SubmitAwardsInteractor'
import GetRewardPointsInteractor from '../../../domain/interactor/rewards/GetRewardPointsInteractor'
import SubmitAwardsParam from '../../../domain/param/SubmitAwardsParam'

let storedRecognizedAwards = [], storedEmployeeList = []

let mockData = {

"squads":
[

{

    "id": 63,

    "name": "Squad Name 1"

},

    {

    "id": 64,
    "name": "Squad Name 2"
}

],
"squadMembers":
[

{

    "id": 26,

    "name": 'Juan Dela Cruz'
    },

{

    "id": 25,
    "name": 'Maria Reyes 1'
    }
],
"directReports":
[

    {

    "id": 23,

    "name": 'Juan Dela Cruz'
    },

{

    "id": 24,
    "name": 'Maria Reyes'
    }
]
}
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
      if(id.toString() !== resp.id.toString()) {
        return true
      } else {
        return false
      }
    })
  }

  getEmployeeList (data) {
    const updateEmployee = storedEmployeeList

    data.directReports.map((resp) => {
      if(this.checkedId(resp.id)) {
        updateEmployee.push({
          id: resp.id,
          name: resp.name,
        })
      }
    })
    data.squads.map((resp) => {
      if(this.checkedId(resp.id)) {
        updateEmployee.push({
          id: resp.id,
          name: resp.name,
        })
      }
    })
    data.squadMembers.map((resp) => {
      updateEmployee.push({
        id: resp.id,
        name: resp.name,
      })
    })
    storedEmployeeList = updateEmployee

    console.log(storedEmployeeList)
    this.view.setEmployeeList(storedEmployeeList)
  }

  getEligibleInRewards (data) {
    this.getEmployeeList(mockData)

    this.getEligibleInRewardsInteractor.execute(data)
    .subscribe(data => {
      this.getEmployeeList(data)
    }, error => {
    })
  }

  submitAwards (selectedId, employeeName, employeeMessage) {
    if (!employeeName) {
      store.dispatch(NotifyActions.addNotify({
        title: 'Celebrate a DNA Moment',
        message: 'You have to choose an employee first.',
        type: 'warning',
        duration: 5000
      }))
    }
    else {
      this.view.showLoading(true)
      this.submitAwardsInteractor.execute(SubmitAwardsParam(selectedId, ["16","17"], employeeMessage))
      .subscribe (data=> {
        this.view.showSuccessMessage(data)
        this.view.showLoading(false)
      }, e => {
        this.view.showLoading(false)
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
