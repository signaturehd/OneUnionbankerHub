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
      submitLoader : false,
      showCommendSection : false
    }

    this.addRating = this.addRating.bind(this)
  }

  addRating () {
    const { rating, comment } = this.state
    const { benefitId } = this.props
    this.presenter.addBenefitFeedback(benefitId, rating, comment)
    this.setState({ submitLoader : true })
  }

  successFeedback (resp) {
    this.props.onClose()
  }

  feedbackFailed () {
    this.setState({ submitLoader : false })
  }

  commentShowIfLowRate (e) {
    this.setState({ rating : e })
    if(parseFloat(e) <= 3) {
      this.setState({ showCommendSection : true })
    } else {
      this.setState({ showCommendSection : false })
    }
  }

  render () {
    const { submitLoader, rating, showCommendSection } = this.state
    const { onClose } = this.props

    return (
      <Modal>
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
                <img
                  onClick={ () => history.push('/settings') }
                  src={ require('../../images/icons/img_message_circle.png') }
                  className= {'sidebar-img-ub-logo'}/>
                <br/>
                <h3>Thank you for using 1Uhub! We&#39;d love to know what your experience was like using the application.</h3>
                <br/>
                <Rating
                  emptySymbol={<MdStarOutline style={{ fontSize: 30, color : '#c65e11' }} />}
                  fullSymbol={<MdStar style={{ fontSize: 30,  color : '#c65e11' }} />}
                  onChange={ e => this.commentShowIfLowRate(e) }
                  initialRating={ rating && rating }
                  fractions={ 2 }
                />
                <br/>
              </center>
              <br/>
              <br/>
              {
                showCommendSection &&
                <div>
                  <h4 className = { 'font-size-16px' }>
                    Tell us why
                  </h4>
                  <textarea
                    className={ 'default-feedback-textarea font-size-14px' }
                    placeholder={ `We're sorry that the experience wasn't as stellar for you. Would you be able to tell us how we can improve further?` }
                    onChange={ e => this.setState({ comment : e.target.value }) }/>
                </div>
              }
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
