import store from '../../../store'
import { NotifyActions } from '../../../actions'

import ValidateMaternityAssistanceInteractor from
'../../../domain/interactor/maternityassistance/ValidateMaternityAssistanceInteractor'

import AddMaternityAssistanceInteractor from
'../../../domain/interactor/maternityassistance/AddMaternityAssistanceInteractor'

import addMaternityAssistanceParam from '../../../domain/param/AddMaternityAssistanceParam'

export default class MaternityAssistancePresenter {
  constructor (container) {
    this.validateMaternityAssistanceInteractor =
      new ValidateMaternityAssistanceInteractor(container.get('HRBenefitsClient'))

    this.addMaternityAssistanceInteractor =
      new AddMaternityAssistanceInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  validateMaternityAssistance () {
    this.view.showCircularLoader()
    this.validateMaternityAssistanceInteractor.execute()
      .map(data => {
        let attachmentArray = []
        let typeOfDelivery = []
        data &&
        data.attachments.map((attachment, key) => {
          attachmentArray.push({
            name : attachment
          })
        })
        data &&
        data.typeOfDelivery.map((resp, key) => {
          typeOfDelivery.push({
            id : resp.id,
            name : resp.Delivery
          })
        })
        this.view.showTypeOfDeliveryMap(typeOfDelivery)
        this.view.showAttachmentsMap(attachmentArray)
        this.view.showValidatedMaternity(data)
      })
      .subscribe(data => {
        this.view.hideCircularLoader()
      }, error => {
        this.view.navigate()
      })
    }

  addMaternityAssistance (
    typeOfDelivery,
    dateOfDelivery,
    amount,
    orDate,
    orNumber,
    attachments
    ) {
      this.view.showCircularLoader()
      this.addMaternityAssistanceInteractor.execute(
        addMaternityAssistanceParam(
          typeOfDelivery,
          dateOfDelivery,
          amount,
          orDate,
          orNumber,
          attachments
        )
      )
    .subscribe(
      data => {
        this.view.hideCircularLoader()
        this.view.noticeOfUndertaking(data)
      },  errors => {
          this.view.hideCircularLoader()
          this.view.noticeResponseResp(errors)
          this.view.navigate()
        }
      )
    }
  }
