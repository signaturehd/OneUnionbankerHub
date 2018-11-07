import { NotifyActions } from '../../../actions'
import store from '../../../store'
import preEmploymentFormInteractor from '../../../domain/interactor/preemployment/preemployment/GetPreEmploymentFormInteractor'
import GetAffirmationStatusInteractor from '../../../domain/interactor/preemployment/affirmation/GetAffirmationStatusInteractor'
import GetCharacterReferenceInteractor from '../../../domain/interactor/preemployment/characterreference/GetCharacterReferenceInteractor'
import EmployeeSchoolInteractor from '../../../domain/interactor/preemployment/education/GetEmployeeSchoolInteractor'
import GetParentInteractor from '../../../domain/interactor/preemployment/parent/GetParentInteractor'
import GetPreEmploymentMessageInteractor from '../../../domain/interactor/preemployment/preemployment/GetPreEmploymentMessageInteractor'
import PostPreEmploymentMessageInteractor from '../../../domain/interactor/preemployment/preemployment/PostPreEmploymentMessageInteractor'
import GetMedicalAppointmentInteractor from '../../../domain/interactor/preemployment/medicalappointment/GetMedicalAppointmentInteractor'

let storedCharacterReference = []
let storedEducation = []
let requiredDocuments = []
let storedParent = []
let storedMedical = []

let preEmploymentList = [
  {
    id : 0,
    name : 'Pre Employment Documents Affirmation'
  },
  {
    id : 1,
    name : 'Financial Obligations'
  },
  {
    id : 2,
    name : 'Biographical Data'
  },
  {
    id : 3,
    name : 'Birth Certificate'
  },
  {
    id : 4,
    name : 'Education Background'
  },
  {
    id : 5,
    name : 'Work Experience'
  },
  {
    id : 6,
    name : 'Character Reference'
  },
  {
    id : 7,
    name : 'NBI Clearance'
  },
  {
    id : 8,
    name : 'Authorization Background Check'
  },
  {
    id : 9,
    name : 'Banko Sentral of the Philippines(BSP) Certification'
  },
  {
    id : 10,
    name : 'Social Security System'
  },
  {
    id : 10,
    name : 'Tax Identification Number(TIN)'
  },
  {
    id : 12,
    name : 'Bureau of Internal Revenue(BIR) Form'
  },
  {
    id : 13,
    name : 'Philippine Health Insurance(PhilHealth) Form'
  },
  {
    id : 14,
    name : 'Pag-IBIG Form'
  },
  {
    id : 15,
    name : 'Pag-IBIG Loan Form'
  },
  {
    id : 16,
    name : 'Personnel Signature'
  },
  {
    id : 17,
    name : 'Spouse Form'
  },
  {
    id : 18,
    name : 'Child Form'
  },
  {
    id : 19,
    name : 'Parent/ Siblings Form'
  },
  {
    id : 20,
    name : 'Medical Appointment'
  },
]

