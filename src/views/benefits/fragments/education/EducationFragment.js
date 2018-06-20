import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Countdown from '../../../common/components/Countdown/Countdown'
import { Card, CircularLoader } from '../../../../ub-components'

import staticImage from '../../../../images/UBBldg.jpg'
import '../../styles/benefits.css'
import '../../fragments/education/styles/education.css'


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

  navigate () {
      this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const { history } = this.props

    const benefitsOptions = [{
      id: 2,
      styleName: 'education-cards-1',
      title: 'EDUCATION AID',
      path: '/mybenefits/benefits/education/educationaid',
    }]

    const EducationHome = () => (
        <div>
            <i
              className = { 'back-arrow' }
              onClick = { () => this.navigate() }></i>
            <h1>EDUCATION</h1>
          <div className = { 'adjustment' }>
          <div className = { 'card-container' }>
            {
            benefitsOptions.map((value, idx) => (
              <Card
                className = { 'benefits-card' }
                key = { idx }>
                <div
                  className = { value.styleName}
                  text = { value.title }
                  onClick = { () => history.push(value.path) } >
                  <p className = { 'benefits-option-cards' }>
                    { value.title }
                  </p>
                </div>
              </Card>
            ))
          }
          </div>
        </div>
      </div>
    )

    return (
      <div>
        <Switch>
          <Route exact path = '/mybenefits/benefits/education'  render = { EducationHome } />
        </Switch>
      </div>
    )
  }
}

EducationFragment.propTypes = {
  history : PropTypes.object
}

export default EducationFragment
