import store from '../../../store'
import { NotifyActions } from '../../../actions'

import GetCompliancesInteractor from '../../../domain/interactor/compliances/GetCompliancesInteractor'

export default class CompliancePresenter {
  constructor (container) {
    this.getCompliancesInteractor = new GetCompliancesInteractor(container.get('FileClient'))
  }

  setView (view) {
    this.view = view
  }

  getCompliancesPdf () {
    this.getCompliancesInteractor.execute('/2018-08-02/12345-coc_v2-1533200541537.pdf')
      .subscribe(
        data => {
          console.log(data)
          this.view.setCompliancesPdf(data)
        }, error => {

    })
  }
}
