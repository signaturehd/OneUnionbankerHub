import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './styles/trainingComponentStyle.css'

import { Card } from '../../../ub-components'

class MyTrainingListCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      trainingList,
      venue,
      startDate,
    } = this.props
    return (

      <div
         className="blog-card spring-fever">
        <div className="title-content">
          <h4 className = { 'h3r' }>{ venue }</h4>
          <hr className = { 'hr' } />
          <div className="intro">Yllamco laboris nisi ut aliquip ex ea commodo.</div>
        </div>
        <div className="card-info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
        </div>
        <div className="utility-info">
          <ul className="utility-list">
            <li className="comments">12</li>
            <li className="date">{ startDate }</li>
          </ul>
        </div>
        <div className="gradient-overlay"></div>
        <div className="color-overlay"></div>
      </div>
    )
  }
}

MyTrainingListCardComponent.propTypes = {
  selectedTraining : PropTypes.object
}

export default MyTrainingListCardComponent
