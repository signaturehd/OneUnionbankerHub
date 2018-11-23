import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppBar } from '../../../../ub-components'

import './styles/appbar.css'

let display = true

class DrawerAppBar extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const mediaQuery = window.matchMedia('(min-width: 1239px)')
      if (mediaQuery.matches) {
        display = true
      } else {
        display = false
      }
        mediaQuery.addListener(mq => {
      if (mq.matches) {
        display = true
      } else {
        display = false
      }
    })
  }

  onToggleShow () {
    if (this.props.displayShow === 'none') {
      this.props.hide()
    } else if (this.props.displayShow === 'block') {
      this.props.show()
    }
  }

  onToggleShowChangeDisplay () {
    console.log('click ')
    console.log(this.props.profileDisplay === 'none'? 'block' : 'none')
    this.props.profileDisplayFunc(this.props.profileDisplay !== 'none'? 'none' : 'block')
  }

  render () {
    const {
      displayNavIcon,
      onToggleShow,
      displayShow,
      onCallWizard,
      history,
      logout,
      onChangeDisplay,
      profileDisplay,
      profileImage,
      firstName,
      profillePosition
    } = this.props

    const style = {
      show: {
        display : displayNavIcon,
        width: 'auto',
        margin: '10px',
    }, navBar: {
        width: '35px',
        margin: '10px',
        display: 'block',
        height: '35px',
    }, infoLogo: {
        width: '25px',
        margin: '20px',
        display: 'block',
        height: '25px',
      }
    }

    let appBarList = [{
      id: 1,
      name: 'Phenom Prime',
      imageStyle: 'phenom',
      action : () => history.push('/phenom'),
    }, {
      id: 0,
      name: 'My Personal Information',
      imageStyle : 'settings',
      action : () => history.push('/settings'),
    },{
      id: 1,
      name: 'FAQs',
      imageStyle : 'faqs',
      action : () => history.push('/faqs'),
    },{
      id: 2,
      name: 'Feedback',
      imageStyle : 'feedback',
      action : () => history.push('/feedback'),
    },{
      id: 3,
      name: 'Logout',
      imageStyle : 'logout',
      action : () => logout()
    }]

    return (
      <AppBar>
        <div id={ 'drawer-header' }>
          <div className = {'icon-header'}>
            <div>
              <img
                style={ style.show }
                src={ require('../../../../images/menu.png')}
                className = {'_img-ub-profile'}
                onClick = { () => this.onToggleShow() }/>
              <img
                style={ style.navbar }
                src={ require('../../../../images/union-logo.png') }
                className={'_img-ub-logo'}/>
            </div>
            <div className = { 'appbar-menu-text-grid' }>
            <div></div>
              <div className = {  'cursor-pointer' }>
                {
                  profileImage ?
                  <img
                    onClick = { () => this.onToggleShowChangeDisplay() }
                    src = { profileImage }
                    className = { 'appbar-logo-circle' }/>
                  :
                  <img
                    onClick = { () => this.onToggleShowChangeDisplay() }
                    src = { require('../../../../images/profile-picture.png') }
                    className = { 'appbar-logo-circle' }/>
                }
                <div
                  style = {{ display : profileDisplay && profileDisplay }}
                  className = { 'appbar-submenu' }>
                  <ul className = { 'appbar-triangle' }>
                    <li className = { 'appbar-list' }>
                      <div className = { 'appbar-background-menu' }>
                        <div className = { 'appbar-grid-submenu-info' }>
                          <div></div>
                          <div className = { 'appbar-grid-info ' }>
                            <div className= { 'text-align-center' }>
                              {
                                profileImage ?
                                <img
                                  src = { profileImage }
                                  className = { 'appbar-submenu-profile-circle' }/>
                                :
                                <img
                                  src = { require('../../../../images/profile-picture.png') }
                                  className = { 'appbar-submenu-profile-circle' }/>
                              }
                            </div>
                            <div className = { 'appbar-row-info' }>
                              <h2 className = { 'appbar-welcome-name' }>Hi, { firstName }</h2>
                              <h2 className = { 'appbar-welcome-position' }>{ profillePosition }</h2>
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </li>
                    {
                      appBarList.map((resp, key) =>
                        <li
                          onClick = { () => resp.action() }
                          key = { key }
                          className = { 'appbar-list' }>
                          <div className = { 'appbar-icon-grid' }>
                            <span
                              className = { `appbar-${ resp.imageStyle }-icon appbar-icon` }/>
                            <a>
                              { resp.name }
                            </a>
                          </div>
                        </li>
                      )
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    )
  }
}

DrawerAppBar.propTypes = {
  onChangeDisplay : PropTypes.func,
  displayNavIcon: PropTypes.string,
  onToggleShow : PropTypes.func,
  onProfileDisplayShow : PropTypes.func,
  displayShow : PropTypes.string,
  onCallWizard : PropTypes.func,
}
export default DrawerAppBar
