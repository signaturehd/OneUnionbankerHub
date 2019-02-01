/* GET */
import GetPurposeCoeTypeInteractor from '../../../domain/interactor/coe/GetPurposeCoeTypeInteractor'
import GetCountryCoeTypeInteractor from '../../../domain/interactor/coe/GetCountryCoeTypeInteractor'
/* POST */
import AddCertificateOfEmploymentInteractor from '../../../domain/interactor/coe/AddCertificateOfEmploymentInteractor'
/* Param */
import AddCoeParam from '../../../domain/param/AddCoeParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'
import moment from 'moment'

/* Variables */
let storedTypeOFCoeObject = '', storedPurposeObject = '', storedVisaObject = ''
let storedApprovedVLFrom = '', storedApprovedVLTo = '', storedVLTo = '', storedVLFrom = ''

let withSalary = [
  {
    id: 0,
    name: 'With Salary'
  }, {
    id : 1,
    name : 'Without Salary'
  }, {
    id : 3,
    name: 'With Salary w/ Approved Vacation Leave'
  }, {
    id: 4,
    name : 'With Salary w/ Available Leave Balance'
  }
]

export default class CertificateOfEmploymentPresenter {
  constructor (container) {
    this.getPurposeCoeTypeInteractor = new GetPurposeCoeTypeInteractor(container.get('HRBenefitsClient'))
    this.getCountryCoeTypeInteractor = new GetCountryCoeTypeInteractor(container.get('HRBenefitsClient'))
    this.addCertificateOfEmploymentInteractor = new AddCertificateOfEmploymentInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setStoredTypeOFCoeObject (data) {
    storedTypeOFCoeObject = data
    this.view.setTypeOfCoeBody(data)
  }

  setStoredVisaObject (data) {
    storedVisaObject = data
    this.view.setVisaBody(data)
  }

  setStoredPurposeObject (data) {
    storedPurposeObject = data
    this.view.setPurposeBody(data)
  }

  setStoredVLFrom (data) {
    storedVLFrom = data
    this.view.setVLFromBody(data)
  }

  setStoredVLTo (data) {
    storedVLTo = data
    this.view.setVLToBody(data)
  }

  getCoeSalary () {
    this.view.setTypeOfCoe(withSalary)
  }

  getPurposeCoeType () {
    this.view.checkLoader(true)
    this.getPurposeCoeTypeInteractor.execute('purpose')
    .subscribe(data => {
      this.view.checkLoader(false)
      let newPurposeArray = []
      data && data.records.map((resp) => {
        const newObjectArray = [...newPurposeArray]
        const objectParam = {
          id : resp.id,
          name : resp.purpose,
        }
        newObjectArray.push(objectParam)
        newPurposeArray = newObjectArray
      })
      this.view.setPurpose(newPurposeArray)
    }, error => {
      this.view.checkLoader(false)
    })
  }

  getCountryCoeType () {
    this.view.checkLoader(true)
    this.getCountryCoeTypeInteractor.execute('country')
    .subscribe(data => {
      this.view.checkLoader(false)
      let newPurposeArray = []
      data && data.records.map((resp) => {
        const newObjectArray = [...newPurposeArray]
        const objectParam = {
          id : resp.id,
          name : resp.country,
        }
        newObjectArray.push(objectParam)
        newPurposeArray = newObjectArray
      })
      this.view.setVisa(newPurposeArray)
    }, error => {
      this.view.checkLoader(false)
    })
  }

  validateInput(){
    if(storedTypeOFCoeObject.id === 3) {
      if(storedTypeOFCoeObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select the type of Certificate of Employment',
          type: 'warning',
          duration: 5000,
        }))
      } else if(storedPurposeObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select Purpose',
          type: 'warning',
          duration: 5000,
        }))
      } else if(storedPurposeObject.id === 38) {
          if(storedVisaObject === ''){
              store.dispatch(NotifyActions.addNotify({
              title: 'Certificate of Employment',
              message : 'Please select Country',
              type: 'warning',
              duration: 5000,
            }))
          } else if (storedVisaObject === '') {
            store.dispatch(NotifyActions.addNotify({
              title: 'Certificate of Employment',
              message : 'Please select VISA',
              type: 'warning',
              duration: 5000,
            }))
          } else {
            if(storedVLFrom === '' || !storedVLFrom) {
            store.dispatch(NotifyActions.addNotify({
              title: 'Certificate of Employment',
              message : 'Please select VL Date From field',
              type: 'warning',
              duration: 5000,
            }))
          } else if(storedVLTo === '' || !storedVLTo) {
            store.dispatch(NotifyActions.addNotify({
              title: 'Certificate of Employment',
              message : 'Please select VL Date To field',
              type: 'warning',
              duration: 5000,
            }))
          }else{
              this.view.setEditable(true)
          }
        }
      } else if(storedVLFrom === '') {
          store.dispatch(NotifyActions.addNotify({
            title: 'Certificate of Employment',
            message : 'Please select VL Date From field',
            type: 'warning',
            duration: 5000,
          }))
      } else if(storedVLTo === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select VL Date To field',
          type: 'warning',
          duration: 5000,
        }))
      } else {
        if(storedVLFrom === '' || !storedVLFrom) {
            store.dispatch(NotifyActions.addNotify({
              title: 'Certificate of Employment',
              message : 'Please select VL Date From field',
              type: 'warning',
              duration: 5000,
            }))
        } else if(storedVLTo === '' || !storedVLTo) {
          store.dispatch(NotifyActions.addNotify({
            title: 'Certificate of Employment',
            message : 'Please select VL Date To field',
            type: 'warning',
            duration: 5000,
          }))
        }else{
            this.view.setEditable(true)
        }

      }
    }else if (storedTypeOFCoeObject.id === 3) {
      if(storedTypeOFCoeObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select the type of Certificate of Employment',
          type: 'warning',
          duration: 5000,
        }))
      } else if(storedPurposeObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select Purpose',
          type: 'warning',
          duration: 5000,
        }))
      } else if(storedVLFrom === '' || !storedVLFrom) {
          store.dispatch(NotifyActions.addNotify({
            title: 'Certificate of Employment',
            message : 'Please select VL Date From field',
            type: 'warning',
            duration: 5000,
          }))
      } else if(storedVLTo === '' || !storedVLTo) {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select VL Date To field',
          type: 'warning',
          duration: 5000,
        }))
      } else {
        this.view.setEditable(true)
      }
    } else if (storedPurposeObject.id === 38) {
      if(storedTypeOFCoeObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select the type of Certificate of Employment',
          type: 'warning',
          duration: 5000,
        }))
      } else if(storedPurposeObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select Purpose',
          type: 'warning',
          duration: 5000,
        }))
      } else if(storedVisaObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select Country',
          type: 'warning',
          duration: 5000,
        }))
      } else if(storedVisaObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select VISA',
          type: 'warning',
          duration: 5000,
        }))
      } else {
        this.view.setEditable(true)
      }
    } else {
      if(storedTypeOFCoeObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select the type of Certificate of Employment',
          type: 'warning',
          duration: 5000,
        }))
      } else if(storedPurposeObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select Purpose',
          type: 'warning',
          duration: 5000,
        }))
      } else {
        this.view.setEditable(true)
      }
    }
  }

  submitCoe () {
    this.view.checkLoader(true)
    this.addCertificateOfEmploymentInteractor.execute(AddCoeParam(
      storedPurposeObject.id,
      storedVisaObject.id,
      storedTypeOFCoeObject.type,
      moment(storedVLFrom).format('MM/DD/YYYY') === 'Invalid date' ? '' : moment(storedVLFrom).format('MM/DD/YYYY'),
      moment(storedVLTo).format('MM/DD/YYYY') === 'Invalid date' ? '' : moment(storedVLTo).format('MM/DD/YYYY')
    ))
    .subscribe(data => {
      this.view.checkLoader(false)
      store.dispatch(NotifyActions.addNotify({
         title : 'Successfully Added',
         message : data.message,
         type : 'success',
         duration : 7000
       })
     )
     this.setStoredVisaObject('')
     this.setStoredTypeOFCoeObject('')
     this.setStoredPurposeObject('')
     this.setStoredVLFrom('')
     this.setStoredVLTo('')
     this.view.navigateLearning()
     this.view.backToList()
    }, error => {
      this.view.checkLoader(false)
    })
  }
}
