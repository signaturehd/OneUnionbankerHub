import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/OutPatientReimbursementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  CircularLoader,
  SingleInputModal,
  MultipleInputModal,
} from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/OutPatientReimbursementFormCardComponent'

import * as OutPatientReimbursementFunction from
'./function/OutPatientReimbursementFunction'

class OutPatientReimbursementFragment extends BaseMVPView {
  constructor (props) {
    super (props)
      this.state = {
        enabledLoader : false,
        outpatientData : [],
        procedureData : [],
        procedureArray : [],
        dependentId: null,
        dependentName: null,
        procedureNameId: null,
        procedureNameName: null,
        showDepedendent: false,
        showProcedure: false,
        amount: '',
        diagnosisText : '',
        orNumberText: '',
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateOutPatientReimbursement()
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  showValidatedOutPatient (outpatientData) {
    this.setState({ outpatientData })
  }

  showProcedureMap (procedureData) {
    this.setState({ procedureData })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  submitForm () {
    /*submission*/
  }

  showDependentModal (showDepedendent) {
    this.setState({ showDepedendent })
  }

  showProcedureModal (showProcedure) {
    this.setState({ showProcedure })
  }

  validateAmount (e) {
    const validate = OutPatientReimbursementFunction.checkedAmount(e)
    this.setState({ amount : validate })
  }

  validateText (e) {
    const validate = OutPatientReimbursementFunction.checkedValidateText(e)
    this.setState({ diagnosisText : validate })
  }

  validateSymbol (e) {
    const validate = OutPatientReimbursementFunction.checkedValidateSymbol(e)
    this.setState({ orNumberText : validate.toUpperCase() })
  }

  render () {
    const {
      enabledLoader,
      showDepedendent,
      showProcedure,
      outpatientData,
      procedureData,
      procedureArray,
      dependentId,
      dependentName,
      procedureId,
      procedureName,
      amount,
      diagnosisText,
      orNumberText
    } = this.state

    const {
      selectedArray,
      classProp
    } = this.props

    return (
      <div>
        {
          showDepedendent &&
          <SingleInputModal
            label = { 'Dependents' }
            inputArray = { outpatientData && outpatientData.dependents }
            selectedArray = { (dependentId, dependentName) =>
              this.setState({ dependentId, dependentName, showDepedendent : false }) }
            onClose = { () => this.setState({ showDepedendent : false }) }
          />
        }
        {
          showProcedure &&
          <MultipleInputModal
            label = { 'Procedure' }
            inputArray = { procedureData }
            onSelect = { (object) =>{
              const updateProcedure = [...procedureArray]
              updateProcedure.push(object)
              this.setState({ procedureArray : updateProcedure, showProcedure : false })
            }
          }
            procedureArray = { procedureArray }
            onClose = { () => this.setState({ showProcedure : false }) }
          />
        }
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            OUTPATIENT REIMBURSEMENT
          </h2>
        </div>
        {
          enabledLoader ?
          <center className = { 'circular-loader-center' }>
            <CircularLoader show = { enabledLoader }/>
          </center> :
          <FormComponent
            oRNumberFunc = { (resp) => this.validateSymbol(resp) }
            procedureModalFunc = { (resp) => this.showProcedureModal(resp) }
            diagnosisValueFunc = { (resp) => this.validateText(resp) }
            desiredAmountFunc = { (resp) => this.validateAmount(resp) }
            requestDepdentModalFunc = { (resp) => this.showDependentModal(resp) }
            dependentName = { dependentName }
            procedureName = { procedureName }
            amount = { amount }
            diagnosisText = { diagnosisText }
            orNumberText = { orNumberText }
            procedureArray = { procedureArray }
          />
        }
      </div>
    )
  }
}

OutPatientReimbursementFragment.propTypes = {
  selectedArray : PropTypes.func,
  classProp : PropTypes.string,
}

export default ConnectView(OutPatientReimbursementFragment, Presenter)
