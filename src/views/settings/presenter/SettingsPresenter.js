import GetProfileInteractor from '../../../domain/interactor/user/GetProfileInteractor'
import GenericPutNewCodeInteractor from '../../../domain/interactor/pinCode/GenericPutNewCodeInteractor'
import GetForConfirmationInteractor from '../../../domain/interactor/staffaccounts/GetForConfirmationInteractor'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

export default class SettingsPresenter {
  constructor (container) {
    this.getProfileInteractor = new GetProfileInteractor(container.get('HRBenefitsClient'))
    this.genericPutNewCodeInteractor = new GenericPutNewCodeInteractor(container.get('HRBenefitsClient'))
    this.getForConfirmationInteractor = new GetForConfirmationInteractor(container.get('HRBenefitsClient'))
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

   getForConfirmation (id) {
     this.view.staffCircularLoader(true)
     this.getForConfirmationInteractor.execute(id)
     .subscribe( data => {
       this.view.staffCircularLoader(false)
       this.view.setStaffAccounts(data)
     }, error => {
       const sampleData = [
        {
          "employeeId": "1604023",
          "employeeName": "Jayzer0",
          "account": {
            "name": "4",
            "number": "********1234",
            "remarks": ""
          },
          "status": "Confirmed",
          "sequence": 1,
          "dateRegistered": "2018-08-16 14:40:11.393",
          "addedBy": "1604023",
          "line1": "5YGBRQJ9OA6CJ1CU",
          "line2": "CA",
          "line3": "NA",
          "line4": "",
          "line5": ""
        },
        {
          "employeeId": "1604023",
          "employeeName": "Jayzer0",
          "account": {
            "name": "4",
            "number": "********4321",
            "remarks": ""
          },
          "status": "Confirmed",
          "sequence": 2,
          "dateRegistered": "2018-08-16 14:40:11.393",
          "addedBy": "1604023",
          "line1": "5YGBRQJ9OA6CJ1CU",
          "line2": "EO",
          "line3": "NA",
          "line4": "",
          "line5": ""
        }
      ]
      this.view.staffCircularLoader(false)
      this.view.setStaffAccounts(sampleData)
      //this.view.showStaffAccount(false)
     })
   }
 }
