import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
import GenericPutNewCodeInteractor from '../../../domain/interactor/pinCode/GenericPutNewCodeInteractor'
import GetForConfirmationInteractor from '../../../domain/interactor/staffaccounts/GetForConfirmationInteractor'
import PostStaffAccountsInteractor from '../../../domain/interactor/staffaccounts/PostStaffAccountsInteractor'
import UpdateStaffAccountsInteractor from '../../../domain/interactor/staffaccounts/UpdateStaffAccountsInteractor'
import UpdateDescriptionInteractor from '../../../domain/interactor/account/UpdateDescriptionInteractor'
import GetDevicesInteractor from '../../../domain/interactor/account/GetDevicesInteractor'
import UpdateAddressInteractor from '../../../domain/interactor/account/UpdateAddressInteractor'
import UpdateEmailAddressInteractor from '../../../domain/interactor/account/UpdateEmailAddressInteractor'
import UpdateContactNumberInteractor from '../../../domain/interactor/account/UpdateContactNumberInteractor'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

import addStaffAcountsParam from '../../../domain/param/AddStaffAcountsParam'

export default class SettingsPresenter {
  constructor (container) {
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
    this.genericPutNewCodeInteractor = new GenericPutNewCodeInteractor(container.get('HRBenefitsClient'))
    this.getForConfirmationInteractor = new GetForConfirmationInteractor(container.get('HRBenefitsClient'))
    this.postStaffAccountsInteractor = new PostStaffAccountsInteractor(container.get('HRBenefitsClient'))
    this.updateStaffAccountsInteractor = new UpdateStaffAccountsInteractor(container.get('HRBenefitsClient'))
    this.updateDescriptionInteractor = new UpdateDescriptionInteractor(container.get('HRBenefitsClient'))
    this.getDevicesInteractor = new GetDevicesInteractor(container.get('HRBenefitsClient'))
    this.updateAddressInteractor = new UpdateAddressInteractor(container.get('HRBenefitsClient'))
    this.updateEmailAddressInteractor = new UpdateEmailAddressInteractor(container.get('HRBenefitsClient'))
    this.updateContactNumberInteractor = new UpdateContactNumberInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

   getProfile () {
    store.dispatch(NotifyActions.resetNotify())
    this.view.showLoading()

    this.getProfileInteractor.execute()
    .do(profile => this.view.showProfileBackground(profile))
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

   getDevices () {
     store.dispatch(NotifyActions.resetNotify())
     this.getDevicesInteractor.execute()
     .subscribe(data => {
       this.view.showDevicesData(data)
     }, error => {
     })
   }

   putEnrollPin (objectPINParam) {
     this.view.showCircularLoader()
     this.genericPutNewCodeInteractor.execute(objectPINParam)
     .subscribe(data => {
       store.dispatch(NotifyActions.addNotify({
         title: 'My Security',
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

   getForConfirmation () {
     this.view.staffCircularLoader(true)
     this.getForConfirmationInteractor.execute()
     .subscribe( data => {
       this.view.staffCircularLoader(false)
       this.view.setStaffAccounts(data)
     }, error => {
      this.view.staffCircularLoader(false)
     })
   }

   addStaffAccounts (
     fullName,
     accountNumber,
     type,
     capacity,
     remarks
   ) {
     store.dispatch(NotifyActions.resetNotify())
     if(accountNumber < 1 && accountNumber.length === 12) {
       store.dispatch(NotifyActions.addNotify({
         title: 'Staff Accounts',
         message : 'Please input valid account number and must be atleast 12 digit',
         type: 'warning',
         duration: 2000
       }))
     } else if (type === '') {
       store.dispatch(NotifyActions.addNotify({
         title: 'Staff Accounts',
         message : 'Please select the type of account',
         type: 'warning',
         duration: 2000
       }))
     } else if (capacity === '') {
       store.dispatch(NotifyActions.addNotify({
         title: 'Staff Accounts',
         message : 'Please select the capacity of account',
         type: 'warning',
         duration: 2000
       }))
     } else {
       this.view.staffCircularLoader(true)
       this.postStaffAccountsInteractor.execute(addStaffAcountsParam(
         fullName,
         accountNumber,
         type,
         capacity,
         remarks,
         '',
       ))
       .subscribe(data => {
         this.view.staffCircularLoader(false)
         this.view.noticeResponseModalStaff(data.message)
         this.getForConfirmation()
       }, error => {
         this.view.staffCircularLoader(false)
       })
     }
   }

   /* Profile Update */

   updateEmailAddress (email) {
     this.updateEmailAddressInteractor.execute(email)
     .subscribe(data => {
       this.view.noticeResponseModal(data.message)
       this.getProfile()
     }, error => {
     })
   }

   updateContactNumber (number) {
     this.updateContactNumberInteractor.execute(number)
     .subscribe(data => {
       this.view.noticeResponseModal(data.message)
       this.getProfile()
     }, error => {
     })
   }

   updateStaffAccounts (
     fullName,
     accountNumber,
     sequence
   ) {
     this.view.staffCircularLoader(true)
     this.updateStaffAccountsInteractor.execute(addStaffAcountsParam(
       fullName,
       accountNumber,
       '',
       '',
       '',
       sequence
     ))
     .subscribe(data => {
       this.view.staffCircularLoader(false)
       this.view.noticeResponseModalStaff(data.message)
       this.getForConfirmation()
     }, error => {
       this.view.staffCircularLoader(false)
     })
   }

   updateDescription (description) {
     this.updateDescriptionInteractor.execute(description)
     .subscribe(data => {
       this.view.noticeResponseModal(data.message)
       this.getProfile()
     }, error => {
     })
   }

   updateAddress (address, file) {
    this.updateAddressInteractor.execute(address, file)
     .subscribe(data => {
       this.view.noticeResponseModal(data.message)
       this.getProfile()
     }, error => {
      store.dispatch(NotifyActions.resetNotify())
     })
   }
 }
