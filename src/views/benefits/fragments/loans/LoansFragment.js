import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../styles/benefits.css'
import Countdown from '../../../common/components/Countdown/Countdown'

import { CircularLoader } from '../../../../ub-components'

class LoansFragment extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLoader : true
    }
  }

  componentDidMount () {
    setTimeout(() => this.setState({ showLoader : false }), 3000)
  }

  render () {
    const { history } = this.props

    const { showLoader } = this.state

    const LoansHome = () => (
      <div className={'background'}>
        <div className = { 'container-option1' }>
          <i className = { 'left' } onClick = { () => history.push('/benefits') }></i>
          <h1>Loans</h1>
            <div className = { 'app' }>
              {
                showLoader ?
                <center>
                  <CircularLoader show = {true} />
                </center>                :
                <center>
                  <h1> This module will launch on July 9, 2018</h1>
                  <br/>
                  <div className={'app-countdown'}>
                    <br/>
                    <Countdown dateTo={{ year: 2018, month: 7, date: 9 }}  />
                    </div>
                </center>
              }
            <div className = { 'card-container' }>
            </div>
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
