import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card
} from '../../../ub-components/'

import Presenter from './presenter/AffirmDocumentPresenter'

import './styles/affirmDocumentStyle.css'

class AffirmationDocumentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      affirmationPreEmploymentStatus : []
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(0)
    this.presenter.getAffirmationsStatus()
  }

  checkedAffirmationPreEmploymentStatus (affirmationPreEmploymentStatus) {
    this.setState({ affirmationPreEmploymentStatus })
  }

  render() {
    const {
      history,
      checkPEUndertaking,
    } = this.props
    const { affirmationPreEmploymentStatus } = this.state

    return(
    <div>
      { super.render() }
      <div>
        <br/>
        <h2 className={ 'header-margin-default text-align-left' }> Pre Employment Documents Affirmation </h2>
        <h2>Please click and read all documents below and affirm each one. Documents that are marked with checked are already affirmed</h2>
        <br/>
        <div className = { 'affirmation-grid-card' }>
          {
            affirmationPreEmploymentStatus.map((resp, key) =>
            <Card
              key = { key }
              className = { 'affirmation-card' }>
              <div className = { 'affirmation-grid-x2' }>
                <h2> { resp.title } </h2>
                <div className = { 'grid-global' }>
                  <GenericButton
                    className = { 'affirmation-button' }
                    onClick = { () => {} }
                    text = { 'Download' }/>
                  <GenericButton
                    className = { 'affirmation-button' }
                    onClick = { () => {} }
                    text = { 'Preview' }/>
                </div>
              </div>
            </Card>
            )
          }
        </div>
      </div>
    </div>
    )
  }
}

AffirmationDocumentFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

AffirmationDocumentFragment.defaultProps = {
}

export default ConnectView(AffirmationDocumentFragment, Presenter)
