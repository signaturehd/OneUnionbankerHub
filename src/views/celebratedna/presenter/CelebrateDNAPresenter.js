import store from '../../../store'
import { NotifyActions } from '../../../actions'
import GetRewardsDNAMomentInteractor from '../../../domain/interactor/rewards/GetRewardsDNAMoment'
import DNAParam from '../../../domain/param/GetDNAParam'

export default class CelebrateDNAPresenter {

    constructor (container) {
      this.getRewardsDNAMoment = new GetRewardsDNAMomentInteractor(container.get("HRBenefitsClient"));
    }

    setView (view) {
      this.view = view

    }

    getRewardDNA (id) {
      this.view.showLoading()
      this.getRewardsDNAMoment.execute(id)
       .subscribe(data => {
         //rendering to view (output)
         this.view.setRewardDNA(data)
         this.view.hideLoading()
       }, e => {
         //for error catching
       })
    }

  }
