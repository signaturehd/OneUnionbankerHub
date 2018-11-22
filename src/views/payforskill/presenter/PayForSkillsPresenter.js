import GetProgrmsInteractor from '../../../domain/interactor/pay/GetProgramsInteractor'

export default class PayForSkillsPresnter {
  constructer (container) {
    this.getProgramInteractor = new GetProgramsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getPrograms () {
    // this.view.showLoadng()
    this.getProgramInteractor.execute()
      .subscribe(data => {
        console.log(data)
      }, e => {
        console.log(e)
      })
  }

}
