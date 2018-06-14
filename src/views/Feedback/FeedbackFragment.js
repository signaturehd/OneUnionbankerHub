import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/FeedbackPresenter'
import ConnectView from '../../utils/ConnectView'

import GetFeedbackInteractor from '../../domain/interactor/feedback/GetFeedbackInteractor'
import FeedbackCategoryModal from './modals/FeedbackCategoryModal'
import FeedbackCard from './components/FeedbackCardFragment/FeedbackCard'

import './styles/feedbackStyles.css'

import { NotifyActions } from '../../actions'
import store from '../../store'

class FeedbackFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      showCategoryModal : false,
      category : null,
      feedback : [],
      feedbackId : null,
      feedbackValue : null,
      showFeedback : true,
    }
    this.showFeedback = this.showFeedback.bind(this)
  }

  componentDidMount () {
    this.presenter.getFeedback()
    this.props.setSelectedNavigation(6)
  }

  showFeedback (feedback) {
    this.setState({ feedback })
  }

  submitForm (feedbackId, feedbackValue) {
    this.setState({ showFeedback: false })
    if (!feedbackId || !feedbackValue) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Feedback',
          message : 'Please check the Form before submitting',
          type : 'warning',
          duration : 2000
        })
      )
    } else {
      this.presenter.addFeedback(feedbackId, feedbackValue)
    }
  }


  onSuccessSubmit (showFeedback) {
    this.setState({ showFeedback, feedbackId: null, feedbackValue: null })
  }

  onFailedSubmit (showFeedback) {
    this.setState({ showFeedback })
  }

  render () {
    const {
      showCategoryModal,
      feedback,
      feedbackValue,
      feedbackId,
      showFeedback
    } = this.state

   const { details, chosenCategory, feedbackTextareaValue } = this.props

   return (
      <div>
        <h2 className = { 'header-margin-default ' }>FEEDBACK</h2>
        {
          showCategoryModal &&
          <FeedbackCategoryModal
            showCategoryModal = { showCategoryModal }
            feedback = { feedback }
            onChange = { (feedbackId, feedbackValue) => this.setState({ feedbackId, feedbackValue }) }
            onClose = { () => this.setState({ showCategoryModal : false }) } />
        }
        <div className={ 'breadcrumbs-container' }>
        </div>
            {
              <FeedbackCard
                feedbackCategory = { feedbackValue }
                submitForm = { feedbackValue => this.submitForm(feedbackId, feedbackValue) }
                showFeedback = { showFeedback }
                onClick = {
                  showCategoryModal =>
                  this.setState({ showCategoryModal })
                }
              />
            }
      </div>
    )
  }
}
FeedbackFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}
export default ConnectView(FeedbackFragment, Presenter)
