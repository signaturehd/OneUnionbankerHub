import AddEducationAidInteractor from '../../../domain/interactor/educationAid/AddEducationAidInteractor'
import validateAidInteractor from '../../../domain/interactor/educationAid/validateAidInteractor'
import educationAidParam from '../../../domain/param/AddEducationAidParam'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

export default class EducationAidPresenter {

 constructor (container) {
   this.validateAidInteractor = new validateAidInteractor(container.get('HRBenefitsClient'))
   this.addEducationAidInteractor = new AddEducationAidInteractor(container.get('HRBenefitsClient'))
 }

 setView (view) {
  this.view = view
 }

 addEducationAid (
   courseText,
   academicYearText,
   semesterText,
   gwaText,
   tuitionFeeText,
   registrationFeeText,
   schoolId,
   orDate,
   orNumber,
   fileAttachments) {
   this.view.showCircularLoader()
  this.addEducationAidInteractor.execute(educationAidParam(
    courseText,
    academicYearText,
    semesterText,
    gwaText,
    tuitionFeeText,
    registrationFeeText,
    schoolId,
    orDate,
    orNumber,
    fileAttachments
    )
  )
   .subscribe(educationAid => {
     this.view.noticeOfUndertaking(educationAid)
     this.view.hideCircularLoader()
   }, e => {
     this.view.noticeResponse(e)
     this.view.hideCircularLoader()
   })
 }

 validateAid () {
   this.view.showCircularLoader()
   this.validateAidInteractor.execute()
   .map(data => {
     let schoolsArray = []
     let attachmentArray = []

     data &&
     data.schools.map((schools, key) => {
       schoolsArray.push({
         id : schools.id,
         name : schools.name,
         computations : schools.computations
       })
     })

     data &&
     data.attachments.map((attachment, key) => {
       attachmentArray.push({
         name : attachment
       })
     })
     this.view.showAttachmentsMap(attachmentArray)
     this.view.showValidatedAid(data)
     this.view.showSchoolsMap(schoolsArray)
   })
   .subscribe(
       educationAid => {
         this.view.hideCircularLoader()
       },
       error => {
         this.view.navigate()
      }
   )
 }
}
