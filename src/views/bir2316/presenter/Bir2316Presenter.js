/* GET */
import GetBir2316ListInteractor from '../../../domain/interactor/bir2316/GetBir2316ListInteractor'
/* POST */
import RequestBIR2316Interactor from '../../../domain/interactor/bir2316/RequestBIR2316Interactor'
/* Param */
import store from '../../../store'
import { NotifyActions } from '../../../actions'
import moment from 'moment'

/* Variables */

export default class Bir2316Presenter {
  constructor (container) {
    this.getBir2316ListInteractor = new GetBir2316ListInteractor(container.get('HRBenefitsClient'))
    this.requestBIR2316Interactor = new RequestBIR2316Interactor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getBir2316List () {
    this.view.showCircularLoader()
    this.getBir2316ListInteractor.execute()
      .subscribe(data => {
        this.view.hideCircularLoader()
        this.view.setBIRList(data)
      }, error => {
        console.log(error);
      })
  }

  requestBIR2316 (year) {
    this.view.showCircularLoader()
    this.requestBIR2316Interactor.execute(year)
      .subscribe(data => {
        this.view.hideCircularLoader()
        this.view.setBIR2316File(data)
      }, e => {
        console.log(e);
      })
  }
}
