import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles/sidebar.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LibraryView from '../../../library/LibraryView'
class SideBar extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { textlink, icon , onClick, text, link, onNavigaionClick } = this.props
    const modules =
    [
      { id: 0 , title: 'Benefits', path: '/benefits' },
      { id: 1 , title: 'News', path: '/news' },
      { id: 2 , title: 'Transactions', path: '/transations' },
      { id: 4 , title: 'Faqs', path: '/faqs' },
      { id: 5 , title: 'Settings', path: '/settings' },
      { id: 6 , title: 'Books', path: '/books' },
    ]
    return (
      <div className = { '_sidebar-overlay' }>
      <ul className = { '_link-list' }>
          {
            modules.map((d, idx) => (
              <li
                  className = { '_text-link' }
                  key = { idx }
                  onClick = { () => onNavigaionClick(d.path) }>
                  { d.title }
              </li>
              ))
         }
      </ul>
      </div>
    )
  }
}
SideBar.propTypes = {
  text : PropTypes.string,
  icon : PropTypes.string,
  link : PropTypes.string,
  onClick : PropTypes.func,
}

SideBar.defaultProps = {
  text : 'title',
  icon : 'image',
}
export { SideBar }
