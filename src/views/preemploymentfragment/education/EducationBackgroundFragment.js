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
} from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'

import EducationMultipleCardComponent from './EducationMultipleCardComponent'
import EducationBackgroundModal from './modals/EducationBackgroundModal'

import moment from 'moment'
import { format } from '../../../utils/numberUtils'

import { RequiredValidation } from '../../../utils/validate/'

import { Progress } from 'react-sweet-progress'

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
      noticeResponse : '',
      isUpdated : 0,
      educationCardHolder : [],
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
    this.presenter.getEmployeeSchool()
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
    torFormData.push({
      name : 'Transcript of Records'
    })
  }

  checkedEducationData(educationCardHolder) {
    this.setState({ educationCardHolder })
  }

  checkedSchoolData(schools) {
    this.setState({ schools })
  }

  studentNoFunc(studentNo) {
    this.setState({ studentNo, studentNoErrorMessage : '' })
  }

  termFunc(term) {
    this.setState({ term, termErrorMessage : ''})
  }

  degreeFunc(id, degree) {
    this.setState({ degree, showDegreeModal : false, degreeErrorMessage : ''})
  }

  honorFunc(honor) {
    this.setState({ honor, honorErrorMessage : '' })
  }

  courseFunc(course) {
    this.setState({ course, courseErrorMessage : '' })
  }

  addressFunc(address) {
    this.setState({ address, addressErrorMessage : '' })
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
    if(value.length === 4) {
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

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse , showNoticeResponseModal : true})
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  render () {
    const {
      updateMode,
      enabledLoader,
      educationCardHolder,
      showEducationFormModal,
      showSchoolsModal,
      showDegreeModal,
      showNoticeResponseModal,
      noticeResponse,
      torFormData,
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

    const { percentage } = this.props

    const isVisible = (educationCardHolder && educationCardHolder.length > 4) ? '' : 'hide'

    return (
      <div>
        {
          showEducationFormModal &&
          <EducationBackgroundModal
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
            schoolPageNumberFunc = { () => this.setState({ schoolPageNumber : schoolPageNumber + 1 }) }
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
              const updatePropertyHolder = [...educationCardHolder]
              updatePropertyHolder.push(resp)
              this.setState({ educationCardHolder : updatePropertyHolder})
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
            <h2 className={ 'font-size-30px text-align-left' }>Education Background</h2>
            <br/>
            <h4>Setup your education background</h4>
          </div>
          <Progress
            type = { 'circle' }
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
        <br/>
        <Line />
        <br/>
        <div className = { 'grid-global' }>
          <h2></h2>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Education' }
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
          <EducationMultipleCardComponent
            cardDataHolder = { educationCardHolder }
            index = { index }
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
                  if(index === educationCardHolder.length)
                    this.setState({ index : 4, viewMoreText : 'View more' })
                  else
                    this.setState({ index : educationCardHolder.length, viewMoreText : 'View less' })
                }
              }>
              <img src={ require('../../../images/icons/horizontal.png') } />
              <span className={ 'tooltiptext' }>{ viewMoreText }</span>
            </button>
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
