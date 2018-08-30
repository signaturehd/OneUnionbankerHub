import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
import GenericPutNewCodeInteractor from '../../../domain/interactor/pinCode/GenericPutNewCodeInteractor'
import GetForConfirmationInteractor from '../../../domain/interactor/staffaccounts/GetForConfirmationInteractor'
import PostStaffAccountsInteractor from '../../../domain/interactor/staffaccounts/PostStaffAccountsInteractor'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

import addStaffAcountsParam from '../../../domain/param/AddStaffAcountsParam'

export default class SettingsPresenter {
  constructor (container) {
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
    this.genericPutNewCodeInteractor = new GenericPutNewCodeInteractor(container.get('HRBenefitsClient'))
    this.getForConfirmationInteractor = new GetForConfirmationInteractor(container.get('HRBenefitsClient'))
    this.postStaffAccountsInteractor = new PostStaffAccountsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

   getProfile () {
    this.view.showLoading()

    this.getProfileInteractor.execute()
     .do(profile => this.view.showProfile(profile.employee))
     .do(profile => this.view.showRank(profile.employee.rank))
     .do(profile => this.view.showLineManager(profile.employee.lineManager))
     .subscribe(profile => {
      this.view.hideLoading()
      this.view.showProfileDependent(profile.dependents)
      this.view.showAccountNumber(profile.accountNumber)
     }, e => {
      this.view.hideLoading()
      // TODO prompt generic error
    })
   }

   putEnrollPin (objectPINParam) {
     this.view.showCircularLoader()
     this.genericPutNewCodeInteractor.execute(objectPINParam)
     .subscribe(data => {
       store.dispatch(NotifyActions.addNotify({
         title: 'Benefits',
         message : data.message,
         type : 'success',
         duration : 2000
         })
       )
       this.view.hideModal(false)
       this.view.hideCircularLoader()
     }, error => {
       this.view.hideCircularLoader()
     })
   }

   addStaffAccounts (employeeName, sequence) {
     this.view.staffCircularLoader(true)
     this.postStaffAccountsInteractor.execute(addStaffAcountsParam(
       employeeName,
       sequence
     ))
     .subscribe(data => {
       this.view.showStaffAccountConfirmation(data)
       this.view.staffCircularLoader(false)
     }, error => {
       this.view.staffCircularLoader(false)
     })
   }

   getForConfirmation (id) {
     this.view.staffCircularLoader(true)
     this.getForConfirmationInteractor.execute(id)
     .subscribe( data => {
       this.view.staffCircularLoader(false)
       this.view.setStaffAccounts(data)
     }, error => {
      this.view.staffCircularLoader(false)
     })
   }
 }
