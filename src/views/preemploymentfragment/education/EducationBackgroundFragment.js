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

class EducationBackgroundFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      educationCardHolder : [],
      defaultSchool : [
        {
          school : {
            id : 1,
            name : 'University of the Philippines'
          },
          studentId : '201101033',
          date : '8/21/2018',
          startYear : 2011,
          endYear : 2015,
          degree : 'Accountancy'
        }
      ],
      attachmentsData : [{
        name : 'TOR Attachment'
      }],
      showEducationFormModal : false,
      showEditSubmitButton : false
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(3)
    this.presenter.getEmployeeSchool()
  }

  onShowEducationFormModalFunc () {
    this.setState({ showEducationFormModal : true })
  }

  setCardHolderDefaultyFunc (defaultSchool) {
    this.setState({ defaultSchool })
  }

  checkedEducationData(educationCardHolder) {
    this.setState({ educationCardHolder })
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
      defaultSchool,
      attachmentsData
    } = this.state

    return (
      <div>
        {
          showEducationFormModal &&
          <EducationBackgroundModal
          attachmentsData = { attachmentsData }
          hideModalEducationFormFunc = { (showEducationFormModal) => this.setState({ showEducationFormModal }) }
          getEducationHolderFunc = { (resp) => {
            const updatePropertyHolder = [...damagePropertyCardHolder]
            updatePropertyHolder.push(resp)
            this.setState({ damagePropertyCardHolder : updatePropertyHolder})
          }}
            />
        }
        <br/>
        <h2 className={ 'header-margin-default text-align-left' }>Education Background</h2>
        <h2>Setup your education background</h2>
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
        defaultSchool.length !==0 &&
          <EducationMultipleCardComponent
            cardDataHolder = { defaultSchool }
            setCard = { (resp) => this.setCardHolderDefaultyFunc(resp) }
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
            errorMessage = {
              showEditSubmitButton ?
              '' :
              `Please upload the required attachments`  }
            />
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
