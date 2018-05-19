import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/sidebar.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class SideBar extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { textlink, icon , onClick, text, path, onNavigationClick, selected } = this.props
    const modules =
    [
      { id: 0 , title: 'News', path: '/', className: 'newsfeed-icon mobile-icon' },
      { id: 1 , title: 'My Benefits', path: '/benefits', className: 'benefits-icon mobile-icon' },
      { id: 2 , title: 'Transactions', path: '/transactions', className: 'transaction-icon mobile-icon' },
      { id: 3 , title: 'FAQS', path: '/faqs', className: 'faqs-icon mobile-icon' },
      { id: 4 , title: 'Profile', path: '/settings', className: 'settings-icon mobile-icon' },
      { id: 5 , title: 'Books', path: '/books', className: 'books-icon mobile-icon' },
      { id: 6 , title: 'Podcasts', path: '/podcast', className: 'podcast-icon mobile-icon' },
    ]

  return (
    <div className = { '_sidebar-overlay' }>
    <ul className = { '_link-list ul' }>
      {
        modules.map((d, idx) => <li
              className = { `_text-link ${selected === d.id && 'active'}` }
              key = { idx }
              onClick = { () => onNavigationClick(d.path) }>
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
