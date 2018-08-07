import store from '../../../store'
import { NotifyActions } from '../../../actions'

import AddMaternityAssistanceSSSInteractor from
'../../../domain/interactor/maternityassistancesss/AddMaternityAssistanceSSSInteractor'

import ValidateMaternityAssistanceInteractor from
'../../../domain/interactor/maternityassistance/ValidateMaternityAssistanceInteractor'

import AddMaternityAssistanceInteractor from
'../../../domain/interactor/maternityassistance/AddMaternityAssistanceInteractor'

import addMaternityAssistanceParam from '../../../domain/param/AddMaternityAssistanceParam'
import addParam from '../../../domain/param/AddMaternityAssistanceSSSParam'

export default class MaternityAssistancePresenter {
  constructor (container) {
    this.validateMaternityAssistanceInteractor =
      new ValidateMaternityAssistanceInteractor(container.get('HRBenefitsClient'))

    this.addMaternityAssistanceSSSInteractor =
      new AddMaternityAssistanceSSSInteractor(container.get('HRBenefitsClient'))

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
            id : key+1,
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
    typeDeliveryId,
    deliveryDate,
    amount,
    preferredDate,
    orNumberText,
    attachmentArray
    ) {
      this.view.showCircularLoader()
      this.addMaternityAssistanceInteractor.execute(
        addMaternityAssistanceParam(
          typeDeliveryId,
          deliveryDate,
          amount,
          preferredDate,
          orNumberText,
          attachmentArray
        )
      )
      console.log(attachmentArray)
    .subscribe(
      data => {
        this.view.hideCircularLoader()
        this.view.noticeOfUndertaking(data)
      }, errors => {
        this.view.hideCircularLoader()
        this.view.navigate()
        this.view.noticeResponseResp(errors)
      }
    )
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
          this.view.navigate()
        }
      )
    }
  }
