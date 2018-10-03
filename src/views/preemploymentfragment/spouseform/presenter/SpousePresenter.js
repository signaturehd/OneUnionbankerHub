import GetSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/GetSpouseInteractor'
import PostSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/PostSpouseInteractor'
import PutSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/PutSpouseInteractor'
import addSpouseForm from '../../../../domain/param/AddSpouseParam'

import { RequiredValidation }  from '../../../../utils/validate'
import * as func from '../functions/SpouseFunctions'

import store from '../../../../store'
import { NotifyActions } from '../../../../actions'

export default class SpousePresenter {
  constructor (container) {
    this.getSpouseInteractor = new GetSpouseInteractor(container.get('HRBenefitsClient'))
    this.putSpouseInteractor = new PutSpouseInteractor(container.get('HRBenefitsClient'))
    this.postSpouseInteractor = new PostSpouseInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  validator (string) {
    return func.checkValidateInput(string)
  }

  getSpouse () {
    this.view.showCircularLoader()
    this.getSpouseInteractor.execute()
    .do(() => {
       const bloodObjectParam = [
        {
          id : 0,
          name: 'Type A+'
        },
        {
          id : 1,
          name : 'Type A-'
        },
        {
          id : 2,
          name : 'Type B+'
        },
        {
          id : 3,
          name : 'Type B-'
        },
        {
          id : 4,
          name : 'Type 0+'
        },
        {
          id : 5,
          name : 'Type 0-'
        },
        {
          id : 6,
          name : 'Type AB+'
        },
        {
          id : 7,
          name : 'Type AB-'
        }
      ]

      this.view.showBloodType(bloodObjectParam)
    })
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showSpouseDetails(data, true)
    }, error => {
      this.view.showSpouseDetails(error, false)
      this.view.hideCircularLoader()
    })
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
    spouseId
  ) {
    // if(!this.validator(firstName)) {
    //   this.view.firstNameErrorMessageFunc('First Name field is required')
    // } else if(!this.validator(middleName)) {
    //   this.view.middleNameErrorMessageFunc('Middle Name field is required')
    // } else if(!this.validator(lastName)) { 
    //   this.view.lastNameErrorMessageFunc('Last Name field is required')
    // } else if(!this.validator(occupation)) {
    //   this.view.occupationErrorMessageFunc('Occupation field is required')
    // } else {
    // }
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
      spouseId
    ))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data, true)
    }, error => {
      this.view.hideCircularLoader()
    })
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
    spouseId
  ) {
    console.log('test')
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
      spouseId
    ))
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.noticeResponseFunc(data, true)
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
