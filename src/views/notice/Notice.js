import React from 'react'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/NoticePresenter'
import ConnectView from '../../utils/ConnectView'

import PropTypes from 'prop-types'

import {
  Modal,
  GenericTextBox,
  GenericButton,
  CircularLoader
} from '../../ub-components/'

import './styles/notice-styles.css'

class Notice extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      disableSubmit : false,
      showValidatedCofirmation: false,
      showCancelCofirmation: false
    }
    this.onFailed = this.onFailed.bind(this)
  }

  isAgree (tranId, isAgree, benId) {
    this.presenter.updateNotice(tranId, isAgree, benId)
  }

  onSuccess (response) {
    this.props.onDismiss(false, response)
  }

  onFailed (response) {
    this.props.onDismiss(false)
  }

  render () {
    const { noticeResponse, onClose, back, benefitId, onDismiss } = this.props
    const {
      isDismissable,
      disableSubmit,
      showValidatedCofirmation,
      showCancelCofirmation
    } = this.state

    return (
      <Modal
        width={ 45 }
        isDismissable = { isDismissable }
        onClose = { onClose }
      >
      { super.render() }
        {
          noticeResponse.forms &&
          noticeResponse.forms.map((form, key) =>
            <div key = { key }>
              <div dangerouslySetInnerHTML = {{ __html : form.form }}></div>
            </div>
          )
        }
        {
          disableSubmit || isDismissable ?
          <center>
            <CircularLoader show={true}/>
          </center>          :
          <div>
          <center>
            <br/>
            <br/>
            <GenericButton text = {'Agree'} className = { 'notice-button-modal' }
              onClick = { () =>
                  this.setState({ showValidatedCofirmation : true  })
              }
            />
            <GenericButton text = {'Disagree'} className = { 'notice-button-modal' }
              onClick = { () => {
                this.setState({ showCancelCofirmation : true  })
                }
              }
            />
          {
            showCancelCofirmation &&
            <Modal
              >
              <center>
                <h4> By not confirming, your application will not proceed. Are you sure you want to cancel ? </h4>
                <div className={ 'grid-global' }>
                  <GenericButton
                    text={ 'No' }
                    onClick={ () => this.setState({ showCancelCofirmation : false }) }/>
                  <GenericButton
                    text={ 'Yes' }
                    onClick={
                      () =>  {
                        this.isAgree(noticeResponse.transactionId.toString(), 0, benefitId),
                        this.setState({ isDimissable : true, disableSubmit: true })
                        }
                      }
                    />
                </div>
              </center>
            </Modal>
          }
          {
            showValidatedCofirmation &&
            <Modal
              onClose={ () => this.setState({ showValidatedCofirmation: false }) }
              isDismisable={ true }
              >
              <center>
                <h4> Are you sure you want to Submit your form ? </h4>
                <div className={ 'grid-global' }>
                  <GenericButton
                    text={ 'No' }
                    onClick={ () => this.setState({ showValidatedCofirmation : false }) }/>
                  <GenericButton
                    text={ 'Yes' }
                    onClick = { () => {
                        this.isAgree(noticeResponse.transactionId.toString(), 1, benefitId),
                        this.setState({ isDimissable : true, disableSubmit: true })
                      }
                    }
                    />
                </div>
              </center>
            </Modal>
          }
          </center>
          </div>
        }


      </Modal>
    )
  }
}

export default ConnectView(Notice, Presenter)
