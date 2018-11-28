import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Line,
  Card,
} from '../../../ub-components/'

import './styles/PayForskillsComponentStyle.css'

import moment from 'moment'

class PayForSkillsListComponent extends Component {
  constructor (props) {
    super(props)
  }

  getDateFormat (date) {
    const newDate = date.replace('Z','')

    return moment(newDate).format('dddd, MMMM DD, YYYY')
  }

  render () {
  	const {
      payForSkillsList
  	} = this.props

    return (
      <div className = {'payforskills-container'} >
        <div className = { 'payforskills-card-list' }>
          <div>
            <h2 className = { 'header-margin-default text-align-left' }>Pay For Skills</h2>
            <h2>List of your skill list in one place.</h2>
            <br/>
            <div className = { 'grid-global-columns-x3' }>
              {
                payForSkillsList &&
                payForSkillsList.map((skill, key) => (
                  <Card
                    className = { 'payskills-card' }
                    key = { key }>
                    <div className = { 'payskills-date-grid' }>
                      <div className = { 'payskills-card-grid' }>
                        <div className = { 'text-align-right' }>
                          <h4 className = { 'font-size-16px font-weight-bold' }>
                            { skill.status ? skill.status.status : '(No Information)' }
                          </h4>
                        </div>
                        <div>
                          <h4 className = { 'font-size-18px font-weight-bold unionbank-color' }>
                            { skill.program ? skill.program.program : '(No Information)' }
                          </h4>
                          {
                            skill.accreditingBodyId.id === 21 ?
                            <h4 className = { 'font-size-13px font-weight-normal' }>
                              { skill.others ? skill.others : '(No Information)' }
                            </h4>
                            :
                            <h4 className = { 'font-size-13px font-weight-normal' }>
                              { skill.accreditingBodyId ? skill.accreditingBodyId.accreditingBody : '(No Information)' }
                            </h4>
                          }
                        </div>
                      </div>
                      <h4 className = { 'font-size-12px font-weight-normal' }>
                        { skill.dateOfCompletion ? this.getDateFormat(skill.dateOfCompletion) : '(No Information)' }
                      </h4>
                    </div>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PayForSkillsListComponent
