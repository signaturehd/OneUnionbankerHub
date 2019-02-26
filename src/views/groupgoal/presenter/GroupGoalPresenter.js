import GetGroupDetailsByIdInteractor from '../../../domain/interactor/goals/GetGroupDetailsByIdInteractor'
import GetGoalGroupInteractor from '../../../domain/interactor/goals/GetGoalGroupInteractor'

export default class GroupGoalPresenter {
  constructor (container) {
    this.getGoalGroupInteractor = new GetGoalGroupInteractor(container.get('HRBenefitsClient'))
    this.getGroupDetailsByIdInteractor = new GetGroupDetailsByIdInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getGoalGroupList () {
    this.view.circularLoader(true)
    this.getGoalGroupInteractor.execute()
    .subscribe(data => {
      console.log(data)
      this.view.circularLoader(false)
      this.view.setGoalGroup(data)
    }, error => {
      this.view.circularLoader(false)
    })
  }

  getGroupDetailsById (id) {
    this.view.circularLoader(true)
    this.getGroupDetailsByIdInteractor.execute(id)
    .subscribe(data => {
      this.view.circularLoader(false)
      console.log(data)
      this.view.setGoalGroupList(data)
    }, error => {
      this.view.circularLoader(false)
    })
  }
}
