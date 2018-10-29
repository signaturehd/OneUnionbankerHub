import GetSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/GetSpouseInteractor'
import PostSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/PostSpouseInteractor'
import PutSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/PutSpouseInteractor'
import RemoveSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/RemoveSpouseInteractor'
import addSpouseForm from '../../../../domain/param/AddSpouseParam'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'

import store from '../../../../store'
import { NotifyActions } from '../../../../actions'

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

export default class SpousePresenter {
  constructor (container) {
    this.getSpouseInteractor = new GetSpouseInteractor(container.get('HRBenefitsClient'))
    this.putSpouseInteractor = new PutSpouseInteractor(container.get('HRBenefitsClient'))
    this.postSpouseInteractor = new PostSpouseInteractor(container.get('HRBenefitsClient'))
    this.removeSpouseInteractor = new RemoveSpouseInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  removeSpouse (id) {
    this.view.showCircularLoader()
    this.removeSpouseInteractor.execute(id)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data, true)
      this.getSpouse()
      this.view.resetOption()
    }, error => {
        this.view.hideCircularLoader()
        this.view.reload()
    })
  }

  getObjectData () {
    this.view.showGender(genderObject)
    this.view.showStatus(statusObject)
    this.view.showBloodType(bloodObjectParam)
  }

  getOnboardingAttachments (attachments) {
    this.view.showCircularLoader()
    this.getOnboardingAttachmentsInteractor.execute(attachments)
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showAttachmentsFileView(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  getSpouse () {
    this.view.showCircularLoader()
    this.getSpouseInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showSpouseDetails(data, true)
      this.getSelectedAttachments(data)
    }, error => {
      this.view.showAttachmentsFileView(null)
      this.view.hideCircularLoader()
    })
  }


  getSelectedAttachments (array) {
    array && array.attachments.map((resp, key) => {
      this.getOnboardingAttachments(resp)
      }
    )
  }

  postSpouseForm (
    firstName,
    middleName,
    lastName,
    birthDate,
    occupation,
    contact,
    status,
    gender,
    bloodType,
    healthHospitalizationPlan,
    groupLifeInsurance,
    spouseId,
    spouseAttachmentsArray
  ) {

    let validateAttachments = false
    spouseAttachmentsArray && spouseAttachmentsArray.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    if(firstName === '') {
      this.view.firstNameErrorMessageFunc('First Name field is required')
    } else if(middleName === '') {
      this.view.middleNameErrorMessageFunc('Middle Name field is required')
    } else if(lastName === '') {
      this.view.lastNameErrorMessageFunc('Last Name field is required')
    } else if(occupation === '') {
      this.view.occupationErrorMessageFunc('Occupation field is required')
    } else if(contact === '') {
      this.view.contactNumberErrorMessageFunc('Contact Number field is required')
    } else if(gender === '') {
      this.view.genderErrorMessageFunc('Gender field is required')
    } else if(birthDate === '') {
      this.view.birthDateErrorMessageFunc('Date field is required')
    } else if (bloodType === '') {
      this.view.bloodTypeErrorMessageFunc('Please specify your blood type')
    } else if (status === '') {
      this.view.statusNameErrorMessageFunc('Please specify spouse status')
    } else if (!torFormData.length) {
       store.dispatch(NotifyActions.resetNotify())
       store.dispatch(NotifyActions.addNotify({
          title : 'Warning' ,
          message : 'Attachments is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (validateAttachments) {
      store.dispatch(NotifyActions.resetNotify())
      spouseAttachmentsArray && spouseAttachmentsArray.map(
        (attachment, key) => {
          if(!attachment.file) {
            store.dispatch(NotifyActions.addNotify({
               title : 'Warning' ,
               message : attachment.name + ' is required',
               type : 'warning',
               duration : 2000
             })
           )
          }
        }
      )
     } else {
       this.view.showCircularLoader()
       this.postSpouseInteractor.execute(addSpouseForm(
         firstName,
         middleName,
         lastName,
         birthDate,
         occupation,
         contact,
         status,
         gender,
         bloodType,
         healthHospitalizationPlan,
         groupLifeInsurance,
         spouseId,
         spouseAttachmentsArray
       ))
       .subscribe(data => {
         this.view.hideCircularLoader()
         this.view.noticeResponseFunc(data, true)
       }, error => {
         this.view.hideCircularLoader()
         this.view.reload()
       })
    }
  }

  putSpouseForm (
    firstName,
    middleName,
    lastName,
    birthDate,
    occupation,
    contact,
    status,
    gender,
    bloodType,
    healthHospitalizationPlan,
    groupLifeInsurance,
    spouseId,
    spouseAttachmentsArray
  ) {
    this.view.showCircularLoader()
    this.putSpouseInteractor.execute(addSpouseForm(
      firstName,
      middleName,
      lastName,
      birthDate,
      occupation,
      contact,
      status,
      gender,
      bloodType,
      healthHospitalizationPlan,
      groupLifeInsurance,
      spouseId,
      spouseAttachmentsArray
    ))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.getSpouse()
      this.view.noticeResponseFunc(data, true)
    }, error => {
      this.view.hideCircularLoader()
      this.view.reload()
    })
  }
}
