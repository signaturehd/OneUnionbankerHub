import GetProgrmsInteractor from '../../../domain/interactor/pay/GetProgramsInteractor'

export default class PayForSkillsPresnter {
  constructer (container) {

  }

  setView (view) {
    this.view = view
  }

  getPrograms () {
    this.view.showLoadng()

  }

}
