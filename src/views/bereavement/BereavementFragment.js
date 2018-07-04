import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/BereavementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
/*
import ConfirmationModal from './modal/EducationGrantAidReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
*/

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from  './components/BereavementFormCardComponent'

class BereavementFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state={
      enabledLoader : true,
      validatedBereavement: [],
      showDepedents: []
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateBereavement()
  }

  isEligible (bool) {
    this.setState({ enabledLoader : !bool })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showValidatedValue (validatedBereavement) {
    this.setState({ validatedBereavement })
  }

  showDependentsValue (showDepedents) {
    this.setState({ showDepedents })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const { enabledLoader, validatedBereavement, showDepedents }=this.state
    const { type }=this.props.match.params

    return (
      <div>
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Bereavement
          </h2>
        </div>
        {
          enabledLoader ?
          <center className={ 'circular-loader-center' }>
            <CircularLoader show={ enabledLoader }/>
          </center>
          :
          <FormComponent
            withDeathCert={ type === "certified" ? true : false  }
            validatedBereavement={ validatedBereavement }
            showDepedents={ showDepedents }
          />
        }
      </div>
    )
  }
}

export default ConnectView(BereavementFragment, Presenter)
