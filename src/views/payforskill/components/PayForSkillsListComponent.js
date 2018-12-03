import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Line,
  Card,
  SkeletalLoader,
} from '../../../ub-components/'

import './styles/PayForskillsComponentStyle.css'
import SkillCard from './PayForSkillsComponent.js'
import LoaderComponent from './PayForSkillsLoaderComponent.js'

import moment from 'moment'

class PayForSkillsListComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  	const {
      payForSkillsList,
      posDraft,
      posReview,
      posApproved,
      posReject,
      enabledLoader
  	} = this.props

    return (
      <div className = {'payforskills-container'} >
        <div className = { 'payforskills-card-list' }>
          <div>
            <h2 className = { 'header-margin-default text-align-left' }>Pay For Skills</h2>
            <h2>List of your skill list in one place.</h2>
            <br/>
            <div>
              <h2>For Approval ...</h2>
              <br/>
              {
                enabledLoader ?

                <LoaderComponent
                  enabledLoader  = { enabledLoader  }
                /> :
                <div className = { 'grid-global-columns-x3' }>
                  <SkillCard
                    array = { posApproved }
                  />
                </div>
              }
            </div>
            <div>
              <h2>For Review ...</h2>
              <br/>
              {
                enabledLoader ?

                <LoaderComponent
                  enabledLoader = { enabledLoader }
                /> :
                <div className = { 'grid-global-columns-x3' }>
                  <SkillCard
                    array = { posReview }
                  />
                </div>
              }
            </div>
            <div>
              <h2>For Draft ...</h2>

              {
                enabledLoader ?

                <LoaderComponent
                  enabledLoader = { enabledLoader }
                /> :
                <SkillCard
                  array = { posDraft }
                />
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PayForSkillsListComponent
