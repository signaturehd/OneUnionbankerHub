import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/WorkExperiencePresenter'

import {
  GenericButton,
  CircularLoader,
  Card,
  Line,
} from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'

import WorkExperienceMultipleCardComponent from './WorkExperienceMultipleCardComponent'
import WorkExperienceAddModal from './modals/WorkExperienceAddModal'

import { Progress } from 'react-sweet-progress'

class WorkExperienceFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showEditSubmitButton : false,
      showAddWorkExperienceModal : false,
      updateMode : false,
      showNoticeResponseModal : false,
      noticeResponse : '',
      workExperienceCardHolder : [],
      index : 4,
      viewMoreText : 'View more',
    }

  }

  componentDidMount () {
    this.props.onSendPageNumberToView(4)
    this.presenter.getWorkExperience()
  }

  checkedWorkExperience (workExperienceCardHolder) {
    this.setState({ workExperienceCardHolder })
  }

  onShowWorkExperienceFormModalFunc() {
    this.setState({ showAddWorkExperienceModal : true })
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
      enabledLoader,
      showEditSubmitButton,
      showAddWorkExperienceModal,
      showNoticeResponseModal,
      workExperienceCardHolder,
      noticeResponse,
      updateMode,
      index,
      viewMoreText
    } = this.state

    const { percentage } = this.props

    const isVisible = (workExperienceCardHolder && workExperienceCardHolder.length > 4) ? '' : 'hide'

    return (
      <div>
        { super.render() }
        {
          showAddWorkExperienceModal &&
          <WorkExperienceAddModal
            onClose = { () => this.setState({ showAddWorkExperienceModal : false }) }
            updateMode = { updateMode }
            onSubmit = { (companyName,
            address,
            position,
            briefDescDuties,
            contactNo,
            fromMonthName,
            fromYear,
            toMonthName,
            toYear) => this.presenter.addWorkExperience(companyName,
            address,
            position,
            briefDescDuties,
            contactNo,
            fromMonthName,
            fromYear,
            toMonthName,
            toYear) }/>
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
            <h2 className={ 'header-margin-default text-align-left' }>Work Experience</h2>
            <h2>Setup your work experience</h2>
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
              text = { 'Add Work Experience' }
              onClick = { () => this.onShowWorkExperienceFormModalFunc() }
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
            <WorkExperienceMultipleCardComponent
              cardDataHolder = { workExperienceCardHolder }
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
                ) }/>
                <button
                  type = { 'button' }
                  className = { `viewmore tooltip ${ isVisible }` }
                  onClick = {
                    () => {
                      if(index === workExperienceCardHolder.length)
                        this.setState({ index : 4, viewMoreText : 'View more' })
                      else
                        this.setState({ index : workExperienceCardHolder.length, viewMoreText : 'View less' })
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

WorkExperienceFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(WorkExperienceFragment, Presenter)
