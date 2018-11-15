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

import MyGoalsComponent from '../mygoals/components/MyGoalsComponent'

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
      noticeResponse : '',
      goalsArray : [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ]
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
      noticeResponse,
      goalsArray
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
            {
              goalsArray.length !== 0 &&
              <MyGoalsComponent
              cardHolder = { goalsArray }/>
            }
      </div>
    )
  }
}

MyGoalsFragment.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default ConnectView(MyGoalsFragment, Presenter )
