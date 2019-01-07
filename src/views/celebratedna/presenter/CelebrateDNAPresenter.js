import store from '../../../store'
import { NotifyActions } from '../../../actions'
import GetRewardsDNAMoment from '../../../domain/interactor/rewards/GetRewardsDNAMoment'
import DNAParam from '../../../domain/param/GetDNAParam'

export default class CelebrateDNAPresenter {

    constructor () {
      this.getRewardsDNAMoment = new GetRewardsDNAMoment(container.get('HRBenefitsService'));
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
