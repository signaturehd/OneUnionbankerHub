import AddRequirementInteractor from '../../../domain/interactor/postemployment/postemployment/AddRequirementInteractor'
import GetPostEmploymentInteractor from '../../../domain/interactor/postemployment/postemployment/GetPostEmploymentInteractor'

export default class PostEmploymentPresenter {
  constructor (container) {
    this.addRequirementInteractor = new AddRequirementInteractor(container.get('HRBenefitsClient'))
    this.getPostEmploymentInteractor = new GetPostEmploymentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  addRequirement () {
    this.addRequirementInteractor.execute()
      .subscribe(data => {

      }, e => {

      })
  }

  getPostEmployment () {
    this.getPostEmploymentInteractor.execute()
    .subscribe(data => {
      console.log(data)
    }, error => {
    })
  }
}
