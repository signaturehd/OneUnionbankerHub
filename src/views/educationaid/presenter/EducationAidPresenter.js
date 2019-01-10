import AddEducationAidInteractor from '../../../domain/interactor/educationAid/AddEducationAidInteractor'
import validateAidInteractor from '../../../domain/interactor/educationAid/validateAidInteractor'
import educationAidParam from '../../../domain/param/AddEducationAidParam'
import moment from 'moment'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

let academicYear = []

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
     this.view.hideCircularLoader()
   })
 }

 setAcademicYear () {
   let futureYear = parseInt(moment().add(1,'years').format('YYYY'))
   let currentYear = parseInt(moment().format('YYYY'))
   let minimumYear = parseInt(moment().subtract(2,'years').format('YYYY'))
   let rangeTo = futureYear - minimumYear
   let rangeFrom = currentYear - minimumYear
   let fromData = []
   let toData = []
   for (let count = 0; count <= rangeTo; count++) {
     toData.push({
       id: count,
       name: futureYear--
     })
   }
   for (let count = 0; count <= rangeFrom; count++) {
     fromData.push({
       id: count,
       name: currentYear--
     })
   }
   this.view.setAcademicYear(fromData, toData)
 }


 validateAid () {
   this.setAcademicYear()
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
