import UpdateNoticeInteractor from '../../../domain/interactor/notice/UpdateNoticeInteractor'
import GetPinCodeStatusInteractor from '../../../domain/interactor/notice/GetPinCodeStatusInteractor'
import AddPinCodeStatusInteractor from '../../../domain/interactor/notice/AddPinCodeStatusInteractor'
import NoticeParam from '../../../domain/param/NoticeParam'
import SubmitPinInteractor from '../../../domain/interactor/compliances/SubmitPinInteractor'
import ValidateEmployeePinInteractor from '../../../domain/interactor/pinCode/ValidateEmployeePinInteractor'
import GetHasPinInteractor from '../../../domain/interactor/user/GetHasPinInteractor'

let pinCode

export default class NoticePresenter {
  constructor (container) {
    this.updateNoticeInteractor = new UpdateNoticeInteractor(container.get('HRBenefitsClient'))
    this.submitPinInteractor = new SubmitPinInteractor(container.get('HRBenefitsClient'))
    this.validateEmployeePinInteractor = new ValidateEmployeePinInteractor(container.get('HRBenefitsClient'))
    this.getPinCodeStatusInteractor = new GetPinCodeStatusInteractor(container.get('HRBenefitsClient'))
    this.addPinCodeStatusInteractor = new AddPinCodeStatusInteractor(container.get('HRBenefitsClient'))
    this.getHasPinInteractor = new GetHasPinInteractor(container.get('HRBenefitsClient'))
    // this.updateNoticeMplInteractor = new UpdateNoticeMplInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  getPinCode () {
    // const pinCodeStatus = this.getHasPinInteractor.execute()
    const pinCodeStatus = this.getPinCodeStatusInteractor.execute()
    this.view.setPinCodeStatus(pinCodeStatus)
  }

  setPinCode (status) {
    this.addPinCodeStatusInteractor.execute(status)
  }


  updateNotice (transactionId, isAgree, benefitId, code) {
    this.view.circularLoader(true)
    this.updateNoticeInteractor.execute(NoticeParam(transactionId, isAgree, benefitId, code))
     .subscribe(response => {
      this.view.circularLoader(false)
      this.view.onSuccess(response)
      this.setPinCode(true)
     }, e => {
      this.view.circularLoader(false)
      this.view.onFailed()
      // TODO prompt generic error
     })
  }

  validateEmployeePin (code) {
    this.view.noticeResponseFunc(code, false)
    // this.view.showCircularLoader()
    // this.validateEmployeePinInteractor.execute(code)
    //   .subscribe(
    //     data => {
    //       this.view.hideCircularLoader()
    //       this.view.noticeResponseFunc(data, false)
    //     }, error => {
    //     this.view.hideCircularLoader()
    // })

  }
}
