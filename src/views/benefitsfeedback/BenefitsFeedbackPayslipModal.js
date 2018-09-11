import React, { Component } from 'react'
import PropTypes from 'prop-types'


import Presenter from './presenter/BenefitFeedbackPresenter'
import ConnectView from '../../utils/ConnectView'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput
} from '../../ub-components'

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
                <div className = { 'grid-global-rows' }>
                  <h2>
                    Payroll Concern
                  </h2>
                  <h2 className = { 'font-size-14px' }>Please select the type of payroll concern you want to raise</h2>
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
              <h2>Do you have a payroll concern? </h2>
              <h3>Please tell us more about this so we can help.</h3>
              <br/>
                <GenericInput
                  type={ 'text' }
                  hint = { 'What was your experience?' }
                  value={ selectedFeedback ? selectedFeedback : '' }
                  placeholder={ 'Payroll Concern' }
                  onClick={ () => this.setState({ payrollModalIssue : true }) }
                />
              <br/>
              <textarea
                className={ 'default-feedback-textarea font-size-14px font-weight-normal' }
                placeholder={ 'Let us know more ...' }
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
