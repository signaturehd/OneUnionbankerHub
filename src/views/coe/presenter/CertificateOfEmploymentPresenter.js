/* GET */
import GetPurposeCoeTypeInteractor from '../../../domain/interactor/coe/GetPurposeCoeTypeInteractor'
import GetCountryCoeTypeInteractor from '../../../domain/interactor/coe/GetCountryCoeTypeInteractor'
/* POST */

/* Param */
import AddCoeParam from '../../../domain/param/AddPaySkillsParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'
import moment from 'moment'

/* Variables */
let storedTypeOFCoeObject = '', storedPurposeObject = '', storedVisaObject = ''

let withSalary = [
  {
    id: 0,
    name: 'With Salary'
  }, {
    id : 1,
    name : 'Without Salary'
  }
]

export default class CertificateOfEmploymentPresenter {
  constructor (container) {
    this.getPurposeCoeTypeInteractor = new GetPurposeCoeTypeInteractor(container.get('HRBenefitsClient'))
    this.getCountryCoeTypeInteractor = new GetCountryCoeTypeInteractor(container.get('HRBenefitsClient'))
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

  validateInput () {
    if(storedPurposeObject && storedPurposeObject.purpose !== 37) {
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
      } else if(storedVisaObject === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Certificate of Employment',
          message : 'Please select the VISA',
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
    this.addPaySkillsInteractor.execute(AddCoeParam(
      storedTypeOFCoeObject.id,
      moment(storedDateOfCompletion).format('YYYY-MM-DD'),
      storedPurposeObject.id,
      storedAttachments
    ))
    .subscribe(data => {
      this.view.checkLoader(false)
      store.dispatch(NotifyActions.addNotify({
         title : 'Successfully Added',
         message : data.message,
         type : 'success',
         duration : 5000
       })
     )
     this.view.navigateLearning()
    }, error => {
      this.view.checkLoader(false)
    })
  }
}
