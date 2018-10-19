import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import GetParentInteractor from '../../../../domain/interactor/preemployment/parent/GetParentInteractor'
import UpdateParentInteractor from '../../../../domain/interactor/preemployment/parent/UpdateParentInteractor'
import AddParentInteractor from '../../../../domain/interactor/preemployment/parent/AddParentInteractor'

import GetSiblingsInteractor from '../../../../domain/interactor/preemployment/siblings/GetSiblingsInteractor'
import UpdateSiblingsInteractor from '../../../../domain/interactor/preemployment/siblings/UpdateSiblingsInteractor'
import AddSiblingsInteractor from '../../../../domain/interactor/preemployment/siblings/AddSiblingsInteractor'

import parentParam from '../../../../domain/param/ParentParam'


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
 name : 'Deceased'
}, {
 id : 1,
 name : 'Living'
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
  }

  setView (view) {
    this.view = view
  }

  /* Get Method */

  getObjectData () {
    this.view.showGender(genderObject)
    this.view.showStatus(statusObject)
    this.view.showBloodType(bloodObjectParam)
  }

  getParents () {
    this.view.showCircularLoader()
    this.getParentInteractor.execute()
    .subscribe(data => {
      this.view.showParentDetails(data)
      this.view.hideCircularLoader()
    }, erro => {
      this.view.hideCircularLoader()
    })
  }

  getSiblings () {
    this.view.showCircularLoader()
    this.getSiblingsInteractor.execute()
    .subscribe(data => {
      this.view.showSiblingDetails(data)
      this.view.hideCircularLoader()
    }, erro => {
      this.view.hideCircularLoader()
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
    this.view.showCircularLoader()
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
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data)
      this.view.resetValue()
      this.getParents()
    }, error => {
      this.view.hideCircularLoader()
    })
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
    this.view.showCircularLoader()
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
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data)
      this.getSiblings()
      this.view.resetValue()
    }, error => {
      this.view.hideCircularLoader()
    })
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
    this.view.showCircularLoader()
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
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data)
      this.getSiblings()
      this.view.resetValue()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  addParentForm (
    parentId,
    firstName,
    lastName,
    middleName,
    gender,
    relationship,
    statusId,
    contact,
    occupationName,
    birthDate,
    bloodTypeName,
    hospitalization,
    groupPlan) {
    this.view.showCircularLoader()
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
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data)
      this.getSiblings()
      this.view.resetValue()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
