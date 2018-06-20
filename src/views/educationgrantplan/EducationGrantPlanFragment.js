import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationGrantPlanPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'

import FormComponent from './components/EducationFormCardComponent'

class EducationGrantPlanFragment extends BaseMVPView{
  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false
    }
  }

  componentDidMount () {
    /*this.presenter.getDentalReimbursement()*/
    this.props.setSelectedNavigation(1)
  }


  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/education')
  }

  render () {
    const {
      enabledLoader
    } = this.state

    return (
      <div>
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Education Grant-Plan
          </h2>
        </div>
        {
          enabledLoader ?
           <center className = { 'circular-loader-center' }>
             <CircularLoader show = { this.state.enabledLoader }/>
           </center> :
          <FormComponent
            presenter = { this.presenter }
          />
        }
      </div>
    )
  }
}


export default ConnectView(EducationGrantPlanFragment, Presenter)
