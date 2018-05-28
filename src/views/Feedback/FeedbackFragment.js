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
      feedback : null,
      feedbackCategory: null,
      value: '',
    }
    this.showFeedback = this.showFeedback.bind(this)
  }


  componentWillMount () {
    this.presenter.getFeedback()
    this.presenter.addFeedback()
  }

  showFeedback (feedback) {
    this.props.setSelectedNavigation(6)
    this.setState({ feedback })
  }

  addFeedback ( addfeedbk ) {
    this.setState({ addfeedbk })
  }

  submitForm (id, feedbackCategory, feedback) {
     this.presenter.addFeedback(id, feedbackCategory, feedback)
   }

  render () {
    const {
      showCategoryModal,
      category,
      feedback,
      id,
      feedbackCategory,
      value,
    } = this.state

    const { details, chosenCategory } = this.props

    return (
      <div  className = { 'feedback-container' }>
        {
          showCategoryModal &&
          <FeedbackCategoryModal
            showCategoryModal = { showCategoryModal }
            feedback = { feedback}
            chosenCategory = { (id, feedbackCategory, showCategoryModal) => this.setState({ id, feedbackCategory, showCategoryModal}) }
            onChange = { (id, feedbackCategory) => this.setState({ id, feedbackCategory }) }
            onClose = { () => this.setState({ showCategoryModal : false }) } />
        }
        <div className={ 'breadcrumbs-container' }>
        </div>
          <div className = { 'feedback-container' }>
            {
              <FeedbackCard
                details={feedback}
                category={feedbackCategory}
                submitForm = { () => this.submitForm(id, feedbackCategory, feedback) }
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
FeedbackView.propTypes = {
  setSelectedNavigation: PropTypes.func,
}
export default ConnectView(FeedbackView, Presenter)
