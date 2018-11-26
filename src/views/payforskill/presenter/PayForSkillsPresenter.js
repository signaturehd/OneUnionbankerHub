/* GET */
import GetProgramsInteractor from '../../../domain/interactor/pay/GetProgramsInteractor'
/* POST */
import AddPaySkillsInteractor from '../../../domain/interactor/pay/AddPaySkillsInteractor'

/* Param */
import AddPaySkillsParam from '../../../domain/param/AddPaySkillsParam'

let storedDateOfCompletion = '', storedProgramObject = '', storedAttachments = [], storedAccreditationObject = ''

export default class PayForSkillsPresenter {
  constructor (container) {
    this.getProgramsInteractor = new GetProgramsInteractor(container.get('HRBenefitsClient'))
    this.addPaySkillsInteractor = new AddPaySkillsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setStoredDateOfCompletion (data) {
    console.log(data)
    storedDateOfCompletion = data
    this.view.setDateOfCompletion(data)
  }

  setStoredAttachments (data) {
    storedAttachments = data
  }

  setStoredProgramObject (data) {
    storedProgramObject = data
    this.view.setProgramsBody(data)
  }

  setStoredAccreditationObject (data) {
    storedAccreditationObject = data
    this.view.setAccreditingBody(data)
  }

  getPaySkills () {
    this.view.checkLoader(true)
    this.getProgramsInteractor.execute()
    .subscribe(data => {
      this.view.checkLoader(false)
      this.view.setAccrediting(data.accreditingBody)
      this.view.setPrograms(data.program)
    }, error => {
      this.view.checkLoader(false)
    })
  }

  submitPaySkills () {
    try {
      this.addPaySkillsInteractor.execute(AddPaySkillsParam(
        storedProgramObject.id,
        storedDateOfCompletion,
        storedAccreditationObject.id,
        storedAttachments
      ))
      .subscribe(data => {
      }, error => {
      })
    } catch(e) {
      console.log(e)
    }
  }
}
