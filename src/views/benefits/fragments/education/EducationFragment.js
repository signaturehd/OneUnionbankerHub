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
      styleName: 'education-cards-1',
      title: 'EDUCATION AID',
      path: '/mybenefits/benefits/education/aid',
    }, {
      id: 2,
      styleName: 'education-cards-4',
      title: 'EDUCATION GROUP - PLAN',
      path: '/mybenefits/benefits/education/groupaid',
    }, {
      id: 3,
      styleName: 'education-cards-2',
      title: 'EDUCATION GRANT - AID',
      path: '/mybenefits/benefits/education/grantaid',
    }, {
      id: 4,
      styleName: 'education-cards-3',
      title: 'EDUCATION GRANT - PLAN',
      path: '/mybenefits/benefits/education/grantplan',
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
                  <p className = { 'benefits-option-cards font-weight-bold' }>
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
