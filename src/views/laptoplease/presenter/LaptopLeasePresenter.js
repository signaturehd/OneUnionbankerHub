import ValidateLaptopLeaseInteractor from
'../../../domain/interactor/laptoplease/ValidateLaptopLeaseInteractor'

import AddLaptopLeaseInteractor from
'../../../domain/interactor/laptoplease/AddLaptopLeaseInteractor'

import AddLaptopLeaseParam from '../../../domain/param/AddLaptopLeaseParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

import moment from 'moment'

let storedAmount = '', storedTerms = '', storedColor = '', storedDeliveryOption = '', storedLaptopBrand = '', storedLaptopModel = '', storedScreenSize = '', storedFile
let storedGraphicsCard = '', storedHardDriveCapacity = '', storedProcessorType = '', storedOperatingSystem = '', storedSystemMemory = ''
let storedOrDate = '', storedOrNumber = '', storedVendor = '', storedCostOfAmount = ''

export default class LaptopLeasePresenter {
  constructor (container) {
    this.validateLaptopLeaseInteractor = new ValidateLaptopLeaseInteractor(container.get('HRBenefitsClient'))
    this.addLaptopLeaseInteractor = new AddLaptopLeaseInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setColor (color) {
    storedColor = color
    this.view.setColor(color)
  }

  setAmount (amount) {
    storedAmount = amount
    this.view.setAmount(amount)
  }

  setTerms (terms) {
    storedTerms = terms
    this.view.setTerms(terms)
  }

  setLaptopBrand (laptopBrand) {
    storedLaptopBrand = laptopBrand
    this.view.setLaptopBrand(laptopBrand)
  }

  setLaptopModel (laptopModel) {
    storedLaptopModel = laptopModel
    this.view.setLaptopModel(laptopModel)
  }

  setScreenSize (screenSize) {
    storedScreenSize = screenSize
    this.view.setScreenSize(screenSize)
  }

  setHardDriveCapacity (hardDrive) {
    storedHardDriveCapacity = hardDrive
    this.view.setHardDriveCapacity(hardDrive)
  }

  setGraphicsCard (graphicsCard) {
    storedGraphicsCard = graphicsCard
    this.view.setGraphicsCard(graphicsCard)
  }

  setProcessorType (processorType) {
    storedProcessorType = processorType
    this.view.setProcessorType(processorType)
  }

  setOperatingSystem (operatingSystem) {
    storedOperatingSystem = operatingSystem
    this.view.setOperatingSystem(operatingSystem)
  }

  setSystemMemory (systemMemory) {
    storedSystemMemory = systemMemory
    this.view.setSystemMemory(systemMemory)
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
    this.view.setVendor(storedVendor)
  }

  setCostOfAmount (amount) {
    storedCostOfAmount = amount
    this.view.setCostOfAmount(amount)
  }

  validateLaptopLease () {
    this.view.showCircularLoader()
    this.validateLaptopLeaseInteractor.execute()
    .map(data => {
      let arrayOption = []
      data &&
      data.deliveryOptions.map((resp, key) => (
        arrayOption.push({
          id : resp.id,
          name : resp.address
        })
      ))

      return data = {
        attachments: [{
          name: 'Laptop Quotation'
        }],
        isValid: data.isValid == 1 ? true : false,
        deliveryOptions: arrayOption
      }

    })
    .subscribe(data => {
      this.view.isLaptopLeaseValidate(data.isValid)
      this.view.setDeliveryOptionList(data.deliveryOptions)
      this.view.setAttachment(data.attachments)
      this.view.hideCircularLoader()
    }, error => {
      this.view.hideCircularLoader()
      this.view.navigate()
    })
  }

  validateSubmission (getCardOptionId) {
    try {
      if(getCardOptionId.toString() === '0') {
        store.dispatch(NotifyActions.resetNotify())
        if (storedAmount === '' || storedAmount < 1) {
           store.dispatch(NotifyActions.addNotify({
              title: 'Laptop Lease',
              message : 'Estimated Cost must be greater than 0',
              type : 'warning',
              duration : 2000
            })
          )
        } else if (!storedLaptopBrand) {
            store.dispatch(NotifyActions.addNotify({
                message : 'Laptop Brand is Required',
                type : 'warning',
                duration : 2000
              })
            )
        } else if (!storedLaptopModel){
            store.dispatch(NotifyActions.addNotify({
              message : 'Laptop Model is Required',
              type : 'warning',
              duration : 2000
            })
          )
        } else if (!storedScreenSize){
            store.dispatch(NotifyActions.addNotify({
              message : 'Laptop Screen Size is Required',
              type : 'warning',
              duration : 2000
            })
          )
        } else if (storedColor === '') {
        store.dispatch(NotifyActions.addNotify({
           title: 'Laptop Lease',
           message : 'Please specify the color of laptop',
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
      } else if (storedGraphicsCard === '') {
        store.dispatch(NotifyActions.addNotify({
           title: 'Laptop Lease',
           message : 'Please specify the Graphics Card',
           type : 'warning',
           duration : 2000
         })
       )
     } else if (storedHardDriveCapacity === '') {
       store.dispatch(NotifyActions.addNotify({
          title: 'Laptop Lease',
          message : 'Please specify the capacity of Hard Drive',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (storedProcessorType === '') {
      store.dispatch(NotifyActions.addNotify({
         title: 'Laptop Lease',
         message : 'Please specify the type of Processor',
         type : 'warning',
         duration : 2000
       })
     )
    } else if (storedOperatingSystem === '') {
      store.dispatch(NotifyActions.addNotify({
         title: 'Laptop Lease',
         message : 'Please specify the Operating System',
         type : 'warning',
         duration : 2000
       })
     )
    } else if (storedSystemMemory === '') {
      store.dispatch(NotifyActions.addNotify({
         title: 'Laptop Lease',
         message : 'Please specify the System Memory',
         type : 'warning',
         duration : 2000
       })
     )
    } else if (storedDeliveryOption === '') {
        store.dispatch(NotifyActions.addNotify({
           title: 'Laptop Lease',
           message : 'Please choose the destination of item',
           type : 'warning',
           duration : 2000
         })
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
       } else {
          this.view.validateInput()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  addLaptopLease (getCardOptionId) {
    try {
      this.view.showCircularLoader()
      this.addLaptopLeaseInteractor.execute(AddLaptopLeaseParam(
        getCardOptionId,
        storedLaptopBrand,
        storedLaptopModel,
        storedScreenSize,
        storedColor,
        storedAmount,
        storedTerms,
        storedDeliveryOption,
        storedGraphicsCard,
        storedHardDriveCapacity,
        storedProcessorType,
        storedOperatingSystem,
        storedSystemMemory,
        storedFile,
        storedOrNumber,
        moment(storedOrDate).format('MM/DD/YYYY')))
      .subscribe(data => {
        this.view.noticeOfUndertaking(data)
        this.view.hideCircularLoader()
        }, e => {
        this.view.hideCircularLoader()
      })
    } catch (e) {
      console.log(e)
    }
  }
}
