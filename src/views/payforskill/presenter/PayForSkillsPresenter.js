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
let storedOthers = ''

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

  setStoredOthers (data) {
    storedOthers = data
    this.view.setStoredOthers(data)
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

  // 31 - For Review 32 - Approved 33 - Reject

  getObjectConfigure (data) {
    const objectParam = {
      accreditingBody : {
        id : data.accreditingBody.id,
        name : data.accreditingBody.name,
      },
      id : data.id ? data.id : '',
      others :  data.others,
      dateOfCompletion : data.dateOfCompletion,
      program : {
        id : data.program.id,
        name : data.program.name,
        amount : data.program.amount,
        accreditingBodyId: data.program.accreditingBodyId,
        remark: data.program.remark,
        id: data.program.id,
        numberOfAttachment : data.program.numberOfAttachment
      }
    }
    return objectParam
  }

  getPaySkillsList () {
    this.view.checkLoader(true)
    this.getPaySkillsListInteractor.execute()
    .do((data) => this.view.setPayForSkillsList(data))
    .map((resp) => {
      resp && resp.map((data) => {
        try {
          if(data.status.id === 1) {
            this.view.showPayForSkillsDraft(this.getObjectConfigure(data))
          } else if (data.status.id === 31) {
            this.view.showPayForSkillsReview(this.getObjectConfigure(data))
          } else if (data.status.id === 32) {
            this.view.showPayForSkillsApproved(this.getObjectConfigure(data))
          } else if (data.status.id === 33) {
            this.view.showPayForSkillsReject(this.getObjectConfigure(data))
          }
        } catch (e) {
        }
      })
    })
    .subscribe(data => {
      this.view.checkLoader(false)
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

    if(storedAccreditationObject && storedAccreditationObject.accre.toLowerCase() !== 'others') {
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
    } else {
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
      }  else if(storedOthers === '') {
        store.dispatch(NotifyActions.addNotify({
          title: 'Pay For Skills',
          message : 'Please Specify if others',
          type: 'warning',
          duration: 5000,
        }))
      } else if (!storedAttachments.length) {
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
  }


  submitPaySkills () {
    this.view.checkLoader(true)
    this.addPaySkillsInteractor.execute(AddPaySkillsParam(
      storedProgramObject.id,
      moment(storedDateOfCompletion).format('YYYY-MM-DD'),
      storedAccreditationObject.id,
      storedOthers,
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
     storedProgramObject = ''
     storedDateOfCompletion = ''
     storedAccreditationObject = ''
     storedAccreditationObject = ''
     storedOthers = ''
     this.view.setEditable(false)
    }, error => {
      this.view.checkLoader(false)
    })
  }
}
