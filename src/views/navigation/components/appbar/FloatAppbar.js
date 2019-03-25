import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/appbar.css'

class FloatAppbar extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    const {
      history,
      selected
    } = this.props

    let navBarList = [{
      id: 0,
      name: 'Home',
      imageStyle : 'news',
      imageActive: require('../../../../images/drawer/home-orange.png'),
      imageInactive: require('../../../../images/drawer/home-grey.png'),
      action : () => history.push('/'),
    },{
      id: 1,
      name: 'My Benefits',
      imageStyle : 'benefits',
      imageActive: require('../../../../images/drawer/my-benefits-orange.png'),
      imageInactive: require('../../../../images/drawer/my-benefits-grey.png'),
      action : () => history.push('/mybenefits')
    },{
      id: 8,
      name: 'My Pay',
      imageStyle : 'pay',
      imageActive: require('../../../../images/drawer/my-pay-orange.png'),
      imageInactive: require('../../../../images/drawer/my-pay-grey.png'),
      action : () => history.push('/payslip')
    },{
      id: 4,
      name: 'My Learning',
      imageStyle : 'learning',
      imageActive: require('../../../../images/drawer/my-learning-orange.png'),
      imageInactive: require('../../../../images/drawer/my-learning-grey.png'),
      action : () => history.push('/mylearning'),
    },{
      id: 6,
      name: 'Feedback',
      imageStyle : 'feedback',
      imageActive: require('../../../../images/drawer/feedback-orange.png'),
      imageInactive: require('../../../../images/drawer/feedback-grey.png'),
      action : () => history.push('/feedback'),
    }]

    return (
      <div className = { 'float-appbar-icons' }>
        {
          navBarList.map((resp, key) => (
            <div
              onClick = { () => resp.action() }
              key = { key }
              className = { 'appbar-default-menu' }>
              <center className = { 'appbar-navbar-icon-grid' }>
                <div className = { 'appbar-grid-icon-center' }>
                  <div></div>
                    <button
                      type = { 'button' }
                      className = { `viewmore tooltip ` }>
                        <img
                          style = {{
                            height : 35,
                          }}
                          src={ `${ selected === resp.id ? resp.imageActive : resp.imageInactive }` }
                        />
                    </button>
                  <div></div>
                </div>
              </center>
            </div>
          ))
        }
      </div>
    )
  }
}
export default FloatAppbar
