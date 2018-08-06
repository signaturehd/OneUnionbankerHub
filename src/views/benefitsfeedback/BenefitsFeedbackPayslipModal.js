import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Presenter from './presenter/BenefitFeedbackPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import { Modal, GenericButton, CircularLoader, GenericTextBox } from '../../ub-components'

import './styles/benefitFeedback.css'

class BenefitsFeedbackPayslipModal extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      rating : 0,
      comment : null,
      submitLoader : false,
      payrollModalIssue : false,
      selectedFeedback : '',
      respCategories: [],
      respCategoriesId: ''
    }

    this.addRating = this.addRating.bind(this)
  }

  componentDidMount () {
    this.presenter.getPayslipFeedbackCategoriesDiscrepancy()
  }

  addRating () {
    const { respCategoriesId, comment } = this.state
    this.presenter.addPayslipFeedbackDiscrepancy(comment, respCategoriesId)
    this.setState({ submitLoader : true })
  }

  showFeedbackCategoriesDiscrepancy (respCategories) {
    this.setState({ respCategories })
  }

  successFeedback (resp) {
    this.props.onClose()
  }

  feedbackFailed () {
    this.setState({ submitLoader : false })
  }

  render () {
    const {
      submitLoader,
      rating,
      selectedFeedback,
      payrollModalIssue,
      respCategories,
      respCategoriesId,
    } = this.state

    const { onClose } = this.props
    return (
      <Modal>
        { super.render() }
        <div className={ 'benefit-feedback' } >
        {
          payrollModalIssue &&
          <Modal
            onClose={ () => this.setState({ payrollModalIssue : false }) }
            isDismisable={ true }>
            <div>
              <center>
                <div>
                  Payroll Issue
                </div>
                {
                  respCategories.map((resp, key) =>
                    <GenericButton
                      className={ 'payslip-button' }
                      key={ key }
                      text={ resp.category }
                      onClick={ () =>{
                        this.setState({
                          selectedFeedback: resp.category,
                          respCategoriesId : resp.id,
                          payrollModalIssue : false
                        })}
                      }
                    />
                  )
                }
              </center>
            </div>
          </Modal>
        }
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
                <GenericTextBox
                  type={ 'text' }
                  value={ selectedFeedback ? selectedFeedback : '' }
                  placeholder={ 'Please select payroll issue' }
                  onClick={ () => this.setState({ payrollModalIssue : true }) }
                />
              <br/>
              <textarea
                className={ 'default-feedback-textarea' }
                placeholder={ 'Tell us why' }
                onChange={ e => this.setState({ comment : e.target.value }) }/>
            </center>
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

BenefitsFeedbackPayslipModal.propTypes = {
  benefitId : PropTypes.string,
  onClose : PropTypes.func
}


export default ConnectView(BenefitsFeedbackPayslipModal, Presenter)
