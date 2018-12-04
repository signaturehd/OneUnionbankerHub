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
import moment from 'moment'

import { Progress } from 'react-sweet-progress'
import './styles/requestedGoal.css'

class CommentsListComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      onEditComment: false,
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
      cardHolder,
      employeeName,
      commentId,
      goalComment,
      updateComment } = this.props
    const {
      onEditComment,
      goalEditComment
    } = this.state

    return (
      <div>
        <div className = { 'employee-column' }>
          <img src = { require('../../../images/1uhub.png') } width = { '50px' } height = { '50px' }/>
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
                onClick = { () => updateComment(commentId, goalEditComment) }
              />
            </div>
            </div>
            :
            <div className={ 'comment-border margin-5px padding-5px' }>
              <h2 className = { 'text-align-left font-size-12px font-weight-bold unionbank-color header-column' }>{employeeName}<span
                className = { 'icon-check icon-edit-img' }
                onClick = { () => this.onEditCommentFunc(goalComment) }
              /></h2>
              <h2 className = { 'text-align-left font-size-12px font-weight-lighter' }>{goalComment}</h2>
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
