import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetEligibleInRewardsInteractor from '../../../domain/interactor/rewards/GetEligibleInRewardsInteractor'
import GetRewardsAwardsInteractor from '../../../domain/interactor/rewards/GetRewardsAwardsInteractor'
import SubmitAwardsInteractor from '../../../domain/interactor/rewards/SubmitAwardsInteractor'
import GetRewardPointsInteractor from '../../../domain/interactor/rewards/GetRewardPointsInteractor'
import SubmitAwardsParam from '../../../domain/param/SubmitAwardsParam'
import * as AwardsFunction from '../function/AwardsFunction'

let storedRecognizedAwards = [], storedEmployeeList = [], storedId = [], storedUpdatedList = []

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

  validateAlphabet (e) {
    const validate = AwardsFunction.checkedValidatedAlphabet(e)
    this.view.setValidateAlphabet(validate)
  }

  getAwardData() {
    const awardData  = [{
      id:2 ,
      title: 'Celebrate a DNA Moment',
      details: 'This award is given to individuals or teams who demonstrate behaviors aligned to the following:',
      styleName : 'myawards-image myawards-image-1',
      value : 'Values:',
      valuesDetails : 'Integrity, Magis, Ubuntu',
      principles : 'Distinguishing beliefs/principles:' ,
      principlesDetails : 'Forward-thinking, Agile, Open and Innovative',
    },
    {
      id: 1,
      title: 'U Are Recognized',
      details: 'Given to individuals or teams who demonstrated any component of the UnionBank DNA in their day-to-day task.',
      styleName : 'myawards-image myawards-image-2',
      value : null,
      valuesDetails : null,
      principles : null,
      principlesDetails : null,
    },
    {
      id: 3,
      title: 'Star Award',
      details: 'Short Star Award details',
      styleName : 'myawards-image myawards-image-3 ',
      value : null,
      valuesDetails : null,
      principles : null,
      principlesDetails : null,

    }]
    this.view.setAwardData(awardData)
  }

  getRedeemData() {
    const redeemData  = [{
      id: 0,
      staticImage: '',
      leftText: '10% OFF in Zalora',
      rightText: '13, 000 points',
    },
    {
      id: 1,
      staticImage: '',
      leftText: '20% OFF in Carola',
      rightText: '23, 000 points',
    },
    {
      id: 2,
      staticImage: '',
      leftText: '30% OFF in Valora',
      rightText: '33, 000 points',
    }]
    this.view.setRedeemData(redeemData)
  }

  getRewardList () {
    const rewardList = [{
      id: 2,
      styleName: 'myrewards-cards-1 myrewards-option-default font-weight-bold',
      title: 'Celebrate a DNA Moment',
      details: 'Short Description',
    },
    {
      id: 1,
      styleName: 'myrewards-cards-2 myrewards-option-default font-weight-bold',
      title: 'U Are Recognized',
      details: 'Short Description',
    },
    {
      id: 3,
      styleName: 'myrewards-cards-3 myrewards-option-default font-weight-bold',
      title: 'Star Award',
      details: 'Recognized a UnionBanker'
    }]
    this.view.setRewardList(rewardList)
  }

  setDeleteEmployeeToList (key, id, selectedId) {
    const newStoredUpdatedList = [...storedUpdatedList]
    const restoredStoredUpdatedList = [...storedEmployeeList]
    storedUpdatedList && storedUpdatedList.map((resp, idx) => {
      if(resp.id === id) {
        if(selectedId === 2) {
          newStoredUpdatedList.splice(idx, 1)
          restoredStoredUpdatedList.push({
            id: resp.id,
            name: resp.name,
            isChecked: !resp.isChecked ? true : false,
          })
        } else {
          newStoredUpdatedList.splice(idx, 1)
          restoredStoredUpdatedList.push({
            id: resp.id,
            name: resp.firstName +', '+ resp.lastName + ' '+ resp.middleName,
            isChecked: !resp.isChecked ? true : false,
            lastName: resp.lastName,
            firstName: resp.firstName,
            employeeNumber: resp.employeeNumber
          })
        }
      }
    })
    storedUpdatedList = newStoredUpdatedList
    storedEmployeeList = restoredStoredUpdatedList
    this.view.storedEmployeeList(storedUpdatedList)
    this.view.setEmployeeList(storedEmployeeList)
  }

  getEmployeeList (type, data) {
    if(type === 2) {
      const updateEmployee = [...storedEmployeeList]
      try{
        if(data.directReports.length !== 0) {
          data.directReports.map((resp) => {
            updateEmployee.push({
              id: resp.id,
              name: resp.name,
              isChecked: false,
            })
          })
        }

        if(data.squadMembers.length !== 0) {
          data.squadMembers.map((resp) => {
            updateEmployee.push({
              id: resp.id,
              name: resp.name,
              isChecked: false,
            })
          })
        }
        storedEmployeeList = updateEmployee
        this.view.setEmployeeList(storedEmployeeList)
      } catch (e) {
        console.log(e)
      }
    } else if (type === 1 || type === 3) {
      const updateEmployee = [...storedEmployeeList]
      try{
        if(data.list.length !== 0) {
          data.list.map((resp) => {
            updateEmployee.push({
              id: resp.id,
              name: resp.firstName + ', ' + resp.lastName + ' '+resp.middleName,
              isChecked: false,
              lastName: resp.lastName,
              firstName: resp.firstName,
              employeeNumber: resp.employeeNumber
            })
          })
        }
        storedEmployeeList = updateEmployee
        this.view.setEmployeeList(storedEmployeeList)
      } catch (e) {
        console.log(e)
      }
    }
  }

  receiveEmployeeListData (data, membersData, employeeList) {
    storedEmployeeList = []
    try {
      let updateList = [...storedEmployeeList]
      let selectedList = [...storedUpdatedList]
      const employeeId = data.id
      membersData && membersData.map((resp, key) => {
        if(employeeId === resp.id) {
          selectedList.push({
            id: resp.id,
            name: resp.name,
            isChecked : !resp.isChecked ? true : false
          })
        } else {
          updateList.push({
            id: resp.id,
            name: resp.name,
            isChecked : resp.isChecked
          })
        }
      })
      storedEmployeeList = updateList
      storedUpdatedList = selectedList
      this.view.setEmployeeList(storedEmployeeList)
      this.view.storedEmployeeList(selectedList)
      storedEmployeeList = []
    } catch (e) {
      console.log(e)
    }
  }

  getEligibleInRewards (type, data) {
    storedEmployeeList = []
    this.view.showLoadingCircular(true)
    this.getEligibleInRewardsInteractor.execute(type, data)
    .subscribe(data => {
      this.view.showLoadingCircular(false)
      this.getEmployeeList(type, data)
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
    console.log(data)
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
