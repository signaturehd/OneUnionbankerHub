import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../styles/benefits.css'

class LoansFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const { history } = this.props

    const LoansHome = () => (
        <div className = { 'container-option1' }>
          <i className = { 'left' } onClick = { () => history.push('/benefits') }></i>
          <h1> Loans </h1>
          <div className = { 'adjustment' }>
            <div className = { 'card-container' }>

            </div>
          </div>
        </div>
    )

    return (
      <div>
        <Switch>
          <Route exact path = '/benefits/loans' render = { LoansHome } />
        </Switch>
      </div>
    )
  }
}

export default LoansFragment
