import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../styles/benefits.css'

class EducationView extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const { history } = this.props

    const EducationHome = () => (
        <div className = { 'container-option1' }>
          <i className = { 'left' } onClick = { () => history.push('/benefits') }></i>
          <h1>Education</h1>
          <div className = { 'adjustment' }>
            <div className = { 'card-container' }>

            </div>
          </div>
        </div>
    )

    return (
      <div>
        <Switch>
          <Route exact path = '/benefits/education' render = { EducationHome } />
        </Switch>
      </div>
    )
  }
}

export default EducationView
