import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
  Line
} from '../../../ub-components/'

import Presenter from './presenter/BiographicalDataPresenter'

import './styles/biographicalDataStyle.css'

class BiographicalDataFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      biographicalDataForm: []
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(2)
  }

  render() {
    const {
      history,
      checkPEUndertaking,
    } = this.props
    const {
      biographicalDataForm
    } = this.state

    return(
    <div>
    { super.render() }
      <div>
        <br/>
        <h2 className={ 'header-margin-default text-align-left' }>Biographical Data</h2>
        <h2>Setup your work experience</h2>
        <br/>
        <div className = { 'biographical-grid-card' }>
          <Card
            className = { 'biographical-card' }>
            <div className = { 'biographical-grid-x2' }>
              <h2>Biographical Data From</h2>
              <div className = { 'grid-global' }>
                <GenericButton
                  className = { 'biographical-button' }
                  onClick = { () => {} }
                  text = { 'Download' }/>
                <GenericButton
                  className = { 'biographical-button' }
                  onClick = { () => {} }
                  text = { 'Preview' }/>
              </div>
            </div>
          </Card>
        </div>
        <div className = { 'grid-global' }>
          <h2></h2>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Attachments' }
              onClick = { () => {} }
              />
          </div>
        </div>
        <br/>
        <Line />
        <br/>
          {
            defaultDamageProperty.length !== 0  &&
            <div>
            <h4>
              <br/>
              Form Attachments
            </h4>
            <MultipleAttachments
              count = { count }
              countFunc = { (count) => countFunc(count) }
              placeholder = { '.' }
              fileArray = { defaultDamageProperty }
              setFile = { (genericFileAttachmentArray) =>
                  this.setState({ genericFileAttachmentArray })
              }
              disabled = { showEditSubmitButton }
              errorMessage = {
                showEditSubmitButton ?
                '' :
                `Please upload the required attachments`  }
              />
            </div>
           }
      </div>
    </div>
    )
  }
}

BiographicalDataFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

BiographicalDataFragment.defaultProps = {
}

export default ConnectView(BiographicalDataFragment, Presenter)
