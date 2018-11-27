/* GET */
import GetProgramsInteractor from '../../../domain/interactor/pay/GetProgramsInteractor'
import GetPaySkillsListInteractor from '../../../domain/interactor/pay/GetPaySkillsListInteractor'
/* POST */
import AddPaySkillsInteractor from '../../../domain/interactor/pay/AddPaySkillsInteractor'

/* Param */
import AddPaySkillsParam from '../../../domain/param/AddPaySkillsParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'
import moment from 'moment'

/* Variables */
let storedDateOfCompletion = '', storedProgramObject = '', storedAttachments = [], storedAccreditationObject = ''
let dummyData = [
   {
      "id":15,
      "status":{
         "id":31,
         "status":"For Review"
      },
      "program":{
         "id":1,
         "program":"BrM Certification"
      },
      "dateOfCompletion":"2018-11-27Z",
      "accreditingBodyId":{
         "id":1,
         "accreditingBody":"UnionBank of the Philippines"
      },
      "others":""
   },
   {
      "id":16,
      "status":{
         "id":31,
         "status":"For Review"
      },
      "program":{
         "id":2,
         "program":"Certified in the Governance of Enterprise IT (CGEIT)"
      },
      "dateOfCompletion":"2018-11-27Z",
      "accreditingBodyId":{
         "id":2,
         "accreditingBody":"ISACA"
      },
      "others":""
   },
   {
      "id":25,
      "status":{
         "id":31,
         "status":"For Review"
      },
      "program":{
         "id":20,
         "program":"Treasury Certification Program"
      },
      "dateOfCompletion":"2018-11-02Z",
      "accreditingBodyId":{
         "id":20,
         "accreditingBody":"Ateneo BAP Institute of Banking"
      },
      "others":""
   },
   {
      "id":24,
      "status":{
         "id":31,
         "status":"For Review"
      },
      "program":{
         "id":20,
         "program":"Treasury Certification Program"
      },
      "dateOfCompletion":"2018-11-02Z",
      "accreditingBodyId":{
         "id":21,
         "accreditingBody":"Others"
      },
      "others":"PayForSkillsForTesting"
   }
]
export default class PayForSkillsPresenter {
  constructor (container) {
    this.getProgramsInteractor = new GetProgramsInteractor(container.get('HRBenefitsClient'))
    this.getPaySkillsListInteractor = new GetPaySkillsListInteractor(container.get('HRBenefitsClient'))
    this.addPaySkillsInteractor = new AddPaySkillsInteractor(container.get('HRBenefitsClient'))
  }

  setView (view) {
    this.view = view
  }

  setStoredDateOfCompletion (data) {
    storedDateOfCompletion = data
    this.view.setDateOfCompletion(data)
  }

  setStoredAttachments (data) {
    storedAttachments = data
    this.view.setAttachmentsArray(data)
  }

  setStoredProgramObject (data) {
    storedProgramObject = data
    this.view.setProgramsBody(data)
  }

  setStoredAccreditationObject (data) {
    storedAccreditationObject = data
    this.view.setAccreditingBody(data)
  }

  getPaySkills () {
    this.view.checkLoader(true)
    this.getProgramsInteractor.execute()
    .subscribe(data => {
      this.view.checkLoader(false)
      this.view.setAccrediting(data.accreditingBody)
      this.view.setPrograms(data.program)
    }, error => {
      this.view.checkLoader(false)
    })
  }

  getPaySkillsList () {
    this.view.checkLoader(true)
    this.view.setPayForSkillsList(dummyData)
    this.getPaySkillsListInteractor.execute()
    .subscribe(data => {
      this.view.setPayForSkillsList(data)
    }, error => {
      this.view.checkLoader(false)
    })
  }

  validateInput () {

    let validateAttachments = false
    storedAttachments && storedAttachments.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    if(storedProgramObject === '') {
      store.dispatch(NotifyActions.addNotify({
        title: 'Pay For Skills',
        message : 'Please select programs',
        type: 'warning',
        duration: 5000,
      }))
    } else if(storedDateOfCompletion === '') {
      store.dispatch(NotifyActions.addNotify({
        title: 'Pay For Skills',
        message : 'Please select Date of Completion',
        type: 'warning',
        duration: 5000,
      }))
    } else if(storedAccreditationObject === '') {
      store.dispatch(NotifyActions.addNotify({
        title: 'Pay For Skills',
        message : 'Please select Accreditation Body',
        type: 'warning',
        duration: 5000,
      }))
    }else if (!storedAttachments.length) {
       store.dispatch(NotifyActions.addNotify({
          title : 'Pay For Skills' ,
          message : 'Attachments is required',
          type : 'warning',
          duration : 5000
        })
      )
    } else if (validateAttachments) {
      storedAttachments && storedAttachments.map(
        (attachment, key) => {
          if(!attachment.file) {
            store.dispatch(NotifyActions.addNotify({
               title : 'My Pay For Skills',
               message : attachment.name + ' is required',
               type : 'warning',
               duration : 5000
             })
           )
          }
        }
      )
    } else {
      this.view.setEditable(true)
    }
  }


  submitPaySkills () {
    this.view.checkLoader(true)
    this.addPaySkillsInteractor.execute(AddPaySkillsParam(
      storedProgramObject.id,
      moment(storedDateOfCompletion).format('YYYY-MM-DD'),
      storedAccreditationObject.id,
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
