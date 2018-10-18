import { NotifyActions } from '../../../actions'
import store from '../../../store'
import preEmploymentFormInteractor from '../../../domain/interactor/preemployment/preemployment/GetPreEmploymentFormInteractor'
import GetAffirmationStatusInteractor from '../../../domain/interactor/preemployment/affirmation/GetAffirmationStatusInteractor'
import GetCharacterReferenceInteractor from '../../../domain/interactor/preemployment/characterreference/GetCharacterReferenceInteractor'
import EmployeeSchoolInteractor from '../../../domain/interactor/preemployment/education/GetEmployeeSchoolInteractor'
import GetParentInteractor from '../../../domain/interactor/preemployment/parent/GetParentInteractor'

let storedCharacterReference = []
let storedEducation = []
let requiredDocuments = []
let storedParent = []

export default class PreEmploymentPresenter {
  constructor (container) {
    this.preEmploymentFormInteractor = new preEmploymentFormInteractor(container.get('HRBenefitsClient'))
    this.getAffirmationStatusInteractor = new GetAffirmationStatusInteractor(container.get('HRBenefitsClient'))
    this.getCharacterReferenceInteractor = new GetCharacterReferenceInteractor(container.get('HRBenefitsClient'))
    this.getParentInteractor = new GetParentInteractor(container.get('HRBenefitsClient'))
    this.employeeSchoolInteractor = new EmployeeSchoolInteractor(container.get('HRBenefitsClient'))
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

  getEmployeeSchool () {
    this.employeeSchoolInteractor.execute()
    .subscribe(
      data => {
        this.setEducationReferenceValue(data)
        this.view.showEducationMap(data)
      },
      error => {
        this.setEducationReferenceValue([])
     }
    )
  }

  getParents () {
    this.getParentInteractor.execute()
    .subscribe(data => {
      this.setParentValue(data)
    }, error => {
    })
  }

  getPreEmploymentForm () {
    this.view.showCircularLoader()
    this.preEmploymentFormInteractor.execute()
    .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.checkedPreEmploymentForm(data)
          this.setDocumentsValue(data)
          this.getAffirmStatus()
        },
        error => {
          this.view.hideCircularLoader()
          this.getAffirmStatus()
       }
    )
  }

  getCharacterReference () {
    this.getCharacterReferenceInteractor.execute()
    .subscribe(data => {
      this.view.showCharacterReferenceMap(data)
      this.setCharacterReferenceValue(data)
    }, error => {
      store.dispatch(NotifyActions.resetNotify())
      this.view.showCharacterReferenceMap([])
    })

  }

  getAffirmStatus () {
    this.getAffirmationStatusInteractor.execute()
    .map(data => {
      let totalValue = 0
      let progress = 0
      let documentSize = 0

      requiredDocuments.map((documents) => {
        documentSize += documents.url.length
        documents && documents.url.map((attachments) => {
          if(documents.status === 2) {
            progress +=1 // If document status is equal submitted (2) progress increment to 1
          }
        })
      })

      totalValue += documentSize // documents size
      totalValue += 4 // affirmations
      totalValue += 2 // parents
      totalValue += 1 // education
      totalValue += 1 // character reference
      totalValue -= 0 // tin (optional)
      totalValue -= 0  // bir 1902 (optional)
      totalValue -= 0 // pagibig loan (optional)

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
    .subscribe(data => {}, error => {})
  }

}
