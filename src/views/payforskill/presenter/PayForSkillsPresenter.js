import GetProgramsInteractor from '../../../domain/interactor/pay/GetProgramsInteractor'

let storedDateOfCompletion = '', storedProgram = '', storedAccreditingBody = '', storedAttachments = []

export default class PayForSkillsPresenter {
  constructer (container) {
    this.getProgramsInteractor = new GetProgramsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setStoredDateOfCompletion (data) {
    storedDateOfCompletion = data
  }

  setStoredProgram (data) {
    storedProgram = data
  }

  setStoredAccreditingBody (data) {
    storedAccreditingBody = data
  }

  setStoredAttachments (data) {
    storedAttachments = data
  }

  getPaySkills () {
    try {
      this.getProgramsInteractor.execute()
      .subscribe(data => {
        console.log(data)
      }, e => {
        console.log(e)
      })
    } catch (e) {
      console.log(e)
    }
  }
}
