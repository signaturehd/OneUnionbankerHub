import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/motorModalStyle.css'

class MotorCycleReviewFormModal extends Component {

  constructor (props) {
    super (props)

    this.state={
      isDismisable : true
    }
  }

  render () {
    const {
      poaText,
      amountValue,
      modeOfLoanText,
      termOfLoan,
      rateOfLoan,
      onClose,
      onClick,
      imageUrlObject,
      isPayeeOrDealer,
      onYes,
      onNo,
      dealerName
    }=this.props

    const {
       disableSubmit,
       isDismisable
    }=this.state

    return (
      <Modal
        isDismisable={ isDismisable }
        onClose={ onClose }
      >
        <div>
          <center>
            <h2 className={ 'font-weight-normal' }>Form Submission</h2>
          </center>
          <br/>
            <div className={ 'mpl-review-grid' }>
              <div>
                <h4 className={ 'font-weight-normal' }>Purpose Of Availment : </h4>
              </div>
              <div>
                <h4> { poaText ? poaText : '(Not Yet Provided)' }</h4>
              </div>
            </div>

            <div className={ 'mpl-review-grid' }>
              <div>
                <h4 className={ 'font-weight-normal' }>Mode Of Loan : </h4>
              </div>
              <div>
                <h4> { modeOfLoanText ? modeOfLoanText : 'New Loan' }</h4>
              </div>
            </div>
            <div className={ 'mpl-review-grid' }>
              <div>
                <h4 className={ 'font-weight-normal' }>Desired Amount : </h4>
              </div>
              <div>
                <h4> 	&#8369; { amountValue ? amountValue : '(Not Yet Provided)' }</h4>
              </div>
            </div>
            <div className={ 'mpl-review-grid' }>
              <div>
                <h4 className={ 'font-weight-normal' }>Term & Rates : </h4>
              </div>
              <div>
                <h4>{ termOfLoan ? termOfLoan+ ' Months' : '0 Months' }, { rateOfLoan ? rateOfLoan : 0 } %</h4>
              </div>
            </div>
            <br/>
              <div>
                <h4
                  className={ 'font-weight-normal' }>
                  { isPayeeOrDealer }
                </h4>
              </div>
                <div className={ 'mpl-review-grid' }>
                  <div>
                    <h4 className={ 'font-weight-normal' }> { dealerName ? dealerName : '(Not Yet Provided)' } </h4>
                  </div>
                </div>
          <br/>
          <div className={ 'calamity-image-display' }>
            <div
              style={{
                backgroundImage: `url(${ imageUrlObject })`,
                width : '150px',
                height : '150px',
                backgroundSize : 'contain',
                backgroundRepeat : 'no-repeat'
              }}>
            </div>
          </div>
          <br/>
          <div className={ 'mpl-review-grid' }>
            <GenericButton
              text={ 'cancel' }
              onClick={ () => onNo(false) } />
            <GenericButton
              onClick={ () => onYes(true) }
              text={ 'confirm' }
            />
          </div>
        </div>
      </Modal>
    )
  }
}

MotorCycleReviewFormModal.propTypes={
  onClose : PropTypes.func,
  onYes : PropTypes.func,
  onNo : PropTypes.func,
  details : PropTypes.func,
  confirm : PropTypes.string,
  confirm : PropTypes.string,
  poaText : PropTypes.string,
  termOfLoan : PropTypes.string,
  rateOfLoan : PropTypes.string,
  modeOfLoanText : PropTypes.string,
  isPayeeOrDealer : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  imageUrlObject : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
}
MotorCycleReviewFormModal.defaultProps={
  confirm : 'Agree',
  cancel : 'Disagree',
}

export default MotorCycleReviewFormModal
