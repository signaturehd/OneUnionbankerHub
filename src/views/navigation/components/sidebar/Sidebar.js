import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/sidebar.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Line } from '../../../../ub-components'

class SideBar extends Component {
  constructor (props) {
    super(props)
    this.callLogout = this.callLogout.bind(this)
  }

  callLogout () {
    this.props.logout()
  }

  render () {
    const {
      onClick,
      onNavigationClick,
      selected,
      history,
      logout,
      profile
    } = this.props

    const modules =
    [
      {
        id: 0 ,
        title: 'News Feed',
        action: () => history.push('/'),
        className: 'newsfeed-icon'
      },
      {
        id: 4 ,
        title: 'My Learning',
        action: () => history.push('/mylearning'),
        className: 'mylearning-icon'
      },
      {
        id: 1 ,
        title: 'My Benefits',
        action: () => history.push('/mybenefits'),
        className: 'benefits-icon'
      },
      {
        id: 8 ,
        title: 'My Pay',
        action: () => history.push('/payslip'),
        className: 'payslip-icon'
      },
      {
        id: 3 ,
        title: 'My Profile',
        action: () => history.push('/settings'),
        className: 'settings-icon'
      },
      {
        id: 2 ,
        title: 'FAQs',
        action: () => history.push('/faqs'),
        className: 'faqs-icon'
      },
      {
        id: 6 ,
        title: 'Feedback',
        action: () => history.push('/feedback'),
        className: 'feedback-icon'
      },
      {
        id: 7 ,
        title: 'Logout',
        action: logout,
        className: 'logout-icon'
      },
    ]
  return (
    <div className = { '_sidebar-overlay' }>
      <ul className = { '_link-list ul' }>
        <div className = { 'sidebar-profile-body' }>
          <img
            src={ require('../../../../images/profile-picture.png') }
            className= {'sidebar-img-ub-logo'}/>
        </div>
        <h5 className = { 'sidebar-profile-name' }>
          { profile && profile.fullname }
        </h5>
          {
            modules.map((d, idx) =>
            d.id === 8 ?
            <div
              key = { idx }
            >
              <li
                className = { `_text-link ${selected === d.id && 'active'}` }
                onClick = { d.action }>
                <a key = { idx }
                  className =
                  { ` sidebar-icon ${d.className} ${selected === d.id && 'active'}`}/>
                    { d.title }
              </li>
              <Line />
            </div>              :
              <div
                key = { idx }
              >
                <li
                  className = { `_text-link ${selected === d.id && 'active'}` }
                  onClick = { d.action }>
                  <a key = { idx }
                    className =
                    { ` sidebar-icon ${d.className} ${selected === d.id && 'active'}`}/>
                    { d.title }
                </li>
              </div>
            )
          }
      </ul>
    </div>
    )
  }
}

SideBar.propTypes = {
  onClick : PropTypes.func,
  selected: PropTypes.number,
  onNavigationClick: PropTypes.func,
  history : PropTypes.object,
  logout : PropTypes.func,
}

SideBar.defaultProps = {
  selected: -1,
}

export default SideBar
