import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import {
  Modal,
  GenericButton,
  GenericInput,
  SingleInputModal,
  CircularLoader,
  DatePicker,
  Card,
  Line,
  Checkbox,
  FloatingActionButton
} from '../../../ub-components/'

import { format } from '../../../utils/numberUtils'
import { convertInitial } from '../../../utils/initialUtils'
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/requestedGoal.css'

class CommentsListComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      onEditComment: false,
      showCommentOption: false,
      deleteCommentMode: false,
      goalEditComment: ''
    }
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  onEditCommentFunc (goalEditComment) {
    this.setState ({ goalEditComment, onEditComment: true })
  }

  onEditCommentChange (goalEditComment) {
    this.setState ({ goalEditComment })
  }

  render () {
    const {
      goalId,
      cardHolder,
      employeeName,
      commentId,
      goalComment,
      updateComment,
      deleteCommentFunc,
      employeeNumber,
      dateTime,
      respEmployeeNumber
    } = this.props

    const {
      onEditComment,
      showCommentOption,
      goalEditComment,
      deleteCommentMode
    } = this.state
    return (
      <div>
        {
          showCommentOption &&
          <Modal
            isDismisable = { true }
            onClose = { () => this.setState({ showCommentOption: false }) }>
            {
              deleteCommentMode ?
              <center>
                <h2>Are you sure you want to delete this comment?</h2>
                <br/>
                <div className = { 'grid-global' }>
                  <GenericButton
                    text = { 'No' }
                    onClick = { () => this.setState({ deleteCommentMode: false, showCommentOption: false }) }
                    className = { 'profile-button-small' }
                  />
                  <GenericButton
                    text = { 'Yes' }
                    className = { 'profile-button-small' }
                    onClick = { () => {
                        deleteCommentFunc(commentId, goalId),
                        this.setState({ goalComment: '', deleteCommentMode: false, showCommentOption: false })
                      }
                    }
                  />
                </div>
              </center>
              :
              <center>
                <h2>Select action</h2>
                <br/>
                  <div className = { 'grid-global' }>
                      <GenericButton
                        text = { 'Edit' }
                        onClick = { () => this.setState({
                        addComment: true,
                        onEditComment: true,
                        showCommentOption: false
                       }) }
                        className = { 'profile-button-small' }
                      />
                    <GenericButton
                      text = { 'Delete' }
                      className = { 'profile-button-small' }
                      onClick = { () => this.setState({ deleteCommentMode: true }) }
                    />
                  </div>
              </center>
            }
          </Modal>
        }
        <div className = { 'employee-column' }>
          <div className = { 'team-profile-picture' }>
            <h2 className = { 'team-initial-text' }>{ convertInitial(employeeName && employeeName) }</h2>
            <small></small>
          </div>
          {
            onEditComment ?
            <div>
            <GenericInput
              text = { 'Edit comment' }
              value = { goalEditComment }
              onChange = { (e) => this.onEditCommentChange(e.target.value) }
              type = { 'textarea' }
            />
            <div className = { 'grid-global' }>
              <GenericButton
                text = { 'Cancel' }
                className = { 'profile-button-small' }
                onClick = { () => this.setState({ onEditComment: false, goalEditComment: '' }) }
              />
              <GenericButton
                text = { 'Update' }
                className = { 'profile-button-small' }
                onClick = { () => {
                  updateComment(commentId, goalEditComment),
                  this.setState({ onEditComment: false, goalEditComment: '' })
                } }
              />
            </div>
            <br/>
            <Line/>
            <br/>
            </div>
            :
            <div className={ 'requestComment-border margin-5px padding-5px cursor-pointer' } onClick = { () =>
              {
                employeeNumber === respEmployeeNumber &&
                this.setState({ showCommentOption: true, goalEditComment: goalComment })
              }
            }>
              <h2 className = { 'text-align-left font-size-12px font-weight-bold unionbank-color' }>{employeeName}</h2>
              <div className = { 'grid-global' }>
                <h2 className = { 'text-align-left font-size-12px font-weight-lighter' }>{goalComment}</h2>
                <div className = { 'text-align-right' }>
                  <h2 className = { 'text-align-right font-size-10px font-weight-lighter' }>{moment(dateTime).fromNow()}</h2>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

CommentsListComponent.propTypes = {
  onSendPageNumberToView : PropTypes.func
}

export default CommentsListComponent
