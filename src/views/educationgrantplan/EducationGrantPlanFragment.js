import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/EducationGrantPlanPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'

import FormComponent from './components/EducationGrantPlanFormCardComponent'

class EducationGrantPlanFragment extends BaseMVPView{
  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      grantPlan : []
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateGrantPlan()
    this.showCircularLoader()
  }

  setGrantPlan (grantPlan) {
    this.setState({ grantPlan })
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
      enabledLoader,
      grantPlan
    } = this.state

    return (
      <div>
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Education Grant - Plan
          </h2>
        </div>
        {
          enabledLoader ?
           <center className = { 'circular-loader-center' }>
             <CircularLoader show = { enabledLoader }/>
           </center> :
          <FormComponent
            grantPlan = { grantPlan }
            presenter = { this.presenter }
          />
        }
      </div>
    )
  }
}


export default ConnectView(EducationGrantPlanFragment, Presenter)
