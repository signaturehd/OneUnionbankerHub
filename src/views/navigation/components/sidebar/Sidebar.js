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
      profile,
      tempPreEmployment,
      splitUserInitial
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
      id: 11 ,
      title: 'Onboarding Pre-Employment',
      action: () => history.push('/preemployment'),
      className: 'compliance-icon'
    },
    {
      id: 12 ,
      title: 'Post Pre-Employment',
      action: () => history.push('/postpreemployment'),
      className: 'compliance-icon'
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
      id: 9 ,
      title: 'My Compliance',
      action: () => history.push('/mycompliance'),
      className: 'compliance-icon'
    },
    {
      id: 10 ,
      title: 'Phenom Prime',
      action: () => history.push('/phenom'),
      className: 'phenom-sidebar-icon'
    },
    {
      id: 3 ,
      title: 'My Personal Information',
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
    console.log(tempPreEmployment)
  return (
    <div className = { '_sidebar-overlay' }>
      <ul className = { '_link-list ul' }>
        <div className = { 'sidebar-profile-body' }>
          <div className={ 'sidebar-picture-card' }>
            <div>
              <div className = { 'sidebar-picture' }>
                <h2 className = { 'sidebar-initial-text' }>{ splitUserInitial }</h2>
              </div>
            </div>
          </div>
        </div>
        {
          profile && profile.fullname ?
          <h5 className = { 'sidebar-profile-name' }>
            { profile && profile.fullname }
          </h5> :
          <h5 className = { 'sidebar-profile-name' }>
            ( Employee Name Retrieving.... )
          </h5>
        }
        {
          tempPreEmployment === 1 ||
          tempPreEmployment === 2 ?
        <div>
        {
          modules.map((d, idx) =>
          d.id !== 0 &&
          d.id !== 1 &&
          d.id !== 2 &&
          d.id !== 3 &&
          d.id !== 4 &&
          d.id !== 5 &&
          d.id !== 6 &&
          d.id !== 8 &&
          d.id !== 9 &&
          d.id !== 10 &&
          d.id !== 12 &&
          <div key = { idx }>
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
        </div>
        :
        <div>
          {
            modules.map((d, idx) =>
            d.id !== 11 &&
            <div key = { idx }>
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
        </div>
      }
      </ul>
    </div>
    )
  }
}

SideBar.propTypes = {
  onClick : PropTypes.func,
  splitUserInitial : PropTypes.func,
  selected: PropTypes.number,
  onNavigationClick: PropTypes.func,
  history : PropTypes.object,
  logout : PropTypes.func,
}

SideBar.defaultProps = {
  selected: -1,
}

export default SideBar
