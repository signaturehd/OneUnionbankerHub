import AddRequirmeentInteractor from '../../../domain/interactor/postemployment/AddRequirmeentInteractor'

export default class PostEmploymentPresenter {
  constructor (container) {
    this.addRequirementInteractor = new AddRequirementInteractor(container.get('HRBenefitsClient'))
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
}
