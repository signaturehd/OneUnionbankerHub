import AddOpticalInteractor from '../../../domain/interactor/optical/AddOpticalInteractor'
import GetOpticalInteractor from '../../../domain/interactor/optical/GetOpticalInteractor'
import opticalParam from '../../../domain/param/OpticalParam'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class OpticalPresenter {
  constructor (container) {
    this.addOpticalInteractior = new AddOpticalInteractor(container.get('HRBenefitsClient'))
    this.getOpticalInteractor = new GetOpticalInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  addOptical (
    amount,
    orDate,
    orNumber,
    attachmentData
  ) {
    this.view.isEligible(true)
    this.addOpticalInteractior.execute(opticalParam(
      amount,
      orDate,
      orNumber,
      attachmentData))
      .subscribe(optical => {
        this.view.isEligible(false)
        this.view.noticeOfUndertaking(optical)
        // this.view.showOptical(optical)
      }, e => {
        this.view.isEligible(false)
      })
    }

  getOptical () {
    this.view.isEligible(true)
    this.getOpticalInteractor.execute()
      .subscribe(data => {
        this.view.isEligible(false)
        let attachmentsArray = []
          data &&
          data.attachments.map((resp, key) => {
          attachmentsArray.push({
            name : resp
          })
          this.view.showAttachmentsMap(attachmentsArray, data.limit)
        })
      }, errors => {
        this.view.isEligible(false)
        this.view.navigate()
      })
    }
  }
