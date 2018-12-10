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
            <h2
              className = { 'header-margin-default text-align-left' }>Pay For Skills</h2>
            <h2>List of your skill list in one place.</h2>
            <br/>
            <br/>
            {
              payForSkillsList === undefined &&
              <center className = { 'circular-loader-center' }>
                <h2>
                  No Records.
                </h2>
              </center>
            }
            <br/>
            {
              posApproved && posApproved.length !== 0 &&
              <div>
                <h2
                  className = { 'font-weight-bold font-size-18px' }>Approved ...</h2>
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
            }
            {
              posReview && posReview.length !== 0 &&
              <div>
                <h2 className = { 'font-weight-bold font-size-18px' }>For Review ...</h2>
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
            }
            {
              posDraft && posDraft.length !== 0 &&
              <div>
                <h2 className = { 'font-weight-bold font-size-18px' }>Draft ...</h2>
                <br/>
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
            }
          </div>
        </div>
      </div>
    )
  }
}

export default PayForSkillsListComponent