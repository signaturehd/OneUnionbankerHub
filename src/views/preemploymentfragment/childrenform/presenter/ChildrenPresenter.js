import GetChildrenInteractor from '../../../../domain/interactor/preemployment/children/GetChildrenInteractor'
import PutChildrenInteractor from '../../../../domain/interactor/preemployment/children/PutChildrenInteractor'
import PostChildrenInteractor from '../../../../domain/interactor/preemployment/children/PostChildrenInteractor'
import RemoveChildrenInteractor from '../../../../domain/interactor/preemployment/children/RemoveChildrenInteractor'

import childrenParam from '../../../../domain/param/AddChildrenParam'

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
    this.getChildrenInteractor = new GetChildrenInteractor(container.get('HRBenefitsClient'))
    this.putChildrenInteractor = new PutChildrenInteractor(container.get('HRBenefitsClient'))
    this.removeChildrenInteractor = new RemoveChildrenInteractor(container.get('HRBenefitsClient'))
    this.postChildrenInteractor = new PostChildrenInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Remove Method */

  removeChildren (id) {
    this.view.showCircularLoader()
    this.removeChildrenInteractor.execute(id)
    .subscribe(data => {
      this.view.noticeResponseFunc(data)
      this.view.hideCircularLoader()
      this.getChildren()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  /* Get Method */

  getObjectData () {
    this.view.showGender(genderObject)
    this.view.showStatus(statusObject)
    this.view.showBloodType(bloodObjectParam)
  }

  getChildren () {
    this.getChildrenInteractor.execute()
    .subscribe(data => {
      this.view.showChildrenDetails(data)
    }, error => {
    })
  }

  putChildren (
    childrenId,
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
    defaultAttachmentsArray
  ) {

    this.view.showCircularLoader()
    this.putChildrenInteractor.execute(childrenParam(
      childrenId,
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
      defaultAttachmentsArray
    ))
    .subscribe(data => {
      this.view.noticeResponseFunc(data)
      this.view.hideCircularLoader()
      this.getChildren()
    }, erro => {
      this.view.hideCircularLoader()
    })
  }

  postChildren (
    childrenId,
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
    defaultAttachmentsArray
  ) {
    this.view.showCircularLoader()
    this.postChildrenInteractor.execute(childrenParam(
      childrenId,
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
      defaultAttachmentsArray
    ))
    .subscribe(data => {
      this.view.noticeResponseFunc(data)
      this.getChildren()
      this.view.hideCircularLoader()
    }, erro => {
      this.view.hideCircularLoader()
    })
  }
}
