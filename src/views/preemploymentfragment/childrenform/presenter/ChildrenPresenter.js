import GetChildrenInteractor from '../../../../domain/interactor/preemployment/children/GetChildrenInteractor'
import PutChildrenInteractor from '../../../../domain/interactor/preemployment/children/PutChildrenInteractor'
import PostChildrenInteractor from '../../../../domain/interactor/preemployment/children/PostChildrenInteractor'
import RemoveChildrenInteractor from '../../../../domain/interactor/preemployment/children/RemoveChildrenInteractor'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'

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
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Retrieve image from file server */

  getOnboardingAttachments (attachments) {
    this.view.showDocumentLoader()
    this.getOnboardingAttachmentsInteractor.execute(attachments)
    .subscribe(data => {
      this.view.hideDocumentLoader()
      this.view.showAttachmentsFileView(data)
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  /* Remove Method */

  removeChildren (id) {
    this.view.showCircularLoader()
    this.removeChildrenInteractor.execute(id)
    .subscribe(data => {
      this.view.noticeResponseFunc(data)
      this.view.hideCircularLoader()
      this.view.defaultValueForm()
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
    this.view.showCircularLoader()
    this.getChildrenInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showChildrenDetails(data)
      this.view.defaultValueForm()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  /* Load file url */

  checkAttachments (file) {
    file.attachments.map((resp) =>
      this.getOnboardingAttachments(resp)
    )
  }

  putChildren (
    childrenId,
    firstName,
    lastName,
    middleName,
    genderId,
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
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data)
      this.view.defaultValueForm()
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
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data)
      this.getChildren()
      this.view.defaultValueForm()
    }, erro => {
      this.view.hideCircularLoader()
    })
  }
}
