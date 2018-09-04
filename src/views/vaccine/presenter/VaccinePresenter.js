import validateVaccineInteractor from '../../../domain/interactor/vaccine/ValidateVaccineInteractor'

export default class VaccinePresenter {
  constructor (container) {
    this.validateVaccineInteractor = new validateVaccineInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  validateVaccine () {
    this.view.showCircularLoader()
    this.validateVaccineInteractor.execute()
    .map(data => {
      let denpendentArray = []

      data &&
      data.dependents.map((dependent, key) => {
        schoolsArray.push({
          id : dependent.id,
          name : dependent.name
        })
      })
      this.view.showDependentMap(denpendentArray)
    })
    .subscribe(
        data => {
          this.view.hideCircularLoader()
        },
        error => {
          this.view.navigate()
       }
    )
  }

}
