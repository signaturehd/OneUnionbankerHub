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
      educationCardHolder : [],
      defaultSchool : [],
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
      defaultSchool
    } = this.state

    const { percentage } = this.props

    return (
      <div>
        {
          showEducationFormModal &&
          <EducationBackgroundModal
          hideModalEducationFormFunc = { (showEducationFormModal) => this.setState({ showEducationFormModal }) }
          getEducationHolderFunc = { (resp) => {
            const updatePropertyHolder = [...damagePropertyCardHolder]
            updatePropertyHolder.push(resp)
            this.setState({ damagePropertyCardHolder : updatePropertyHolder})
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
          educationCardHolder.length !==0 &&
          <EducationMultipleCardComponent
            cardDataHolder = { educationCardHolder }
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
