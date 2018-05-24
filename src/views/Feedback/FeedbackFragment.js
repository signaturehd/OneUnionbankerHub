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
    this.presenter.getFeedback
    this.props.setSelectedNavigation(2)
  }

    showFeedback (feedback) {
      this.setState({ feedback })
  }


  render () {
    const { details, feedback } = this.props
    console.log(feedback)
    

    const {
      showCategoryModal,
      Category,
    } = this.state

    return (
      <div  className = { 'feedback-container' }>
        {
          showCategoryModal &&
          <FeedbackCategoryModal
            showCategoryModal = { showCategoryModal }
            details = { feedback.feedbackCategory }
            chosenCategory = { (id, feedbackCategory, showCategoryModal) => this.setState({id, feedbackCategory, showCategoryModal}) }
            onChange = { (id, feedbackCategory) => this.setState({ id, feedbackCategory }) }
            onClose = { () => this.setState({ showCategoryModal : false }) } />
        }
        <div className={ 'breadcrumbs-container' }>
        </div>
          <div className = { 'feedback-container' }>
            {
              <FeedbackCard
                details = { feedback }
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
