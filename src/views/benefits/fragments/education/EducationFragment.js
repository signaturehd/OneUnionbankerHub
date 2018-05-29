import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../styles/benefits.css'
import Countdown from '../../../common/components/Countdown/Countdown'
import staticImage from '../../../../images/UBBldg.jpg'

import { CircularLoader } from '../../../../ub-components'

class EducationFragment extends Component {
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

    const EducationHome = () => (
      <div className={'background'}>
        <div className = { 'container-option1' }>
          <i className = { 'left' } onClick = { () => history.push('/mybenefits/benefits') }></i>
          <h1>Education</h1>
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
          <Route exact path = '/mybenefits/benefits/education' render = { EducationHome } />
        </Switch>
      </div>
    )
  }
}

export default EducationFragment
