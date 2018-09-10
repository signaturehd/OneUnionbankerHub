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

class EducationBackgroundFragment extends BaseMVPView {

  constructor(props) {
    super(props)
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(3)
  }

  render () {
    return (
      <div>
        { super.render() }
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
              onClick = { () => {} }
              />
          </div>
        </div>
      </div>
    )
  }
}

EducationBackgroundFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(EducationBackgroundFragment, Presenter )
