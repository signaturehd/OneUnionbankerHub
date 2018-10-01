import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/WorkExperiencePresenter'

import {
  GenericButton,
  SingleInputModal,
  CircularLoader,
  Card,
  Line,
} from '../../../ub-components/'

import ResponseModal from '../../notice/NoticeResponseModal'

import WorkExperienceMultipleCardComponent from './WorkExperienceMultipleCardComponent'
import WorkExperienceAddModal from './modals/WorkExperienceAddModal'

import { Progress } from 'react-sweet-progress'

import { RequiredValidation } from '../../../utils/validate/'

import moment from 'moment'
import { format } from '../../../utils/numberUtils'


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
      workExpId : '',
      index : 4,
      viewMoreText : 'View more',
      monthData :
      [{ id: 1, name: 'January' },
       { id: 2, name: 'February' },
       { id: 3, name: 'March' },
       { id: 4, name: 'April' },
       { id: 5, name: 'May' },
       { id: 6, name: 'June' },
       { id: 7, name: 'July' },
       { id: 8, name: 'August' },
       { id: 9, name: 'September' },
       { id: 10, name: 'October' },
       { id: 11, name: 'November' },
       { id: 12, name: 'December' }],
      fromMonthId : '',
      fromMonthName : '',
      fromMonthErrorMessage : '',
      toMonthId : '',
      toMonthName : '',
      toMonthErrorMessage : '',
      fromYear : '',
      fromYearErrorMessage : '',
      toYear : '',
      toYearErrorMessage : '',
      companyName : '',
      companyErrorMessage : '',
      address : '',
      addressErrorMessage : '',
      position : '',
      positionErrorMessage : '',
      contactNo : '',
      contactNoErrorMessage : '',
      briefDescDuties : '',
      briefDescDutiesErrorMessage : '',
      showFromMonthModal : false,
      showToMonthModal : false
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
    this.setState({
      showAddWorkExperienceModal : true,
      companyName  : '',
      address  : '',
      position  : '',
      contactNo  : '',
      fromYear : '',
      toYear : '',
      fromMonthId : '',
      toMonthId : '',
      briefDescDuties : '',
      updateMode : false
    })
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

  companyFunc(companyName) {
    this.setState({ companyName, companyErrorMessage : '' })
  }

  addressFunc(address) {
    this.setState({ address, addressErrorMessage : '' })
  }

  positionFunc(position) {
    this.setState({ position, positionErrorMessage : '' })
  }

  contactNoFunc(contactNo) {
    this.setState({ contactNo, contactNoErrorMessage : '' })
  }

  fromYearFunc(fromYear) {
    this.setState({ fromYear, fromMonthErrorMessage : '' })
  }

  fromYearValidate(value) {
    if(value.length === 4) {
      if(value <= moment().format('YYYY')) {
        this.setState({ fromYearErrorMessage : '' })
      } else {
        this.setState({ fromYearErrorMessage : 'Future year is not valid.' })
      }
    } else {
      this.setState({ fromYearErrorMessage : 'Please input a valid year.' })
    }
  }

  toYearFunc(toYear) {
    this.setState({ toYear, toYearErrorMessage : '' })
  }

  toYearValidate(value) {
    if(value.length === 4) {
      if(value <= moment().format('YYYY')) {
        this.setState({ toYearErrorMessage : '' })
      } else {
        this.setState({ toYearErrorMessage : 'Future year is not valid.' })
      }
    } else {
      this.setState({ toYearErrorMessage : 'Please input a valid year.' })
    }
  }

  briefDescDutiesFunc(briefDescDuties) {
    this.setState({ briefDescDuties, briefDescDutiesErrorMessage : '' })
  }

  validateRequired(value) {
    const validate = new RequiredValidation().isValid(value)
    return validate ? true : false
  }

  submission() {
    const {
      workExpId,
      companyName,
      address,
      position,
      contactNo,
      fromMonthId,
      fromYear,
      toMonthId,
      toYear,
      briefDescDuties,
      updateMode
    } = this.state

    if(!this.validateRequired(companyName)) {
      this.setState({ companyErrorMessage : 'Required field' })
    } else if(!this.validateRequired(address)) {
      this.setState({ addressErrorMessage : 'Required field' })
    } else if(!this.validateRequired(position)) {
      this.setState({ positionErrorMessage : 'Required field' })
    } else if(!this.validateRequired(contactNo)) {
      this.setState({ contactNoErrorMessage : 'Required field' })
    } else if(!this.validateRequired(fromMonthId)) {
      this.setState({ fromMonthErrorMessage : 'Required field' })
    } else if(!this.validateRequired(fromYear)) {
      this.setState({ fromYearErrorMessage : 'Required field' })
    } else if(!this.validateRequired(toMonthId)) {
      this.setState({ toMonthErrorMessage : 'Required field' })
    } else if(!this.validateRequired(toYear)) {
      this.setState({ toYearErrorMessage : 'Required field' })
    } else if(!this.validateRequired(briefDescDuties)) {
      this.setState({ briefDescDutiesErrorMessage : 'Required field' })
    } else {
      if(updateMode) {
        this.presenter.putWorkExperience(
          workExpId,
          companyName,
          address,
          position,
          briefDescDuties,
          contactNo,
          fromMonthId,
          fromYear,
          toMonthId,
          toYear)
        this.setState({ showAddWorkExperienceModal : false })
        this.setState({
          workExpId : '',
          companyName  : '',
          address  : '',
          position  : '',
          contactNo  : '',
          fromYear : '',
          toYear : '',
          fromMonthId : '',
          toMonthId : '',
          briefDescDuties : '',
          updateMode: false
        })
      } else {
        this.presenter.addWorkExperience(
          companyName,
          address,
          position,
          briefDescDuties,
          contactNo,
          fromMonthId,
          fromYear,
          toMonthId,
          toYear)
        this.setState({ showAddWorkExperienceModal : false })
        this.setState({
          companyName  : '',
          address  : '',
          position  : '',
          contactNo  : '',
          fromYear : '',
          toYear : '',
          fromMonthId : '',
          toMonthId : '',
          briefDescDuties : '',
          updateMode: false
        })
      }
    }
  }

  render () {
    const {
      workExpId,
      enabledLoader,
      showEditSubmitButton,
      showAddWorkExperienceModal,
      showNoticeResponseModal,
      workExperienceCardHolder,
      noticeResponse,
      updateMode,
      index,
      viewMoreText,
      monthData,
      fromMonthId,
      fromMonthName,
      fromMonthErrorMessage,
      toMonthId,
      toMonthName,
      toMonthErrorMessage,
      fromYear,
      fromYearErrorMessage,
      toYear,
      toYearErrorMessage,
      companyName,
      companyErrorMessage,
      address,
      addressErrorMessage,
      position,
      positionErrorMessage,
      contactNo,
      contactNoErrorMessage,
      briefDescDuties,
      briefDescDutiesErrorMessage,
      showFromMonthModal,
      showToMonthModal
    } = this.state

    const { percentage } = this.props

    const isVisible = (workExperienceCardHolder && workExperienceCardHolder.length > 4) ? '' : 'hide'

    return (
      <div>
        { super.render() }
        {
          showAddWorkExperienceModal &&
          <WorkExperienceAddModal
            workExpId = { workExpId }
            onClose = { () => this.setState({ showAddWorkExperienceModal : false, updateMode: false }) }
            updateMode = { updateMode }
            submission = { () => this.submission() }
            monthData = { monthData }
            companyName = { companyName }
            companyErrorMessage = { companyErrorMessage }
            companyFunc = { (resp) => this.companyFunc(resp) }
            address = { address }
            addressErrorMessage = { addressErrorMessage }
            addressFunc = { (resp) => this.addressFunc(resp) }
            position = { position }
            positionErrorMessage = { positionErrorMessage }
            positionFunc = { (resp) => this.positionFunc(resp) }
            contactNo = { contactNo }
            contactNoErrorMessage = { contactNoErrorMessage }
            contactNoFunc = { (resp) => this.contactNoFunc(resp) }
            briefDescDuties = { briefDescDuties }
            briefDescDutiesErrorMessage = { briefDescDutiesErrorMessage }
            briefDescDutiesFunc = { (resp) => this.briefDescDutiesFunc(resp) }
            toYear = { toYear }
            toMonthName = { toMonthName }
            toMonthErrorMessage = { toMonthErrorMessage }
            toYearFunc = { (resp) => this.toYearFunc(resp) }
            toYearValidate = { (resp) => this.toYearValidate(resp) }
            toMonthFunc = {  (toMonthId, toMonthName) =>
              this.setState({
                toMonthId,
                toMonthName,
                showToMonthModal : false,
                toMonthErrorMessage : ''
              })
            }
            fromYear = { fromYear }
            fromMonthName = { fromMonthName }
            fromMonthErrorMessage = { fromMonthErrorMessage }
            fromYearFunc = { (resp) => this.fromYearFunc(resp) }
            fromYearValidate = { (resp) => this.fromYearValidate(resp) }
            fromMonthFunc = { (fromMonthId, fromMonthName) =>
              this.setState({
                fromMonthId,
                fromMonthName,
                showFromMonthModal : false,
                fromMonthErrorMessage : ''
              })
            }
            fromYearErrorMessage = { fromYearErrorMessage }
            toYearErrorMessage = { toYearErrorMessage }
            showToMonthModal = { showToMonthModal }
            showToMonthFunc = { (resp) => this.setState({ showToMonthModal : resp }) }
            showFromMonthModal = { showFromMonthModal }
            showFromMonthFunc = { (resp) => this.setState({ showFromMonthModal : resp }) }
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
                workExpId,
                companyName,
                address,
                contactNo,
                position,
                briefDescDuties,
                fromMonth,
                fromYear,
                toMonth,
                toYear,
                showAddWorkExperienceModal,
                updateMode) =>
                this.setState({
                  workExpId,
                  companyName,
                  address,
                  contactNo,
                  position,
                  briefDescDuties,
                  fromMonth,
                  fromYear,
                  toMonth,
                  toYear,
                  showAddWorkExperienceModal,
                  updateMode
                }) }/>
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
