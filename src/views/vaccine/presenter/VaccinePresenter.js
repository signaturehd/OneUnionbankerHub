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
      let vaccineArray = []
      let dependentArray = []
      let appModeArray = []

      data &&
      data.vaccines.map((vaccine, key) => {
        vaccineArray.push({
          id : vaccine.id,
          name : vaccine.name,
          orderingStart : vaccine.orderingStart,
          orderingEnd : vaccine.orderingEnd,
          cost : vaccine.cost,
          availmentLimit : vaccine.availmentLimit
        })
      })

      data &&
      data.dependents.map((dependent, key) => {
        dependentArray.push({
          id : dependent.id,
          name : dependent.name
        })
      })

      data &&
      data.applicationModes.map((appMode, key) => {
        appModeArray.push({
          id : appMode.id,
          name : appMode.name
        })
      })

      this.view.showVaccineMap(vaccineArray)
      this.view.showDependentMap(dependentArray)
      this.view.showAppModeMap(appModeArray)
    })
    .subscribe(
        vaccine => {
          this.view.hideCircularLoader()
        },
        error => {
          this.view.navigate()
       }
    )
  }
}
