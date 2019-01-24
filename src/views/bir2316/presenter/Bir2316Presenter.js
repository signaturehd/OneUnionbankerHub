/* GET */
import GetBir2316ListInteractor from '../../../domain/interactor/bir2316/GetBir2316ListInteractor'
/* POST */
/* Param */
import store from '../../../store'
import { NotifyActions } from '../../../actions'
import moment from 'moment'

/* Variables */

export default class Bir2316Presenter {
  constructor (container) {
    this.getBir2316ListInteractor = new GetBir2316ListInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getBir2316List () {
    this.getBir2316ListInteractor.execute()
    .subscribe(data => {
    }, error => {
    })
  }
}
