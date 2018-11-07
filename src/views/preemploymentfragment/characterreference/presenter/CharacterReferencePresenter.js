import { NotifyActions } from '../../../../actions'
import store from '../../../../store'

import PostCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/PostCharacterReferenceInteractor'
import PutCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/PutCharacterReferenceInteractor'
import DeleteCharacterReferenceInteractor from '../../../../domain/interactor/preemployment/characterreference/DeleteCharacterReferenceInteractor'
import GetCharacterReferenceFormInteractor from '../../../../domain/interactor/preemployment/characterreference/GetCharacterReferenceFormInteractor'
import GetOnboardingAttachmentsInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingAttachmentsInteractor'
import GetOnboardingPdfInteractor from '../../../../domain/interactor/preemployment/preemployment/GetOnboardingPdfInteractor'
import genericParam from '../../../../domain/param/PostCharacterReferenceParam'

export default class CharacterReferencePresenter {
  constructor (container) {
    this.postCharacterReferenceInteractor = new PostCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingAttachmentsInteractor = new GetOnboardingAttachmentsInteractor(container.get('HRBenefitsClient'))
    this.getCharacterReferenceFormInteractor = new GetCharacterReferenceFormInteractor(container.get('HRBenefitsClient'))
    this.putCharacterReferenceInteractor = new PutCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.getOnboardingPdfInteractor = new GetOnboardingPdfInteractor(container.get('HRBenefitsClient'))
    this.deleteCharacterReferenceInteractor = new DeleteCharacterReferenceInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  /* Get Method */

  getOnBoardingAttachments (link) {
    this.getOnboardingAttachmentsInteractor.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
      this.view.hideDocumentLoader()
    }, error => {
      this.view.hideDocumentLoader()
      this.view.showPdfFileView('')
      store.dispatch(NotifyActions.resetNotify())
    })
  }

  getCharacterReferenceForm () {
    this.getCharacterReferenceFormInteractor.execute()
    .subscribe(data => {
      this.view.showPdfFileUrl(data)
    }, error =>{
      this.view.hideDocumentLoader()
    })
  }

  deleteCharacterReference (id) {
    this.view.showCircularLoader()
    this.deleteCharacterReferenceInteractor.execute(id)
    .subscribe(data => {
      this.view.noticeResponseModal(data)
      this.view.resetMode()
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  postCharacterReference (
    id,
    name,
    relationship,
    numberOfYearsKnown,
    contactNumber,
    company,
    email,
    address,
    occupation
  ) {
    let emailRegex = /[\w]+@[\w]+((\.)[a-z0-9]+)+/g
    if(name === '') {
      this.view.setFullNameErrorMessage('Full Name is required')
    } else if (occupation === 0) {
      this.view.setOccupationNameErrorMessage('Please specify your work status (eg. Employed, Unemployed, Self-Employed)')
    } else if (occupation === 2 || occupation === 1) {
      if (company.company.position === '') {
          this.view.setPositionErrorMessage('Position is required')
      } else if (company.company.name === '') {
        this.view.setCompanyNameErrorMessage('Company name is required')
      } else if (company.company.departmentFloor === '') {
        this.view.setFloorErrorMessage('Floor is required')
      } else if (company.company.buildingName === '') {
        this.view.setBuildingErrorMessage('Building Name is required')
      } else if (company.company.street === '') {
        this.view.setStreetErrorMessage('Street is required')
      } else if (company.company.city === '') {
        this.view.setCityErrorMessage('City is required')
      } else if (company.company.town === '') {
        this.view.setTownErrorMessage('Town is required')
      } else if (company.company.district === '') {
        this.view.setDistrictErrorMessage('District is required')
      } else if (company.company.baranggay === '') {
        this.setBarangayErrorMessage('Barangay is required')
      } else if (email === '') {
        this.view.setEmailErrorMessage('Email is required (e.g 1uhub@test.com etc.)')
      } else if (!emailRegex.test(email)) {
        this.view.setEmailErrorMessage('Check your email format.')
      } else if (contactNumber === '') {
        this.view.setEmailErrorMessage('')
        this.view.setContactNumberErrorMessage('Contact Number is required and must atleast 11 digit')
      } else if (relationship === '') {
        this.view.setRelationshipErrorMessage('Relationship is required')
      } else if (numberOfYearsKnown === '') {
        this.view.setYearsKnown('Please specify his/her period of work experience')
      } else {

        this.view.resetMode()
        this.view.showCircularLoader()
        this.postCharacterReferenceInteractor.execute(genericParam(
          id,
          name,
          relationship,
          numberOfYearsKnown,
          contactNumber,
          company,
          email,
          address,
          occupation
        ))
        .subscribe(data => {
          this.view.noticeResponseModal(data)
          this.view.hideCircularLoader()
        }, error => {
        this.view.hideCircularLoader()
        })
      }
    } else if (occupation === 3) {
      if (address === '') {
        this.view.setAddressErrorMessage('Address is required')
      } else if (email === '') {
        this.view.setEmailErrorMessage('Email is required (e.g 1uhub@test.com etc.)')
      } else if (!emailRegex.test(email)) {
        this.view.setEmailErrorMessage('Check your email format.')
      } else if (contactNumber === '') {
        this.view.setEmailErrorMessage('')
        this.view.setContactNumberErrorMessage('Contact Number is required and must atleast 11 digit')
      } else if (relationship === '') {
        this.view.setRelationshipErrorMessage('Relationship is required')
      } else if (numberOfYearsKnown === '') {
        this.view.setYearsKnown('Please specify his/her period of work experience')
      } else {

        this.view.resetMode()
        this.view.showCircularLoader()
        this.postCharacterReferenceInteractor.execute(genericParam(
          id,
          name,
          relationship,
          numberOfYearsKnown,
          contactNumber,
          company,
          email,
          address,
          occupation
        ))
        .subscribe(data => {
          this.view.noticeResponseModal(data)
          this.view.hideCircularLoader()
        }, error => {
        this.view.hideCircularLoader()
        })
      }
    }
  }

  putCharacterReference (
    id,
    name,
    relationship,
    numberOfYearsKnown,
    contactNumber,
    company,
    email,
    address,
    occupation
  ) {
    let emailRegex = /[\w]+@[\w]+((\.)[a-z0-9]+)+/g

    if(name === '') {
      this.view.setFullNameErrorMessage('Full Name is required')
    } else if (occupation === 0) {
      this.view.setOccupationNameErrorMessage('Please specify your work status (eg. Employed, Unemployed, Self-Employed)')
    } else if (occupation === 2 || occupation === 1) {
      if (company.company.position === '') {
          this.view.setPositionErrorMessage('Position is required')
      } else if (company.company.name === '') {
        this.view.setCompanyNameErrorMessage('Company name is required')
      } else if (company.company.departmentFloor === '') {
        this.view.setFloorErrorMessage('Floor is required')
      } else if (company.company.buildingName === '') {
        this.view.setBuildingErrorMessage('Building Name is required')
      } else if (company.company.street === '') {
        this.view.setStreetErrorMessage('Street is required')
      } else if (company.company.city === '') {
        this.view.setCityErrorMessage('City is required')
      } else if (company.company.town === '') {
        this.view.setTownErrorMessage('Town is required')
      } else if (company.company.district === '') {
        this.view.setDistrictErrorMessage('District is required')
      } else if (company.company.baranggay === '') {
        this.setBarangayErrorMessage('Barangay is required')
      } else if (email === '') {
        this.view.setEmailErrorMessage('Email is required (e.g 1uhub@test.com etc.)')
      } else if (!emailRegex.test(email)) {
        this.view.setEmailErrorMessage('Check your email format.')
      } else if (contactNumber === '') {
        this.view.setContactNumberErrorMessage('Contact Number is required and must atleast 11 digit')
      } else if (relationship === '') {
        this.view.setRelationshipErrorMessage('Relationship is required')
      } else if (numberOfYearsKnown === '') {
        this.view.setYearsKnown('Please specify his/her period of work experience')
      } else {
        this.view.resetMode()
        this.view.showCircularLoader()
        this.putCharacterReferenceInteractor.execute(genericParam(
          id,
          name,
          relationship,
          numberOfYearsKnown,
          contactNumber,
          company,
          email,
          address,
          occupation
        ))
        .subscribe(data => {
          this.view.noticeResponseModal(data)
          this.view.hideCircularLoader()
        }, error => {
          this.view.hideCircularLoader()
        })
      }
    } else if (occupation === 3) {
      if (address === '') {
        this.view.setAddressErrorMessage('Address is required')
      } else if (email === '') {
        this.view.setEmailErrorMessage('Email is required (e.g 1uhub@test.com etc.)')
      } else if (!emailRegex.test(email)) {
        this.view.setEmailErrorMessage('Check your email format.')
      } else if (contactNumber === '') {
        this.view.setContactNumberErrorMessage('Contact Number is required and must atleast 11 digit')
      } else if (relationship === '') {
        this.view.setRelationshipErrorMessage('Relationship is required')
      } else if (numberOfYearsKnown === '') {
        this.view.setYearsKnown('Please specify his/her period of work experience')
      } else {

        this.view.resetMode()
        this.view.showCircularLoader()
        this.putCharacterReferenceInteractor.execute(genericParam(
          id,
          name,
          relationship,
          numberOfYearsKnown,
          contactNumber,
          company,
          email,
          address,
          occupation
        ))
        .subscribe(data => {
          this.view.noticeResponseModal(data)
          this.view.hideCircularLoader()
        }, error => {
          this.view.hideCircularLoader()
        })
      }
    }
  }
}
