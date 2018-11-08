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
 id: 1,
 name : 'Deceased'
}, {
 id : 0,
 name : 'Living'
}]

let genderObject = [{
 id : 0,
 name : 'Male'
},{
 id: 1,
 name : 'Female'
}]

// Convert base64 to file object
function urltoFile(url, filename, fileType){
  return (fetch(url)
   .then((resp) => {return resp.arrayBuffer()})
   .then((base64) => {return new File([base64], filename, {type:fileType})})
  )
}

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
      const name = data && this.generateRandomName(data)
      const type = data && this.checkFileType(data)
      urltoFile(data, name, type)
      .then((file) => {
        this.view.showRetrieveAttachments(file, name, data)
      })
      this.view.hideDocumentLoader()
      this.view.showAttachmentsFileView(data)
    }, error => {
      this.view.hideDocumentLoader()
    })
  }

  /* Attachments Get Type and Filename */

  checkFileType (file) {
    const str = file.split(';')
    const strImage = str[0].replace(/^data:/, '')

    return strImage
  }

  generateRandomName (resp) {
    const name = Math.random().toString(36).substring(2, 18)
    let fileExtension = this.checkFileType(resp).split('/')
    fileExtension = fileExtension[fileExtension.length - 1]
    return name + '.' + fileExtension
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
    defaultAttachmentsArray,
    attachmentFileObject
  ) {
    let validateAttachments = false
    defaultAttachmentsArray && defaultAttachmentsArray.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )
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
      validateAttachments ? defaultAttachmentsArray : attachmentFileObject
    ))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data)
      this.view.defaultValueForm()
      this.getChildren()
    }, error => {
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
