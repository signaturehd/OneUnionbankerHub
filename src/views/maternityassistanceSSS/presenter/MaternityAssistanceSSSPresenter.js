import store from '../../../store'
import { NotifyActions } from '../../../actions'

import ValidateMaternityAssistanceSSSInteractor from
'../../../domain/interactor/maternityassistancesss/ValidateMaternityAssistanceSSSInteractor'

import AddMaternityAssistanceSSSInteractor from
'../../../domain/interactor/maternityassistancesss/AddMaternityAssistanceSSSInteractor'

import addParam from '../../../domain/param/AddMaternityAssistanceSSSParam'

export default class MaternityAssistanceSSSPresenter {
  constructor (container) {
    this.validateMaternityAssistanceSSSInteractor =
      new ValidateMaternityAssistanceSSSInteractor(container.get('HRBenefitsClient'))

    this.addMaternityAssistanceSSSInteractor =
      new AddMaternityAssistanceSSSInteractor(container.get('HRBenefitsClient'))

  }

  setView (view) {
    this.view = view
  }

  validateMaternityAssistanceSSS () {
    this.view.showCircularLoader()
    this.validateMaternityAssistanceSSSInteractor.execute()
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
        this.view.showAttachmentsMap(attachmentArray)
        this.view.showValidatedMaternity(data)
      })
      .subscribe(data => {
        this.view.hideCircularLoader()
      }, error => {
        this.view.navigate()
      })
    }

    addMaternityAssistanceSSS (
      roomNumber,
      houseNumber,
      street,
      subdivision,
      barangay,
      city,
      province,
      zipCode,
      noOfPregnancy,
      expectedDateOfDelivery,
      noOfDelivery,
      noOfMiscarriage,
      ) {
        this.view.showCircularLoader()
        this.addMaternityAssistanceSSSInteractor.execute(
          addParam(
            roomNumber,
            houseNumber,
            street,
            subdivision,
            barangay,
            city,
            province,
            zipCode,
            noOfPregnancy,
            expectedDateOfDelivery,
            noOfDelivery,
            noOfMiscarriage,
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
