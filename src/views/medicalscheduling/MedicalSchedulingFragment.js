import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MedicalSchedulingPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import { CircularLoader, SingleInputModal } from '../../ub-components/'
import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import store from '../../store'
import { NotifyActions } from '../../actions'
import FormComponent from './components/MedicalSchedulingFormCardComponent'
import { RequiredValidation, MoneyValidation } from '../../utils/validate'

class MedicalSchedulingFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      enabledLoader : false,
      showClinics : false,
      showPackages : false,
      clinicId : null,
      clinicLabel : '',
      packageId : null,
      packageLabel : '',
      prefferedDate : ''
    }
  }

  /* Loader*/
  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  render () {
    const {
      enabledLoader,
      showClinics,
      showPackages,
      clinicId,
      clinicLabel,
      packageId,
      packageLabel,
      prefferedDate
    } = this.state

    const clinics =
    [
      {
        id : 0,
        name : 'clinic 1'
      },
      {
        id : 1,
        name : 'clinic 2'
      },
      {
        id : 2,
        name : 'clinic 3'
      }
    ]
    const packages =
    [
      {
        id : 0,
        name : 'package 1'
      },
      {
        id : 1,
        name : 'package 2'
      },
      {
        id : 2,
        name : 'package 3'
      }
    ]

    return (
      <div>
        {
          showClinics &&
          <SingleInputModal
            inputArray = { clinics }
            selectedArray = { (clinicId, clinicLabel) =>
              this.setState({ clinicId, clinicLabel }) }
            onClose = { () => this.setState({showClinics : false}) }
          />
        }
        {
          showPackages &&
          <SingleInputModal
            inputArray = { packages }
            selectedArray = { (packageId, packageLabel) =>
              this.setState({ packageId, packageLabel }) }
            onClose = { () => this.setState({showPackages : false}) }
          />
        }
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Medical Scheduling
          </h2>
        </div>
        {
          enabledLoader ?
            <center className = { 'circular-loader-center' }>
              <CircularLoader show = { enabledLoader }/>
            </center> :
            <FormComponent
              showClinics = { () => this.setState({ showClinics : true }) }
              showPackages = { () => this.setState({ showPackages : true }) }
              cliniclabel = { clinicLabel }
              packageLabel = { packageLabel }
              prefferedDate = { prefferedDate }
              onChangePrefferedDate = { (prefferedDate) => this.setState({ prefferedDate }) }
            />
        }
      </div>
    )
  }
}

export default ConnectView(MedicalSchedulingFragment, Presenter)
