import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Presenter from './presenter/BenefitFeedbackPresenter'
import ConnectView from '../../utils/ConnectView'

import { Modal, GenericButton, CircularLoader } from '../../ub-components'
import { MdStarOutline, MdStar } from 'react-icons/lib/md'

import Rating from 'react-rating'

import './styles/benefitFeedback.css'

class BenefitFeedbackModal extends Component {
  constructor (props) {
    super(props)
    this.setState = {
      rating : 0,
      comment : null,
      submitLoader : false
    }
  }

  addRating () {
    const { rating, comment } = this.state
    const { benefitId } = this.props
    this.presenter.addRating( benefitId, rating, comment )
    this.setState({ submitLoader : true })
  }

  successFeedback (resp) {
    console.log(resp)
  }

  render () {

    const { submitLoader } = this.state

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        <div className = { 'benefit-feedback' } >
          {
            submitLoader ?
            <center>
              <h3>Please wait while we are submitting your feedback</h3>
              <CircularLoader show = { true }/>
            </center>
            :
            <div>
              <h3>Your Feedback is important to us to improve our system</h3>
              <br/>
              <Rating
                emptySymbol = {<MdStarOutline style = {{ fontSize: 30, color : '#c65e11' }} />}
                fullSymbol = {<MdStar style = {{ fontSize: 30,  color : '#c65e11' }} />}
                onChange = { e => {
                  this.setState({ rating : e })
                }}
                fractions = { 2 }
              />
              <br/>
              <textarea placeholder = { 'Your Feedback' } onChange = { e => this.setState({ comment : e.target.value }) }/>
              <br/>
              <div className = { 'benefit-feedback-action-grid' }>
                <GenericButton onClick = { () => onClose() } text = { 'Close' } />
                <GenericButton onClick = { () => this.addRating() } text = { 'Submit Feedback' } />
              </div>
            </div>
          }
        </div>
      </Modal>
    )
  }
}

BenefitFeedbackModal.propTypes = {
  benefitId : PropTypes.number,
  onClose : PropTypes.func
}


export default ConnectView(BenefitFeedbackModal, Presenter)
