import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'

import {
  CircularLoader,
  Card,
  GenericButton,
  GenericInput ,
  Modal
} from '../../../ub-components/'

import './styles/teamGoal.css'

import { convertInitial } from '../../../utils/initialUtils.js'

class SquadGoalListComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      viewMoreText: 'View Squad Goals',
    }
  }

  render () {
    const {
      teamGoalsArray,
      onSelected
    } = this.props

    const {
      index,
      viewMoreText,
    } = this.state

    return (
      <div>
        <div className = { 'grid-global' }>
          <div></div>
          <div className = { 'text-align-right' }>
            <GenericButton
              className = { 'profile-button-small' }
              onClick = { () => {
                if(viewMoreText === 'View Squad Goals') {
                  this.setState({ index: teamGoalsArray.length, viewMoreText: 'Hide Squad Goals' })
                } else {
                  this.setState({ index: 0, viewMoreText: 'View Squad Goals' })
                }
              } }
              text = { viewMoreText }/>
          </div>
        </div>
        <br/>
        {
          teamGoalsArray && teamGoalsArray.slice(0, index).map((squad, key) => (
          <Card
            key = { key }
            className = { ' cursor-pointer' }
            onClick = { () => {
              onSelected(1,squad.id, 'squad')
            } }>
            <div className = { 'padding-15' }>
              <h2 className = { 'text-align-left font-size-14px font-weight-bold' }>{ squad.title }</h2>
              <h2 className = { 'text-align-left font-size-11px font-weight-lighter' }>{ squad.description }</h2>
              <br/>
              <h2 className = { 'text-align-left font-size-10px font-weight-lighter color-gray' }>Participants</h2>
              <div>
                {
                  squad && squad.participants.map((participant, key) => (
                    <div className = { 'squad-profile-picture' }>
                      <h2 className = { 'squad-initial-text' }>{ convertInitial(participant && participant.fullName) }</h2>
                    </div>
                  ))
                }
              </div>
            </div>
          </Card>
          ))
        }
      </div>
    )
  }
}

SquadGoalListComponent.propTypes = {
}

export default SquadGoalListComponent
