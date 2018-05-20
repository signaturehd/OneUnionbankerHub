import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../styles/benefits.css'
import Countdown from '../../../common/components/Countdown/Countdown'
import staticImage from '../../../../images/UBBldg.jpg'


class EducationFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { history } = this.props
      
    

    const EducationHome = () => (
        <div className={'background'}>
        <div className = { 'container-option1' }>
          <i className = { 'left' } onClick = { () => history.push('/benefits') }></i>
          <h1>Education</h1>
          
          <div className = { 'app' }>
          <center>
          <h1> Launching soon This July 9</h1>
          <br/>
          <div className={'app-countdown'}>
          <br/>
          <Countdown dateTo={{ year: 2018, month: 7, date: 9 }}  />,
          </div>
          </center>
            <div className = { 'card-container' }>
              </div>
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

export default EducationFragment