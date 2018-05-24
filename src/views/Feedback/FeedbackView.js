import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ConnectView from '../../utils/ConnectView'
import GetFeedbackInteractor from '../../domain/interactor/feedback/GetFeedbackInteractor'

import Presenter from './presenter/FeedbackPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'


import { GenericTextBox, GenericButton } from '../../ub-components'


import './styles/feedback-styles.css'

class FeedbackView extends BaseMVPView {
  constructor (props) {
    super(props)
      this.state = {
        feedback: [],
      }
  }

  componentDidMount () {
    this.presenter.getFeedback()
    this.props.setSelectedNavigation(2)
  }

  feedback (feedback) {
      this.setState({ feedback })
  }


  render () {
    const { onClick, text, path, icon,feedback, response} = this.props

    return (
      <div>
        <div>
          <div className = { 'page-header-buttons' }>
          </div>
        </div>
        <h1> Feedback </h1>
        <div className = { '_transaction-container' }>
        		<div>
        			<h3> Please Provide us your feedback</h3>
               
        		</div>
        </div>
      </div>
    )
  }
}

FeedbackView.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(FeedbackView, Presenter) 