import { NotifyActions } from '../../../../actions'
import store from '../../../../store'
import GetBspCertificatePdfViewInteractor from
'../../../../domain/interactor/preemployment/bspcertification/GetBspCertificatePdfViewInteractor'

export default class PagIbigLoanPresenter {
  constructor (container) {
    this.getBspPdf = new GetBspCertificatePdfViewInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getOnBoardingDocument (link) {
    this.getBspPdf.execute(link)
    .subscribe(data => {
      this.view.showPdfFileView(data)
    }, error => {
    })
  }

}
