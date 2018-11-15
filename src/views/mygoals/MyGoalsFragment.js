import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import Presenter from './presenter/MyGoalsPresenter'

import {
  Modal,
  GenericButton,
  GenericInput,
  SingleInputModal,
  CircularLoader,
  DatePicker,
  Card,
  Line,
  FloatingActionButton
} from '../../ub-components/'

import ResponseModal from '../notice/NoticeResponseModal'

import { format } from '../../utils/numberUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/myGoals.css'

class MyGoalsFragment extends BaseMVPView {

  constructor(props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeResponseModal : false,
      noticeResponse : ''
    }
  }

  componentDidMount() {

  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponseModal : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
    const {
      enabledLoader,
      showNoticeResponseModal,
      noticeResponse
    } = this.state

    return (
      <div>
        {
          enabledLoader ?
          <Modal>
            <center>
              <h2>Please wait...</h2>
              <CircularLoader show = { enabledLoader }/>
            </center>
          </Modal>
          :
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false })
            }}
            noticeResponse={ noticeResponse }
          />
        }
        <div className = { 'grid-container' }>
          <div className={ 'header-margin-container' }>
            <i className = { 'back-arrow' } onClick = { this.navigate.bind(this) }></i>
          </div>
          <div>
            <div>
              <h2 className={ 'header-margin-default text-align-left' }>My Goals</h2>
              <h2></h2>
            </div>
            <div className = { 'text-align-right margin-right' }>
              <GenericButton
                text = { 'Add Goal' }
                className = { 'global-button profile-button-small' }
              />
            </div>
          </div>
        </div>
        <br/>
        <Line/>
        <br/>
        <div className = { 'grid-main' }>
          <div className = { 'padding-5px' }>
            <Card>
              <div className = { 'grid-global' }>
                <div>
                  <h2>qwertyuiop</h2>
                  <h2>qwertyuiop</h2>
                </div>
                <div>
                  <h2>qwertyuiop</h2>
                  <h2>qwertyuiop</h2>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }
}

MyGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(MyGoalsFragment, Presenter )
