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

import EducationMultipleCardComponent from './EducationMultipleCardComponent'
import EducationBackgroundModal from './modals/EducationBackgroundModal'

import { Progress } from 'react-sweet-progress'

class EducationBackgroundFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showEducationFormModal : false,
      showEditSubmitButton : false,
      showSchoolsModal : false,
      educationCardHolder : [],
      schools : [],
      torFormData: [{
        name : 'Transcript of Records'
      }],
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
      viewMoreText : 'View more'
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(3)
    this.presenter.getEmployeeSchool()
  }

  onShowEducationFormModalFunc () {
    this.setState({ showEducationFormModal : true })
  }

  checkedEducationData(educationCardHolder) {
    this.setState({ educationCardHolder })
  }

  checkedSchoolData(schools) {
    this.setState({ schools })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  render () {
    const {
      enabledLoader,
      onShowEducationFormModalFunc,
      educationCardHolder,
      showEducationFormModal,
      showEditSubmitButton,
      showSchoolsModal,
      torFormData,
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
      viewMoreText
    } = this.state

    const { percentage } = this.props

    const isVisible = (educationCardHolder && educationCardHolder.length > 4) ? '' : 'hide'

    return (
      <div>
        {
          showEducationFormModal &&
          <EducationBackgroundModal
            torFormData = { torFormData }
            schools = { schools }
            count = { count }
            schoolId = { schoolId }
            schoolName = { schoolName }
            studentNo = { studentNo }
            startYear = { startYear }
            endYear = { endYear }
            term = { term }
            degree = { degree }
            honor = { honor }
            course = { course }
            address = { address }
            showSchoolsModal = { showSchoolsModal }
            onCloseModal = { () => this.setState({ showSchoolsModal : false }) }
            setSchoolFunc = { (schoolId, schoolName) => this.setState({ schoolId, schoolName, showSchoolsModal : false }) }
            showSchoolsFunc = { () => this.setState({ showSchoolsModal : true }) }
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
            disabled = { showEditSubmitButton }
            onEditModeProperty = { (
              propertyName,
              description,
              propertyType,
              cquisitionValue,
              repairCost,
              imageKey,
              updateMode,
              showPropertyModal,
              editMode) =>
              onEditModeProperty(
                propertyName,
                description,
                propertyType,
                cquisitionValue,
                repairCost,
                imageKey,
                updateMode,
                showPropertyModal,
                editMode
              ) }
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
