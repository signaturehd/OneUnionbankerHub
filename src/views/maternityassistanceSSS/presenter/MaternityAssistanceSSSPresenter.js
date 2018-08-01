import store from '../../../store'
import { NotifyActions } from '../../../actions'

import ValidateMaternityAssistanceInteractor from
'../../../domain/interactor/maternityassistance/ValidateMaternityAssistanceInteractor'

import AddMaternityAssistanceInteractor from
'../../../domain/interactor/maternityassistance/AddMaternityAssistanceInteractor'

import addParam from '../../../domain/param/AddMaternityAssistanceParam'

export default class MaternityAssistanceSSSPresenter {
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
        const typeOfDelivery = [
          {
            id: 1,
            name: 'Normal'
          },
          {
            id: 2,
            name: 'Cesarean'
          }
        ]
        data &&
        data.attachments.map((attachment, key) => {
          attachmentArray.push({
            name : attachment
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
      orNumber,
      orDate,
      attachments
      ) {
        this.view.showCircularLoader()
        this.addMaternityAssistanceInteractor.execute(
          addParam(
            typeOfDelivery,
            dateOfDelivery,
            amount,
            orNumber,
            orDate,
            attachments
          )
        )

      .subscribe(
        data => {
          this.view.hideCircularLoader()
          this.view.noticeOfUndertaking(data)
        },  errors => {
            this.view.noticeResponseResp(errors)
            this.view.hideCircularLoader()
            // this.view.navigate()
          }
        )
      }
  }
