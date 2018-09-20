import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetBiographicalPdfViewInteractor from
'../../../../domain/interactor/preemployment/biographical/GetBiographicalPdfViewInteractor'

export default class BiographicalDataPresenter {
  constructor (container) {
    this.getBiographicalPdf = new GetBiographicalPdfViewInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnBoardingDocument (link) {

    this.getBiographicalPdf.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
    }, error => {
    })
  }

}
