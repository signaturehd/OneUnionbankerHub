import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetParentInteractor from '../../../../domain/interactor/preemployment/parent/GetParentInteractor'
import UpdateParentInteractor from '../../../../domain/interactor/preemployment/parent/UpdateParentInteractor'
import AddParentInteractor from '../../../../domain/interactor/preemployment/parent/AddParentInteractor'
import RemoveParentsInteractor from '../../../../domain/interactor/preemployment/parent/RemoveParentInteractor'

import GetSiblingsInteractor from '../../../../domain/interactor/preemployment/siblings/GetSiblingsInteractor'
import UpdateSiblingsInteractor from '../../../../domain/interactor/preemployment/siblings/UpdateSiblingsInteractor'
import AddSiblingsInteractor from '../../../../domain/interactor/preemployment/siblings/AddSiblingsInteractor'
import RemoveSiblingsInteractor from '../../../../domain/interactor/preemployment/siblings/RemoveSiblingsInteractor'

import parentParam from '../../../../domain/param/ParentParam'

let parentRelationshipStatusObject = [
  {
    id : 0,
    name : 'Father'
  },
  {
    id : 1,
    name : 'Mother'
  },
]

let siblingsRelationshipStatusObject = [
   {
    id : 0,
    name : 'Brother'
  },
  {
    id : 1,
    name : 'Sister'
  },
]

let bloodObjectParam = [
 {
   id : 0,
   name: 'A+'
 },
 {
   id : 1,
   name : 'A-'
 },
 {
   id : 2,
   name : 'B+'
 },
 {
   id : 3,
   name : 'B-'
 },
 {
   id : 4,
   name : '0+'
 },
 {
   id : 5,
   name : '0-'
 },
 {
   id : 6,
   name : 'AB+'
 },
 {
   id : 7,
   name : 'AB-'
 }
]

let statusObject = [{
 id: 0,
 name : 'Living'
}, {
 id : 1,
 name : 'Deceased'
}]

let genderObject = [{
 id : 0,
 name : 'Male'
},{
 id: 1,
 name : 'Female'
}]

