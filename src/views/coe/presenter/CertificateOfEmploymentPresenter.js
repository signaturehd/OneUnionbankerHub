/* GET */
import GetProgramsInteractor from '../../../domain/interactor/pay/GetProgramsInteractor'
import GetGenerictCoeTypeInteractor from '../../../domain/interactor/coe/GetGenerictCoeTypeInteractor'
/* POST */
import AddPaySkillsInteractor from '../../../domain/interactor/pay/AddPaySkillsInteractor'

/* Param */
import AddCoeParam from '../../../domain/param/AddPaySkillsParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'
import moment from 'moment'

/* Variables */
let storedTypeOFCoeObject = '', storedPurposeObject = '', storedVisaObject = ''

export default class CertificateOfEmploymentPresenter {
  constructor (container) {
    this.getProgramsInteractor = new GetProgramsInteractor(container.get('HRBenefitsClient'))
    this.addPaySkillsInteractor = new AddPaySkillsInteractor(container.get('HRBenefitsClient'))
    this.getGenerictCoeTypeInteractor = new GetGenerictCoeTypeInteractor(container.get('HRBenefitsClient'))
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

  getPaySkills () {
    this.view.checkLoader(true)
    this.getProgramsInteractor.execute()
    .subscribe(data => {
      this.view.checkLoader(false)
      this.view.setPurpose('')
      this.view.setTypeOfCoe('')
      this.view.setVisa('')
    }, error => {
      this.view.checkLoader(false)
    })
  }

  getCoePurpose () {
    this.view.checkLoader(true)
    this.getGenerictCoeTypeInteractor.execute('purpose')
    .subscribe(data => {
      this.view.checkLoader(false)
      this.view.setPurpose('')
      this.view.setTypeOfCoe('')
      this.view.setVisa('')
    }, error => {
      this.view.checkLoader(false)
    })
  }

  getCoePurpose () {
    this.view.checkLoader(true)
    this.getGenerictCoeTypeInteractor.execute('country')
    .subscribe(data => {
      this.view.checkLoader(false)
      this.view.setPurpose('')
      this.view.setTypeOfCoe('')
      this.view.setVisa('')
    }, error => {
      this.view.checkLoader(false)
    })
  }

  validateInput () {

    if(storedTypeOFCoeObject === '') {
      store.dispatch(NotifyActions.addNotify({
        title: 'Certificate of Employment',
        message : 'Please select the type of Certificate of Employment',
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
