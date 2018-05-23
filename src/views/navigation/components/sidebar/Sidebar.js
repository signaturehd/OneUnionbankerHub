import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/sidebar.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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
      textlink,
      icon,
      onClick,
      text,
      path,
      onNavigationClick,
      selected,
      history,
      logout
    } = this.props

    const modules =
    [

      {
        id: 0 ,
        title: 'News',
        action: () => history.push('/'),
        className: 'newsfeed-icon mobile-icon'
      },
      {
        id: 1 ,
        title: 'My Benefits',
        action: () => history.push('/mybenefits/benefits'),
        className: 'benefits-icon mobile-icon'
      },
      {
        id: 2 ,
        title: 'Transactions',
        action: () => history.push('/transaction'),
        className: 'transaction-icon mobile-icon' },
      {
        id: 3 ,
        title: 'FAQS',
        action: () => history.push('/faqs'),
        className: 'faqs-icon mobile-icon'
      },
      {
        id: 4 ,
        title: 'My Profile',
        action: () => history.push('/settings'),
        className: 'settings-icon mobile-icon'
      },
      {
        id: 5 ,
        title: 'MyLearning',
        action: () => history.push('/mylearning'),
        className: 'mylearning-icon mobile-icon'
      },
      {
        id: 6 ,
        title: 'Logout',
        action: logout,
        className: 'logout-icon mobile-icon'
      },
    ]

  return (
    <div className = { '_sidebar-overlay' }>
    <ul className = { '_link-list ul' }>
      {
        modules.map((d, idx) => <li
              className = { `_text-link ${selected === d.id && 'active'}` }
              key = { idx }
              onClick = { d.action }>
              <a key = { idx }
                 className = { ` sidebar-icon ${d.className} ${selected === d.id && 'active'}`}/>
               { d.title }
          </li>)
       }
    </ul>
    </div>
  )
}
}

SideBar.propTypes = {
  text : PropTypes.string,
  icon : PropTypes.string,
  path : PropTypes.string,
  onClick : PropTypes.func,
  selected: PropTypes.number,
  onNavigationClick: PropTypes.func,
}

SideBar.defaultProps = {
  text : 'title',
  icon : 'image',
  selected: -1,
}

export default SideBar