export default class ChildrenPresenter {
  constructor (container) {
    this.getParentInteractor = new GetParentInteractor(container.get('HRBenefitsClient'))
    this.updateParentInteractor = new UpdateParentInteractor(container.get('HRBenefitsClient'))
    this.addParentInteractor = new AddParentInteractor(container.get('HRBenefitsClient'))
    this.getSiblingsInteractor = new GetSiblingsInteractor(container.get('HRBenefitsClient'))
    this.updateSiblingsInteractor = new UpdateSiblingsInteractor(container.get('HRBenefitsClient'))
    this.addSiblingsInteractor = new AddSiblingsInteractor(container.get('HRBenefitsClient'))
    this.removeParentsInteractor = new RemoveParentsInteractor(container.get('HRBenefitsClient'))
    this.removeSiblingsInteractor = new RemoveSiblingsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Get Method */

  getObjectData () {
    this.view.showParentRelationship(parentRelationshipStatusObject)
    this.view.showSiblingRelationship(siblingsRelationshipStatusObject)
    this.view.showGender(genderObject)
    this.view.showStatus(statusObject)
    this.view.showBloodType(bloodObjectParam)
  }

  getParents () {
    store.dispatch(NotifyActions.resetNotify())
    this.view.showParentCircularLoader()
    this.getParentInteractor.execute()
    .subscribe(data => {
      this.view.showParentDetails(data)
      this.view.hideParentCircularLoader()
    }, erro => {
      this.view.hideParentCircularLoader()
    })
  }

  getSiblings () {
    this.view.showSiblingsCircularLoader()
    this.getSiblingsInteractor.execute()
    .subscribe(data => {
      this.view.showSiblingDetails(data)
      this.view.hideSiblingsCircularLoader()
    }, erro => {
      this.view.hideSiblingsCircularLoader()
    })
  }

  /* Delete Method */

  removeSiblings (id) {
    this.view.showSiblingsCircularLoader()
    this.removeSiblingsInteractor.execute(id)
    .subscribe(data => {
      this.view.hideSiblingsCircularLoader()
      this.view.noticeResponseFunc(data)
      this.view.resetValue()
      this.getSiblings()
    }, error => {
      this.view.hideSiblingsCircularLoader()
    })
  }

  removeParents (id) {
    this.view.showParentCircularLoader()
    this.removeParentsInteractor.execute(id)
    .subscribe(data => {
      this.view.hideParentCircularLoader()
      this.view.noticeResponseFunc(data)
      this.view.resetValue()
      this.getParents()
    }, error => {
      this.view.hideParentCircularLoader()
    })
  }

  /* Update Method */

  updateParentForm (
    parentId,
    firstName,
    lastName,
    middleName,
    genderId,
    relationship,
    statusId,
    contact,
    occupationName,
    birthDate,
    bloodTypeName,
    hospitalization,
    groupPlan,
  ) {
    if(firstName === '') {
      this.view.showFirsNameErrorMessage('First Name is required')
    } else if (middleName === '') {
      this.view.showMiddleNameErrorMessage('Middle Name is required')
    } else if (lastName === '') {
      this.view.showLastNameErrorMessage('Last Name is required')
    } else if (occupationName === '') {
      this.view.showOccupationErrorMessage('Occupation field is required')
    } else if (contact === '') {
      this.view.showContactErrorMessage('Contact # is required')
    } else if (relationship === '') {
      this.view.showRelationshipErrorMessage('Relationship field is required')
    } else if (statusId === '') {
      this.view.showStatusErrorMessage('Status is required')
    } else if (bloodTypeName === '') {
      this.view.showBloodTypeErrorMessage('Blood Type is required')
    } else {
      this.view.setModal()
      this.view.showParentCircularLoader()
      this.updateParentInteractor.execute(parentParam(
        parentId,
        firstName,
        lastName,
        middleName,
        genderId,
        relationship,
        statusId,
        contact,
        occupationName,
        birthDate,
        bloodTypeName,
        hospitalization,
        groupPlan,
      ))
      .subscribe(data => {
        this.view.hideParentCircularLoader()
        this.view.noticeResponseFunc(data)
        this.view.resetValue()
        this.getParents()
      }, error => {
        this.view.resetValue()
        this.view.hideParentCircularLoader()
      })
    }
  }

  updateSiblingsForm (
    parentId,
    firstName,
    lastName,
    middleName,
    genderId,
    relationship,
    statusId,
    contact,
    occupationName,
    birthDate,
    bloodTypeName,
    hospitalization,
    groupPlan) {
    if(firstName === '') {
      this.view.showFirsNameErrorMessage('First Name is required')
    } else if (middleName === '') {
      this.view.showMiddleNameErrorMessage('Middle Name is required')
    } else if (lastName === '') {
      this.view.showLastNameErrorMessage('Last Name is required')
    } else if (occupationName === '') {
      this.view.showOccupationErrorMessage('Occupation field is required')
    } else if (contact === '') {
      this.view.showContactErrorMessage('Contact # is required')
    } else if (relationship === '') {
      this.view.showRelationshipErrorMessage('Relationship field is required')
    } else if (statusId === '') {
      this.view.showStatusErrorMessage('Status is required')
    } else if (bloodTypeName === '') {
      this.view.showBloodTypeErrorMessage('Blood Type is required')
    }  else {
      this.view.setModal()
      this.view.showSiblingsCircularLoader()
      this.updateSiblingsInteractor.execute(parentParam(
        parentId,
        firstName,
        lastName,
        middleName,
        genderId,
        relationship,
        statusId,
        contact,
        occupationName,
        birthDate,
        bloodTypeName,
        hospitalization,
        groupPlan,
      ))
      .subscribe(data => {
        this.view.hideSiblingsCircularLoader()
        this.view.noticeResponseFunc(data)
        this.getSiblings()
        this.view.resetValue()
      }, error => {
        this.view.resetValue()
        this.view.hideSiblingsCircularLoader()
      })
    }
  }

  /* Post Method */

  addSiblingsForm (
    parentId,
    firstName,
    lastName,
    middleName,
    genderId,
    relationship,
    statusId,
    contact,
    occupationName,
    birthDate,
    bloodTypeName,
    hospitalization,
    groupPlan) {
    if(firstName === '') {
      this.view.showFirsNameErrorMessage('First Name is required')
    } else if (middleName === '') {
      this.view.showMiddleNameErrorMessage('Middle Name is required')
    } else if (lastName === '') {
      this.view.showLastNameErrorMessage('Last Name is required')
    } else if (occupationName === '') {
      this.view.showOccupationErrorMessage('Occupation field is required')
    } else if (contact === '') {
      this.view.showContactErrorMessage('Contact # is required')
    } else if (relationship === '') {
      this.view.showRelationshipErrorMessage('Relationship field is required')
    } else if (statusId === '') {
      this.view.showStatusErrorMessage('Status is required')
    } else if (genderId === '') {
      this.view.showGenderErrorMessage('Gender is required')
    } else if (bloodTypeName === '') {
      this.view.showBloodTypeErrorMessage('Blood Type is required')
    } else {
      this.view.setModal()
      this.view.showSiblingsCircularLoader()
      this.addSiblingsInteractor.execute(parentParam(
        parentId,
        firstName,
        lastName,
        middleName,
        genderId,
        relationship,
        statusId,
        contact,
        occupationName,
        birthDate,
        bloodTypeName,
        hospitalization,
        groupPlan,
      ))
      .subscribe(data => {
        this.view.hideSiblingsCircularLoader()
        this.view.noticeResponseFunc(data)
        this.getSiblings()
        this.view.resetValue()
      }, error => {
        this.view.hideSiblingsCircularLoader()
      })
    }
  }

  addParentForm (
    parentId,
    firstName,
    lastName,
    middleName,
    genderId,
    relationship,
    statusId,
    contact,
    occupationName,
    birthDate,
    bloodTypeName,
    hospitalization,
    groupPlan) {
    if(firstName === '') {
      this.view.showFirsNameErrorMessage('First Name is required')
    } else if (middleName === '') {
      this.view.showMiddleNameErrorMessage('Middle Name is required')
    } else if (lastName === '') {
      this.view.showLastNameErrorMessage('Last Name is required')
    } else if (occupationName === '') {
      this.view.showOccupationErrorMessage('Occupation field is required')
    } else if (contact === '') {
      this.view.showContactErrorMessage('Contact # is required')
    } else if (relationship === '') {
      this.view.showRelationshipErrorMessage('Relationship field is required')
    } else if (statusId === '') {
      this.view.showStatusErrorMessage('Status is required')
    } else if (genderId === '') {
      this.view.showGenderErrorMessage('Gender is required')
    } else if (bloodTypeName === '') {
      this.view.showBloodTypeErrorMessage('Blood Type is required')
    } else {
      this.view.setModal()
      this.view.showParentCircularLoader()
      this.addParentInteractor.execute(parentParam(
        parentId,
        firstName,
        lastName,
        middleName,
        genderId,
        relationship,
        statusId,
        contact,
        occupationName,
        birthDate,
        bloodTypeName,
        hospitalization,
        groupPlan,
      ))
      .subscribe(data => {
        this.view.hideParentCircularLoader()
        this.view.noticeResponseFunc(data)
        this.getParents()
        this.view.resetValue()
      }, error => {
        this.view.hideParentCircularLoader()
      })
    }
    }
}
