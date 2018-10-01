import GetSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/GetSpouseInteractor'
import PostSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/PostSpouseInteractor'
import PutSpouseInteractor from '../../../../domain/interactor/preemployment/spouse/PutSpouseInteractor'
import addSpouseForm from '../../../../domain/param/AddSpouseParam'

export default class SpousePresenter {
  constructor (container) {
    this.getSpouseInteractor = new GetSpouseInteractor(container.get('HRBenefitsClient'))
    this.putSpouseInteractor = new PutSpouseInteractor(container.get('HRBenefitsClient'))
    this.postSpouseInteractor = new PostSpouseInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getSpouse () {
    this.view.showCircularLoader()
    this.getSpouseInteractor.execute()
    .subscribe(data => {
      this.view.hideCircularLoader()
      this.view.showSpouseDetails(data)
    }, error => {
      this.view.hideCircularLoader()
    })
  }

  postSpouseForm (
    firstName, 
    middleName,
    lastName,
    birthDate,
    occupation,
    status,
    healthHospitalizationPlan,
    groupLifeInsurance,
    spouseId
  ) {
    this.view.showCircularLoader()
    this.postSpouseInteractor.execute(addSpouseForm(
    firstName, 
    middleName,
    lastName,
    birthDate,
    occupation,
    status,
    healthHospitalizationPlan,
    groupLifeInsurance,
    spouseId
    ))
    .subscribe(data => {
      this.view.noticeResponseFunc(data.message)
      // this.getFinancialDetails()
      this.view.hideCircularLoader()
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
    status,
    healthHospitalizationPlan,
    groupLifeInsurance,
    spouseId
  ) {
    this.view.showCircularLoader()
    this.putSpouseInteractor.execute(addSpouseForm(
      firstName, 
      middleName,
      lastName,
      birthDate,
      occupation,
      status,
      healthHospitalizationPlan,
      groupLifeInsurance,
      spouseId
    ))
    .subscribe(data => {
      this.view.noticeResponseFunc(data.message)
      // this.getFinancialDetails()
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
    })
  }
}
