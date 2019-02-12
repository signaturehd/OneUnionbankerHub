import { NotifyActions, LoginActions } from '../../../actions'
import store from '../../../store'
import GenericGetNEOStatusInteractor from '../../../domain/interactor/neo/GenericGetNEOStatusInteractor'
import GenericPostNEOStatusInteractor from '../../../domain/interactor/neo/GenericPostNEOStatusInteractor'

let mockData = [
  {
    id : 0,
    content: '',
    title: 'Title ',
    description: 'by knowing more about unionbank'
  }, {
    id : 1,
    content: '',
    title: 'Title 1',
    description: 'by knowing more about unionbank'
  }, {
    id : 3,
    content: '',
    title: 'Title 3',
    description: 'by knowing more about unionbank'
  }
]

export default class NewEmployeeHirePresenter {
  constructor (container) {
    this.genericGetNEOStatusInteractor = new GenericGetNEOStatusInteractor(container.get('HRBenefitsClient'))
    this.genericPostNEOStatusInteractor = new GenericPostNEOStatusInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getNEOStatus () {
    const neoStatus = this.genericGetNEOStatusInteractor.execute()
    this.view.getNEOStatus(neoStatus)
  }

  setNEOStatus () {
    this.genericPostNEOStatusInteractor.execute(false)
  }

  getNEOData () {
    this.view.getNEOData(mockData)
  }
}
