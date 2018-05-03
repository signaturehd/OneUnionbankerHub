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
      { id: 0 , title: 'News', path: '/' },
      { id: 1 , title: 'Benefits', path: '/benefits' },
      { id: 2 , title: 'Transactions', path: '/transactions' },
      { id: 3 , title: 'Faqs', path: '/faqs' },
      { id: 4 , title: 'Settings', path: '/settings' },
      { id: 5 , title: 'Books', path: '/books' },
    ]

  return (
    <div className = { '_sidebar-overlay' }>
    <ul className = { '_link-list ul' }>
      {
        modules.map((d, idx) => {
          return <li
              className = { `_text-link ${selected === d.id && 'active'}` }
              key = { idx }
              onClick = { () => onNavigationClick(d.path) }>
              <a key = { idx }
                 className = {`sidebar-icon ${selected === d.id && 'sidebar-active'}`}/>
               { d.title }
          </li>
        })
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
