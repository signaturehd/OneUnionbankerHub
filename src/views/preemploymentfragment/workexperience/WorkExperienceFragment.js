import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/WorkExperiencePresenter'

import WorkExperienceAddModal from './modals/WorkExperienceAddModal'

import {
  GenericButton,
  CircularLoader,
  Card,
  Line,
} from '../../../ub-components/'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"

class WorkExperienceFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      showAddWorkExperienceModal : false
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(4)
  }

  render () {
    const {
      showAddWorkExperienceModal
    } = this.state

    const { percentage } = this.props

    return (
      <div>
        { super.render() }
        {
          showAddWorkExperienceModal &&
          <WorkExperienceAddModal
            onClose = { () => this.setState({ showAddWorkExperienceModal : false }) }/>
        }
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className={ 'header-margin-default text-align-left' }>Work Experience</h2>
            <h2>Setup your work experience</h2>  <h2>Please click and read all documents below and affirm each one. Documents that are marked with checked are already affirmed</h2>
          </div>
          <Progress
            type = { 'circle' }
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
              onClick = { () => this.setState({ showAddWorkExperienceModal : true }) }
              />
          </div>
        </div>
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

export default ConnectView(WorkExperienceFragment, Presenter )
