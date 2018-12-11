import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Line,
  Card,
} from '../../../ub-components/'

import './styles/PayForskillsComponentStyle.css'

import moment from 'moment'

class PayForSkillsComponent extends Component {
  constructor (props) {
    super(props)
  }

  getDateFormat (date) {
    const newDate = date.replace('Z','')

    return moment(newDate).format('dddd, MMMM DD, YYYY')
  }

  render () {
  	const {
      array,
  	} = this.props

    return (
      array && array.map((skill, key) =>
        <Card
          className = { 'payskills-card' }
          key = { key }>
          <div className = { 'payskills-date-grid' }>
            <div>
              <div>
                <h4 className = { 'font-size-18px font-weight-bold unionbank-color' }>
                  { skill.program &&
                    skill.program.name ?
                    skill.program.name :
                    '(No Information)' }
                </h4>
                <br/>
                {
                  skill.accreditingBody.name.toLowerCase()  === 'others' ?
                  <h4 className = { 'font-size-13px font-weight-normal' }>
                    { skill.others ? skill.others : '(No Information)' }
                  </h4>
                  :
                  <h4 className = { 'font-size-13px font-weight-normal' }>
                    {
                      skill.accreditingBody &&
                      skill.accreditingBody.name ?
                      skill.accreditingBody.name :
                      '(No Information)' }
                  </h4>
                }
              </div>
            </div>
            <h4 className = { 'font-size-12px font-weight-normal' }>
              { skill.dateOfCompletion ? this.getDateFormat(skill.dateOfCompletion) : '(No Information)' }
            </h4>
          </div>
        </Card>
      )
    )
  }
}

export default PayForSkillsComponent
