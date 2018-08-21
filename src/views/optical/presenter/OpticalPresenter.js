import AddOpticalInteractor from '../../../domain/interactor/optical/AddOpticalInteractor'
import GetOpticalInteractor from '../../../domain/interactor/optical/GetOpticalInteractor'
import OpticalParam from '../../../domain/param/OpticalParam'
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
    this.view.showCircularLoader()
    this.addOpticalInteractior.execute(OpticalParam(
      amount,
      orDate,
      orNumber,
      attachmentData))
      .subscribe(optical => {
        this.view.noticeOfUndertaking(optical)
        this.view.hideCircularLoader()
        // this.view.showOptical(optical)
      }, e => {
        this.view.noticeResponse(e)
        // TODO prompt generic error
      })
    }

  getOptical () {
    this.getOpticalInteractor.execute()
      .map(data => {
        let attachmentsArray = []
          data &&
          data.attachments.map((resp, key) => {
          attachmentsArray.push({
            name : resp
          })
        })
        this.view.showAttachmentsMap(attachmentsArray, data.limit)
        this.view.isEligible(data ? true : false)
      })
      .subscribe(data => {
        // this.view.isEligible(data ? true : false)
      }, errors => {
        this.view.isEligible(false, errors)
      })
    }
  }
