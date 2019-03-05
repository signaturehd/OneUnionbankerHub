import ValidateLaptopLeaseInteractor from
'../../../domain/interactor/laptoplease/ValidateLaptopLeaseInteractor'

import AddLaptopLeaseInteractor from
'../../../domain/interactor/laptoplease/AddLaptopLeaseInteractor'

import AddLaptopLeaseParam from '../../../domain/param/AddLaptopLeaseParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

import moment from 'moment'

let storedAmount = '', storedTerms = '', storedDeliveryOption = '', storedLaptopModel = '', storedFile = ''
let storedOrDate = '', storedOrNumber = '', storedVendor = '', storedCostOfAmount = '', storedLaptopId=''

export default class LaptopLeasePresenter {
  constructor (container) {
    this.validateLaptopLeaseInteractor = new ValidateLaptopLeaseInteractor(container.get('HRBenefitsClient'))
    this.addLaptopLeaseInteractor = new AddLaptopLeaseInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setAmount (amount) {
    storedAmount = amount
    this.view.setAmount(amount)
  }

  setTerms (terms) {
    storedTerms = terms
    this.view.setTerms(terms)
  }

  setLaptopModel (laptopModel) {
    storedLaptopModel = laptopModel
    this.view.setLaptopModel(laptopModel)
  }

  setFile (file) {
    storedFile = file
  }

  setDeliveryOption (deliveryOption) {
    storedDeliveryOption = deliveryOption
    this.view.setDeliveryOption(deliveryOption)
  }

  setOrDate (orDate) {
    storedOrDate = orDate
    this.view.setOrDate(orDate)
  }

  setOrNumber (orNumber) {
    storedOrNumber = orNumber
    this.view.setOrNumber(orNumber)
  }

  setVendor (vendor) {
    storedVendor = vendor
    this.view.setVendor(vendor)
  }

  setLaptopId (id) {
    storedLaptopId = id
    this.view.setLaptopId(id)
  }

  resetValue () {
    this.view.setLaptopBrand('')
    this.view.setLaptopModel('')
    this.view.setLaptopId(null)
    this.view.setAmount('')
    this.view.setTerms('')
    this.view.setVendor('')
    this.view.setDeliveryOption('')
    this.view.setFile('')
    this.view.setOrDate('')
    this.view.setOrNumber('')
  }

  validateLaptopLease () {
    this.view.showLoading()
    this.validateLaptopLeaseInteractor.execute()
    .map(data => {
      let arrayOption = []
      let laptopDetailsOption = []
      let attachmetsOption = []
      data &&
      data.deliveryOptions.map((resp, key) => (
        arrayOption.push({
          id : resp.id,
          name : resp.address
        })
      ))

      data &&
      data.attachments.map((resp, key) => (
        attachmetsOption.push({
          id: key,
          name: resp
        })
      ))

      data &&
      data.laptopDetails.map((resp, key) => (
        laptopDetailsOption.push({
          id: resp.id,
          name: resp.name,
          details: {
            specification: resp.specification,
            supplier: resp.supplier,
            unitPrice: resp.unitPrice,
            warranty: resp.warranty
          }
        })
      ))

      return data = {
        attachments: attachmetsOption,
        isValid: data.isValid === 1 ? true : false,
        deliveryOptions: arrayOption,
        laptopDetails: laptopDetailsOption,
      }

    })
    .subscribe(data => {
      this.view.isLaptopLeaseValidate(data.isValid)
      this.view.setDeliveryOptionList(data.deliveryOptions)
      this.view.setLaptopModelList(data.laptopDetails)
      this.view.setAttachment(data.attachments)
      this.view.hideLoading()
    }, error => {
      this.view.hideLoading()
      this.view.navigate()
    })
  }

  validateSubmission (getCardOptionId) {

    let validateAttachments = false
    storedFile && storedFile.map(
      (storedFile, key) => {
        if(!storedFile.file) {
          validateAttachments = true
        }
      }
    )

    try {
      if(getCardOptionId.toString() === '1') {
        store.dispatch(NotifyActions.resetNotify())
         if (storedLaptopModel.id === null){
            store.dispatch(NotifyActions.addNotify({
              message : 'Laptop Model is Required',
              type : 'warning',
              duration : 2000
            })
          )
        }   else if (storedDeliveryOption === '') {
            store.dispatch(NotifyActions.addNotify({
             title: 'Laptop Lease',
             message : 'Please choose the destination of item',
             type : 'warning',
             duration : 2000
           })
         )
       } else if (storedTerms === '') {
            store.dispatch(NotifyActions.addNotify({
             title: 'Laptop Lease',
             message : 'Please choose to Payment Terms',
             type : 'warning',
             duration : 2000
           })
         )
        } else if(  storedFile === '' ){
          store.dispatch(NotifyActions.addNotify({
             title: 'Laptop Lease',
             message : 'Attachment required',
             type : 'warning',
             duration : 2000
           })
         )
        } else if (validateAttachments) {
          storedFile && storedFile.map(
            (storedFile, key) => {
              if(!storedFile.file) {
                store.dispatch(NotifyActions.addNotify({
                   title : 'Loptop Lease' ,
                   message : storedFile.name + ' is required',
                   type : 'warning',
                   duration : 2000
                 })
               )
              }
            }
          )
        } else {
          this.view.validateInput()
        }
      } else {
        store.dispatch(NotifyActions.resetNotify())
        if (storedOrNumber === '') {
         store.dispatch(NotifyActions.addNotify({
            title: 'Laptop Lease',
            message : 'Please specify your Official Receipt Number',
            type : 'warning',
            duration : 2000
          })
        )
       } else if(storedOrDate === '') {
          store.dispatch(NotifyActions.addNotify({
             title: 'Laptop Lease',
             message : 'Please specify the Date of Receipt',
             type : 'warning',
             duration : 2000
           })
         )
       } else if (storedVendor === '') {
         store.dispatch(NotifyActions.addNotify({
            title: 'Laptop Lease',
            message : 'Please include the Vendor',
            type : 'warning',
            duration : 2000
          })
        )
      } else if(  storedFile === '' ){
        store.dispatch(NotifyActions.addNotify({
           title: 'Laptop Lease',
           message : 'Attachment required',
           type : 'warning',
           duration : 2000
         })
       )
      } else if (validateAttachments) {
        storedFile && storedFile.map(
          (storedFile, key) => {
            if(!storedFile.file) {
              store.dispatch(NotifyActions.addNotify({
                 title : 'Loptop Lease' ,
                 message : storedFile.name + ' is required',
                 type : 'warning',
                 duration : 2000
               })
             )
            }
          }
        )
      } else if (storedAmount === '' || storedAmount < 1) {
         store.dispatch(NotifyActions.addNotify({
            title: 'Laptop Lease',
            message : 'Estimated Cost must be greater than 0',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (storedTerms === '') {
        store.dispatch(NotifyActions.addNotify({
           title: 'Laptop Lease',
           message : 'Please specify your payment method',
           type : 'warning',
           duration : 2000
         })
       )
     }   else {
          this.view.validateInput()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  addLaptopLease (getCardOptionId) {
    try {
      this.view.showLoading()
      this.addLaptopLeaseInteractor.execute(AddLaptopLeaseParam(
        getCardOptionId,
        storedAmount,
        storedTerms,
        storedDeliveryOption,
        storedFile,
        storedOrNumber,
        storedVendor,
        moment(storedOrDate).format('MM/DD/YYYY'),
        storedLaptopId
      ))
      .subscribe(data => {
        this.view.noticeOfUndertaking(data)
        this.view.hideLoading()
        }, e => {
        this.view.hideLoading()
      })
    } catch (e) {
      console.log(e)
    }
  }
}
