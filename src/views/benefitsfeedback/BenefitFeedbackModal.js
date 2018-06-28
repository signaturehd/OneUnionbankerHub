import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Presenter from './presenter/BenefitFeedbackPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import { Modal, GenericButton, CircularLoader } from '../../ub-components'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'

import Rating from 'react-rating'

import './styles/benefitFeedback.css'

class BenefitFeedbackModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      rating : 0,
      comment : null,
      submitLoader : false
    }

    this.addRating = this.addRating.bind(this)
  }

  addRating () {
    const { rating, comment } = this.state
    const { benefitId } = this.props
    this.presenter.addFeedback(benefitId, rating, comment)
    this.setState({ submitLoader : true })
  }

  successFeedback (resp) {
    this.props.onClose()
  }

  feedbackFailed () {
    this.setState({ submitLoader : false })
  }

  render () {
    const { submitLoader, rating } = this.state
    const { onClose } = this.props

    return (
      <Modal
        isDismisable={ true }
        onClose={ onClose }
      >
        { super.render() }
        <div className={ 'benefit-feedback' } >
          {
            submitLoader ?
            <center>
              <h3>Please wait while we are submitting your feedback</h3>
              <CircularLoader show={ true }/>
            </center>            :
            <div>
              <center>
                <h3>Your Feedback is important to us to improve our system</h3>
                <br/>
                <Rating
                  emptySymbol={<MdStarOutline style={{ fontSize: 30, color : '#c65e11' }} />}
                  fullSymbol={<MdStar style={{ fontSize: 30,  color : '#c65e11' }} />}
                  onChange={ e => {
                    this.setState({ rating : e })
                  }}
                  initialRating={ rating && rating }
                  fractions={ 2 }
                />
                <br/>
              </center>
              <br/>
              <br/>
              <textarea
                className={ 'default-feedback-textarea' }
                placeholder={ 'Your Feedback' }
                onChange={ e => this.setState({ comment : e.target.value }) }/>
              <br/>
              <br/>
              <div className={ 'benefit-feedback-actions-grid' }>
                <GenericButton onClick={ () => onClose() } text={ 'Close' } />
                <GenericButton onClick={ () => this.addRating() } text={ 'Submit Feedback' } />
              </div>
            </div>
          }
        </div>
      </Modal>
    )
  }
}

BenefitFeedbackModal.propTypes = {
  benefitId : PropTypes.string,
  onClose : PropTypes.func
}


export default ConnectView(BenefitFeedbackModal, Presenter)
