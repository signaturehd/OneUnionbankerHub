import store from '../../../store'
import { NotifyActions } from '../../../actions'
import GetRewardsDNAMomentInteractor from '../../../domain/interactor/rewards/GetRewardsDNAMomentInteractor'
import DNAParam from '../../../domain/param/GetDNAParam'

export default class CelebrateDNAPresenter {

    constructor (container) {
      this.GetRewardsDNAMomentInteractor = new GetRewardsDNAMomentInteractor(container.get('HRBenefitsClient'))
    }

    setView (view) {
      this.view = view
    }

    getRewardDNA (id) {
    try  {this.view.showLoading()
      this.GetRewardsDNAMomentInteractor.execute(DNAParam(id))
       .subscribe(data => {
         // rendering to view (output)
         this.view.setRewardDNA(data)
         this.view.hideLoading()
       }, e => {
         // for error catching
       })}
       catch(e){
         console.log(e)
       }
    }
  }
