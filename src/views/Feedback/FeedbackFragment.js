import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/FeedbackPresenter'
import ConnectView from '../../utils/ConnectView'

import GetFeedbackInteractor from '../../domain/interactor/feedback/GetFeedbackInteractor'
import FeedbackCategoryModal from './modals/FeedbackCategoryModal'
import FeedbackCard from './components/FeedbackCardFragment/FeedbackCard'

import './styles/feedback-styles.css'


class FeedbackView extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showCategoryModal : false,
      category : null,
      feedback : [],
    }
  }


  componentDidMount () {
    this.presenter.getFeedback()
    this.props.setSelectedNavigation(6)
  }

  showFeedback (feedback) {
    this.setState({ feedback })
  }

  submitForm (reason, message) {
    this.presenter.addFeedback(reason, message)
  }


  render () {
    const {
      showCategoryModal,
      feedback,
      feedbackValue,
    } = this.state

    console.log

    return (
      <div className = { 'feedback-container' }>
        {
          showCategoryModal &&
          <FeedbackCategoryModal
            showCategoryModal = { showCategoryModal }
            details = { feedback }
            onChange = { (id, feedbackValue) => this.setState({ id, feedbackValue }) }
            onClose = { () => this.setState({ showCategoryModal : false }) } />
        }
        <div className={ 'breadcrumbs-container' }>
        </div>
          <div className = { 'feedback-container' }>
            {
              <FeedbackCard
                feedback = { feedbackValue }
                submitForm = { () => this.submitForm(id) }
                onClick = {
                  (showCategoryModal) =>
                  this.setState({ showCategoryModal })
                }
              />
            }

         </div>
      </div>
    )
  }
}

export default ConnectView(FeedbackView, Presenter)