export default class PreEmploymentPresenter {
  constructor (container) {
    this.preEmploymentFormInteractor = new preEmploymentFormInteractor(container.get('HRBenefitsClient'))
    this.getAffirmationStatusInteractor = new GetAffirmationStatusInteractor(container.get('HRBenefitsClient'))
    this.getCharacterReferenceInteractor = new GetCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.getParentInteractor = new GetParentInteractor(container.get('HRBenefitsClient'))
    this.employeeSchoolInteractor = new EmployeeSchoolInteractor(container.get('HRBenefitsClient'))
    this.getPreEmploymentMessageInteractor = new GetPreEmploymentMessageInteractor(container.get('HRBenefitsClient'))
    this.postPreEmploymentMessageInteractor = new PostPreEmploymentMessageInteractor(container.get('HRBenefitsClient'))
    this.getMedicalAppointmentInteractor = new GetMedicalAppointmentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setCharacterReferenceValue(data) {
    storedCharacterReference = data
  }

  setEducationReferenceValue(data) {
    storedEducation = data
  }

  setDocumentsValue(data) {
    requiredDocuments = data
  }

  setParentValue(data){
    storedParent = data
  }

  setMedical(data) {
    storedMedical = data
  }

  getPreEmploymentMessageStatus () {
    this.getPreEmploymentMessageInteractor.execute()
    .subscribe(data => {
      this.view.showMessageStatus(data)
    }, error => {
      store.dispatch(NotifyActions.resetNotify())
    })
  }

  postPreEmploymentMessageStatus (status) {
    this.postPreEmploymentMessageInteractor.execute(status)
    .subscribe(data => {
      this.view.noticeReponseModal(data)
    }, error => {
      store.dispatch(NotifyActions.resetNotify())
    })
  }

  getMedicalAppointment () {
    this.getMedicalAppointmentInteractor.execute()
    .subscribe(data => {
      this.setMedical(data)
    }, error => {
    })
  }

  getEmployeeSchool () {
    store.dispatch(NotifyActions.resetNotify())
    this.employeeSchoolInteractor.execute()
    .subscribe(
      data => {
        this.setEducationReferenceValue(data)
        this.view.showEducationMap(data)
      },
      error => {
        store.dispatch(NotifyActions.resetNotify())
        this.setEducationReferenceValue([])
        this.view.showEducationMap([])
     }
    )
  }

  getParents () {
    store.dispatch(NotifyActions.resetNotify())
    this.getParentInteractor.execute()
    .subscribe(data => {
      this.setParentValue(data)
    }, error => {
      store.dispatch(NotifyActions.resetNotify())
    })
  }

  getPreEmploymentForm () {
    this.view.showCircularLoader()
    this.preEmploymentFormInteractor.execute()
    .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.checkedPreEmploymentForm(data)
          this.view.showPreEmploymentList(preEmploymentList)
          this.setDocumentsValue(data)
          this.getAffirmStatus()
        },
        error => {
          this.view.showPreEmploymentList(preEmploymentList)
          this.view.hideCircularLoader()
          store.dispatch(NotifyActions.resetNotify())
          this.getAffirmStatus()
       }
    )
  }

  getCharacterReference () {
    store.dispatch(NotifyActions.resetNotify())
    this.getCharacterReferenceInteractor.execute()
    .subscribe(data => {
      this.view.showCharacterReferenceMap(data)
      this.setCharacterReferenceValue(data)
    }, error => {
      this.view.showCharacterReferenceMap([])
      this.setCharacterReferenceValue([])
    })

  }

  getAffirmStatus () {
    store.dispatch(NotifyActions.resetNotify())
    this.getAffirmationStatusInteractor.execute()
    .map(data => {
      let totalValue = 0
      let progress = 0
      let documentSize = 0

      totalValue += requiredDocuments.length // documents size
      totalValue += 4 // affirmations
      totalValue += 2 // parents
      totalValue += 1 // education
      totalValue += 1 // character reference
      totalValue += 1 // medical sheduling
      totalValue -=1 // tin
      totalValue -=1 // sss
      totalValue -=1 // bir

      requiredDocuments.map((documents) => {
        if(documents.status === 2 &&
          documents.documentId !== 11 &&
          documents.documentId !== 12 &&
          documents.documentId !== 16) {
          progress +=1 // If document status is equal submitted (2) progress increment to 1
        }
      })
      console.log(storedMedical.length)
      storedMedical.map((resp) => {
        if(resp.alternativeDate !== '' && resp.preferredDate !== '') {
          progress +1
        }
      })

      data.map((resp) => {
        if(resp.nodeStatus === 1) {
          progress +=1 // If affirmation status is equal 1 progress increment to 1
        }
      })

      storedParent.map((resp) => {
        if(resp.relationship.toLowerCase() === 'father') {
          progress +=1
        } else if(resp.relationship.toLowerCase() === 'mother') {
          progress +=1
        }
      })

      if(storedCharacterReference.length > 0) {
        progress += 1 // If Character reference is greater than 0 progress increment to 1
      }

      if(storedEducation.length > 0) {
        progress += 1 // If Education is greater 0 progress increment to 1
      }
      this.view.showPercentageOfPreEmployment((progress / totalValue) * 100)
    })
    .subscribe(data => {}, error => {
      store.dispatch(NotifyActions.resetNotify())
    })
  }

}
