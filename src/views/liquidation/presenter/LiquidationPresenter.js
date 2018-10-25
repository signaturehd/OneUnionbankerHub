import GetTravelsInteractor from '../../../domain/interactor/travel/GetTravelsInteractor'
import AddLiquidationInteractor from '../../../domain/interactor/travel/AddLiquidationInteractor'
import liquidationParam from '../../../domain/param/AddLiquidationParam'

export default class LiquidationPresenter {
  constructor (container) {
    this.getTravelsInteractor = new GetTravelsInteractor(container.get('HRBenefitsClient'))
    this.addLiquidationInteractor = new AddLiquidationInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getTravels () {
    this.view.showCircularLoader()
    this.getTravelsInteractor.execute(3)
      .subscribe(travel => {
          this.view.hideCircularLoader()
          this.view.getTravels(travel)
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }

  addLiquidation (
    requestId,
    ticketMode,
    whyTicketUsed,
    attachmentsData
  ) {
    this.view.showCircularLoader()
    this.addLiquidationInteractor.execute(liquidationParam(
      requestId,
      ticketMode,
      whyTicketUsed,
      attachmentsData
    ))
      .subscribe(travel => {
          this.view.hideCircularLoader()
          this.view.noticeResponse()
        }, e => {
          this.view.hideCircularLoader()
          // TODO prompt generic error
      })
  }
}
