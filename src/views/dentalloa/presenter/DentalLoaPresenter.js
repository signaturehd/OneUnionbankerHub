import AddDentalLoaInteractor from '../../../domain/interactor/dentalLoa/AddDentalLoaInteractor'
import GetDentalLoaInteractor from '../../../domain/interactor/dentalLoa/GetDentalLoaInteractor'
import dentalLoaParam from '../../../domain/param/DentalLoaParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class DentalLoaPresenter {
 constructor (container) {
   this.addDentalLoaInteractor = new AddDentalLoaInteractor(container.get('HRBenefitsClient'))
   this.getDentalLoaInteractor = new GetDentalLoaInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 getDentalLoa () {
   this.view.showCircularLoader()
   this.getDentalLoaInteractor.execute()

    .subscribe(response => {
      this.view.hideCircularLoader()
      this.view.getDentalLoa(response)
    }, error => {
      this.view.hideCircularLoader()
      this.view.navigate()
      this.view.showErrorMessage(error, true)
    })
 }

 addDentalLoa (dependent, branch, date, procedure) {
  this.view.showCircularLoader()
  this.addDentalLoaInteractor.execute(
    dentalLoaParam(
      dependent,
      branch,
      date,
      procedure))
      .subscribe(
        data => {
         this.view.hideCircularLoader()
         this.view.noticeOfUndertaking(true)
         this.view.noticeOfUndertakingForm(data)
        },
        error => {
          this.view.hideCircularLoader()
        }
      )
    }
  }
