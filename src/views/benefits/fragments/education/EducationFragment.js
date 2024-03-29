import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, GenericButton } from '../../../../ub-components'
import './styles/education.css'

class EducationFragment extends Component {
  constructor (props) {
    super(props)
  }

  navigate () {
      this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const { history } = this.props

    const benefitsOptions = [{
      id: 1,
      styleName: 'education-cards-1 education-option-default',
      title: 'Education Aid',
      path: '/mybenefits/benefits/education/aid',
    }, {
      id: 3,
      styleName: 'education-cards-1 education-option-default',
      title: 'Education Grant - Aid',
      path: '/mybenefits/benefits/education/grantaid',
    }, {
      id: 4,
      styleName: 'education-cards-1 education-option-default',
      title: 'Education Grant - Plan',
      path: '/mybenefits/benefits/education/grantplan',
    }, {
      id: 2,
      styleName: 'education-cards-1 education-option-default',
      title: 'Education Group - Plan',
      path: '/mybenefits/benefits/education/groupaid',
    }]

    const EducationHome = () => (
        <div>
            <i
              className = { 'back-arrow' }
              onClick = { () => this.navigate() }></i>
            <h1>Education</h1>
          <div className = { 'adjustment' }>
          <div className = { 'education-card-container' }>
            {
            benefitsOptions.map((value, idx) => (
              <Card
                className = { 'education-card' }
                key = { idx }
                onClick = { () => history.push(value.path) } >
                <div className = { 'education-column-grid' }>
                  <div
                    className = { value.styleName}/>
                  <p className = { 'education-option-cards font-weight-bold font-size-15px' }>
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
