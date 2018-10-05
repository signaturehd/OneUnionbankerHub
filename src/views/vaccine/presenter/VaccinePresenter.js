import ValidateVaccineInteractor from '../../../domain/interactor/vaccine/ValidateVaccineInteractor'
import AddVaccineInteractor from '../../../domain/interactor/vaccine/AddVaccineInteractor'

let storedVaccineList = [], storedDependentList = []
export default class VaccinePresenter {
  constructor (container) {
    this.validateVaccineInteractor = new ValidateVaccineInteractor(container.get('HRBenefitsClient'))
    this.addVaccineInteractor = new AddVaccineInteractor(container.get('HRBenefitsClient'))
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
        this.setDependent({
          id : dependent.id,
          name : dependent.name
        })
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
    .subscribe(data => {
        this.view.hideCircularLoader()
      },e => {
        this.view.navigate()
      }
    )
  }

  addVaccine () {
    this.addVaccineInteractor.execute(storedVaccineList)
      .subscribe(data => {

      })
  }

  setDependent(dependent) {
    const storedDependentListArray = storedDependentList.map(item => item.id)
    if ( !storedDependentListArray.includes(dependent) ) {
      storedDependentList.push(dependent)
    } else {
      storedDependentList.map((item, key) => item.id == dependent.id && storedDependentList.splice(key, 1))

    }

    this.view.setDependentList(storedDependentList)
    // if dependent paramenter is having the data -- remove then push

    // if not push lang
  }

  setVaccineList (vaccineList) {
    const storedVaccineListArray = storedVaccineList.map(item => item.id)

    if ( !storedVaccineList.includes(vaccineList) ) {
      // if not includes add to the array and remove it to the selections
      this.setDependents(dependentId)
      storedVaccineList.push(vaccineList)
    }


    this.view.setVaccineList(storedVaccineList)
  }
}
