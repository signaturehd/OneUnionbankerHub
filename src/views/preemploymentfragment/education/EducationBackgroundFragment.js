import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/EducationBackgroundPresenter'

import {
  GenericButton,
  CircularLoader,
  Card,
  Line,
  Modal
} from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'

import EducationMultipleCardComponent from './components/EducationMultipleCardComponent'
import EducationVerificationComponent from './components/EducationVerificationComponent'
import EducationBackgroundModal from './modals/EducationBackgroundModal'

import moment from 'moment'
import { format } from '../../../utils/numberUtils'

import { RequiredValidation } from '../../../utils/validate/'

import { Progress } from 'react-sweet-progress'

import * as func from './functions/EducationFunctions'

class EducationBackgroundFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      updateMode : false,
      enabledLoader : false,
      showEditSubmitButton : false,
      showEducationFormModal : false,
      showSchoolsModal : false,
      showDegreeModal : false,
      showNoticeResponseModal : false,
      showPdfViewComponent : false,
      enabledLoaderPdfModal : false,
      noticeResponse : '',
      pdfFile : '',
      pdfFileUrl : '',
      isUpdated : 0,
      schools : [],
      torFormData: [{
        name : 'Transcript of Records'
      }],
      educId : '',
      count : 2,
      schoolId : '',
      schoolName : '',
      studentNo : '',
      startYear : '',
      endYear : '',
      term : '',
      degree : '',
      honor : '',
      course : '',
      address : '',
      index : 4,
      schoolPageNumber: 1,
      schoolFind : '',
      schoolViewMore : 'View more',
      viewMoreText : 'View more',
      schoolNameErrorMessage : '',
      studentNoErrorMessage : '',
      addressErrorMessage : '',
      degreeErrorMessage : '',
      courseErrorMessage : '',
      termErrorMessage : '',
      honorErrorMessage : '',
      startYearErrorMessage : '',
      endYearErrorMessage : ''
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(4)
    this.presenter.getEmployeeSchool(this.state.schoolPageNumber, this.state.schoolFind)
  }

  callBackEducationPresenter () {
    this.props.educationPresenter()
  }

  onShowEducationFormModalFunc () {
    this.setState({
      showEducationFormModal : true,
      schoolName : '',
      studentNo : '',
      startYear : '',
      endYear : '',
      term : '',
      degree : '',
      honor : '',
      course : '',
      address : '',
      isUpdated : 0,
      updateMode : false
    })
  }

  /* Data Implementation */

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse , showNoticeResponseModal : true})
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }

  onCheckedPdf () {
    this.setState({ enabledLoaderPdfModal : true })
    this.presenter.getSchoolRecordVerificationForm()
  }

  showPdfFileView (pdfFile) {
    this.setState({ pdfFile, showPdfViewComponent : true })
  }

  showPdfFileUrl (pdfFileUrl) {
    let url = pdfFileUrl.url + ''
      this.presenter.getOnBoardingAttachments(url)
  }

  checkedSchoolData(resp) {
    this.setState({ schools : resp })
  }

  updateSchoolData (resp) {
    const { schools } = this.state
    const tempArray = [...schools]
    tempArray.push(resp)
    this.setState({ schools : tempArray })
  }

  /* validation amd submission */

  studentNoFunc(studentNo) {
    const validate = func.checkValidateNumber(studentNo)
    this.setState({ studentNo: validate, studentNoErrorMessage : '' })
  }

  termFunc(term) {
    const validate = func.checkNoSymbol(term)
    this.setState({ term : validate, termErrorMessage : ''})
  }

  degreeFunc(id, degree) {
    this.setState({ degree, showDegreeModal : false, degreeErrorMessage : ''})
  }

  honorFunc(honor) {
    this.setState({ honor, honorErrorMessage : '' })
  }

  courseFunc(course) {
    const validate = func.checkNoSymbol(course)
    this.setState({ course: validate, courseErrorMessage : '' })
  }

  addressFunc(address) {
    const validate = func.checkNoSymbol(address)
    this.setState({ address: validate, addressErrorMessage : '' })
  }

  startYearFunc(startYear) {
    this.setState({ startYear })
  }

  startYearValidate(value) {
    if(value.length === 4) {
      if(value <= moment().format('YYYY')) {
        this.setState({ startYearErrorMessage : '' })
      } else {
        this.setState({ startYearErrorMessage : 'Future year is not valid.' })
      }
    } else {
      this.setState({ startYearErrorMessage : 'Please input a valid year.' })
    }
  }

  endYearFunc(endYear) {
    this.setState({ endYear })
  }

  endYearValidate(value) {
    const { startYear } = this.state
    if(value.length === 4 && value >= startYear) {
      if(value <= moment().format('YYYY')) {
        this.setState({ endYearErrorMessage : '' })
      } else {
        this.setState({ endYearErrorMessage : 'Future year is not valid.' })
      }
    } else {
      this.setState({ endYearErrorMessage : 'Please input a valid year.' })
    }
  }

  validateRequired(value) {
    const validate = new RequiredValidation().isValid(value)
    return validate ? true : false
  }

  submission () {
    const {
      updateMode,
      educId,
      schoolName,
      studentNo,
      startYear,
      endYear,
      term,
      degree,
      honor,
      course,
      address,
      isUpdated,
      torFormData
    } = this.state

    if(!this.validateRequired(schoolName)) {
      this.setState({ schoolNameErrorMessage : 'Required field' })
    } else if(!this.validateRequired(address)) {
      this.setState({ addressErrorMessage : 'Required field' })
    } else if(!this.validateRequired(studentNo)) {
      this.setState({ studentNoErrorMessage : 'Required field' })
    } else if(!this.validateRequired(degree)) {
      this.setState({ degreeErrorMessage : 'Required field' })
    } else if(!this.validateRequired(course)) {
      this.setState({ courseErrorMessage : 'Required field' })
    } else if(!this.validateRequired(term)) {
      this.setState({ termErrorMessage : 'Required field' })
    } else if(!this.validateRequired(honor)) {
      this.setState({ honorErrorMessage : 'Required field' })
    } else if(!this.validateRequired(startYear)) {
      this.setState({ startYearErrorMessage : 'Required field' })
    } else if(!this.validateRequired(endYear)) {
      this.setState({ endYearErrorMessage : 'Required field' })
    } else {
      if(updateMode) {
        this.presenter.putEducationSchool(
          educId,
          schoolName,
          studentNo,
          startYear,
          endYear,
          term,
          degree,
          honor,
          course,
          address,
          isUpdated,
          torFormData)
        this.setState({ showEducationFormModal : false })
        this.setState({
          educId : '',
          schoolName : '',
          studentNo : '',
          startYear : '',
          endYear : '',
          term : '',
          degree : '',
          honor : '',
          course : '',
          address : '',
          isUpdated : 0,
          updateMode : false
        })
      } else {
        this.presenter.addEducationSchool(
          schoolName,
          studentNo,
          startYear,
          endYear,
          term,
          degree,
          honor,
          course,
          address,
          isUpdated,
          torFormData)
        this.setState({ showEducationFormModal : false })
        this.setState({
          schoolName : '',
          studentNo : '',
          startYear : '',
          endYear : '',
          term : '',
          degree : '',
          honor : '',
          course : '',
          address : '',
          isUpdated : 0,
          updateMode : false
        })
      }
    }
  }

  /* Delete Education */

  onDeleteProperty (id) {
    this.presenter.removeSchool(id)
  }

  render () {
    const {
      updateMode,
      enabledLoader,
      showEducationFormModal,
      showSchoolsModal,
      showDegreeModal,
      showNoticeResponseModal,
      enabledLoaderPdfModal,
      showPdfViewComponent,
      noticeResponse,
      torFormData,
      pdfFile,
      pdfFileUrl,
      educId,
      count,
      schools,
      schoolId,
      schoolName,
      studentNo,
      startYear,
      endYear,
      term,
      degree,
      honor,
      course,
      address,
      index,
      schoolPageNumber,
      schoolFind,
      schoolViewMore,
      viewMoreText,
      schoolNameErrorMessage,
      studentNoErrorMessage,
      addressErrorMessage,
      degreeErrorMessage,
      courseErrorMessage,
      termErrorMessage,
      honorErrorMessage,
      startYearErrorMessage,
      endYearErrorMessage
    } = this.state

    const { percentage, educationData} = this.props

    const isVisible = (educationData && educationData.length > 4) ? '' : 'hide'

    return (
      <div>
      { super.render() }
      {
        enabledLoaderPdfModal &&
        <Modal>
          <div>
            <center>
              <br/>
              {
                showPdfViewComponent ?

                <h2>Please wait while we we&#39;re retrieving the documents</h2> :
                <h2>Please wait while we we&#39;re validating your submitted documents</h2>
              }
              <br/>
              <CircularLoader show = { enabledLoaderPdfModal }/>
              <br/>
            </center>
          </div>
        </Modal>
      }
      {
        showEducationFormModal &&
        <EducationBackgroundModal
          enabledLoader = { enabledLoader }
          updateMode = { updateMode }
          torFormData = { torFormData }
          schools = { schools.school }
          count = { count }
          schoolId = { schoolId }
          schoolName = { schoolName }
          studentNo = { studentNo }
          startYear = { startYear }
          startYearErrorMessage = { startYearErrorMessage }
          startYearFunc = { (resp) => this.startYearFunc(resp) }
          startYearValidate = { (resp) => this.startYearValidate(resp) }
          endYear = { endYear }
          endYearErrorMessage = { endYearErrorMessage }
          endYearFunc = { (resp) => this.endYearFunc(resp) }
          endYearValidate = { (resp) => this.endYearValidate(resp) }
          term = { term }
          degree = { degree }
          honor = { honor }
          course = { course }
          address = { address }
          schoolNameErrorMessage = { schoolNameErrorMessage }
          studentNoErrorMessage = { studentNoErrorMessage }
          addressErrorMessage = { addressErrorMessage }
          degreeErrorMessage = { degreeErrorMessage }
          courseErrorMessage = { courseErrorMessage }
          termErrorMessage = { termErrorMessage }
          honorErrorMessage = { honorErrorMessage }
          studentNoFunc = { (resp) => this.studentNoFunc(resp) }
          termFunc = { (resp) => this.termFunc(resp) }
          degreeFunc = { (respId, respName) => this.degreeFunc(respId, respName) }
          honorFunc = { (resp) => this.honorFunc(resp) }
          courseFunc = { (resp) => this.courseFunc(resp) }
          addressFunc = { (resp) => this.addressFunc(resp) }
          showDegreeFunc = { (resp) => this.setState({ showDegreeModal : resp }) }
          showDegreeModal = { showDegreeModal }
          schoolPageNumber = { schoolPageNumber }
          schoolViewMore = { schoolViewMore }
          nextSchoolPageNumberFunc = { () => {
              let page = schoolPageNumber === schools.totalCount ? schoolPageNumber : schoolPageNumber + 1
              this.setState({ schoolPageNumber : page })
              this.presenter.getEmployeeSchool(page, schoolFind)
            }
          }
          previousSchoolPageNumberFunc = { () => {
            let page = schoolPageNumber === 0 ? 1 : schoolPageNumber - 1
              this.setState({ schoolPageNumber : page })
              this.presenter.getEmployeeSchool(page, schoolFind)
            }
          }
          schoolFindFunc = { (resp) => {
              this.setState({ schoolFind : resp })
              this.presenter.getEmployeeSchool(schoolPageNumber, resp)
            }
          }
          showSchoolsModal = { showSchoolsModal }
          onCloseModal = { () => this.setState({ showSchoolsModal : false }) }
          setSchoolFunc = { (schoolId, schoolName) =>
            this.setState({
              schoolId,
              schoolName,
              showSchoolsModal : false,
              schoolNameErrorMessage : ''
            })
          }
          showSchoolsFunc = { () => this.setState({ showSchoolsModal : true }) }
          submission = { () => this.submission() }
          addAttachmentsFunc = { (attachment, tempCount) =>
            {
              const attachmentTemp = [...attachment]
              let newCount = tempCount + 1
              this.setState({ count : newCount })
              attachmentTemp.push({
                name : 'Transcript of Records ' + tempCount
              })
              this.setState({ torFormData : attachmentTemp })
            }
          }
          hideModalEducationFormFunc = { (showEducationFormModal) => this.setState({ showEducationFormModal }) }
          getEducationHolderFunc = { (resp) => {
            const updatePropertyHolder = [...educationData]
            updatePropertyHolder.push(resp)
            this.setState({ educationData : updatePropertyHolder})
          }}
        />
      }
      {
        showNoticeResponseModal &&
        <ResponseModal
          onClose={ () => {
            this.setState({ showNoticeResponseModal : false})
          }}
          noticeResponse={ noticeResponse }
        />
      }
      <br/>
      <div className = { 'percentage-grid' }>
        <div>
          <h2 className={ 'header-margin-default text-align-left' }>Education Background</h2>
          <h4>Setup your education background</h4>
        </div>
        <Progress
          type = { 'circle' }
          height = { 65 }
          width = { 65 }
          percent = { percentage } />
      </div>
      <br/>
      {
        educationData.length > 0 &&
        <div className = { 'educ-grid-card' }>
          <Card
            onClick = { () =>
              this.onCheckedPdf()
            }
            className = { 'educ-card' }>
            <div className = { 'educ-grid-x2' }>
              <h2>School Verification Form</h2>
              <div>
                <span className = { 'educ-icon educ-seemore-button' }/>
              </div>
            </div>
          </Card>
          {
            showPdfViewComponent &&
            <EducationVerificationComponent
              pdfFile = { pdfFile }
              onClose = { () => this.setState({ showPdfViewComponent: false }) }
            />
          }
        </div>
      }
      <br/>
      <Line />
      <br/>
      <div className = { 'grid-global' }>
        <h2></h2>
        <div className = { 'text-align-right' }>
          <GenericButton
            text = { 'ADD' }
            onClick = { () => this.onShowEducationFormModalFunc() }
            />
        </div>
      </div>
      <br/>
      {
        enabledLoader ?
        <center>
        <CircularLoader show = { enabledLoader }/>
        </center>
        :
        <div>
        {
          educationData.length === 0 ?
          <div>
            <br/>
            <center>
              <h2>No School Record</h2>
            </center>
            <br/>
          </div>
          :
          <div>
          <EducationMultipleCardComponent
            cardDataHolder = { educationData }
            index = { index }
            onDeleteProperty = { (id) => this.onDeleteProperty(id)  }
            onEditModeProperty = { (
              educId,
              schoolName,
              address,
              course,
              degree,
              honor,
              studentNo,
              term,
              startYear,
              endYear,
              showEducationFormModal,
              updateMode,
              isUpdated) =>
              this.setState({
                educId,
                schoolName,
                address,
                course,
                degree,
                honor,
                studentNo,
                term,
                startYear,
                endYear,
                showEducationFormModal,
                updateMode,
                isUpdated
              }) }
            />
            <br/>
            <button
              type = { 'button' }
              className = { `viewmore tooltip ${ isVisible }` }
              onClick = {
                () => {
                  if(index === educationData.length)
                    this.setState({ index : 4, viewMoreText : 'View more' })
                  else
                    this.setState({ index : educationData.length, viewMoreText : 'View less' })
                }
              }>
              <img src={ require('../../../images/icons/horizontal.png') } />
              <span className={ 'tooltiptext' }>{ viewMoreText }</span>
            </button>
            </div>
        }
        </div>
      }
      <div>
        <Card></Card>
      </div>
    </div>
    )
  }
}

EducationBackgroundFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(EducationBackgroundFragment, Presenter )
