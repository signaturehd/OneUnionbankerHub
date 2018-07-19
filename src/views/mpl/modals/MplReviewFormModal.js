import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader } from '../../../ub-components/'

import './styles/mplModalStyle.css'

class MplReviewFormModal extends Component {

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
      onNo
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
                <h4> { modeOfLoanText ? modeOfLoanText : '(Not Yet Provided)' }</h4>
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
            {
              isPayeeOrDealer ?

              isPayeeOrDealer.map((name, key) =>
                  <div key={key}>
                    <h4
                      className={ 'font-weight-normal' }
                      key={ key }>
                      { name }
                    </h4>
                  </div>
                )
              :
                <div className={ 'mpl-review-grid' }>
                  <div>
                    <h4 className={ 'font-weight-normal' }> '(Not Yet Provided)' : </h4>
                  </div>
                  <div>
                    <h4> '(Not Yet Provided)' </h4>
                  </div>
                </div>
            }
          <br/>
          <div className={ 'calamity-image-display' }>
            {
              imageUrlObject ?
              imageUrlObject.map((image, key) =>
                <div
                  key={ key }
                  style={{
                    backgroundImage: `url(${ image.base64 })`,
                    width : 'auto',
                    height : '150px',
                    backgroundSize : 'contain',
                    backgroundRepeat : 'no-repeat'
                  }}>
                </div>
              )
              :
              <div></div>
            }
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

MplReviewFormModal.propTypes={
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
MplReviewFormModal.defaultProps={
  confirm : 'Agree',
  cancel : 'Disagree',
}

export default MplReviewFormModal
