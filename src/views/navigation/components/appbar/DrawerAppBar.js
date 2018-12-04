import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppBar } from '../../../../ub-components'

import './styles/appbar.css'

class DrawerAppBar extends Component {
  constructor (props) {
    super(props)
  }

  onToggleShow () {
    if (this.props.displayShow === 'none') {
      this.props.hide()
    } else if (this.props.displayShow === 'block') {
      this.props.show()
    }
  }

  onToggleShowChangeDisplay () {
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
      profillePosition,
      selected
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
      }, navList : {
        display: displayNavIcon !== 'block'? 'grid' :'none' ,
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        paddingTop: '6px',
        alignItems: 'center',
      }
    }

    let appBarList = [{
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

    let navBarList = [{
      id: 0,
      name: 'Home',
      imageStyle : 'news',
      action : () => history.push('/'),
    },{
      id: 10,
      name: 'Phenom Prime',
      imageStyle : 'phenom',
      action : () => history.push('/phenom'),
    },{
      id: 13,
      name: 'My Travel',
      imageStyle : 'travel',
      action : () => history.push('/mytravel'),
    },{
      id: 4,
      name: 'My Learning',
      imageStyle : 'learning',
      action : () => history.push('/mylearning')
    },{
      id: 1,
      name: 'My Benefits',
      imageStyle : 'benefits',
      action : () => history.push('/mybenefits')
    },{
      id: 8,
      name: 'My Pay',
      imageStyle : 'pay',
      action : () => history.push('/payslip')
    },{
      id: 14,
      name: 'My Goals',
      imageStyle : 'compliance',
      action : () => history.push('/mycompliance')
    },{
      id: 9,
      name: 'My Compliance',
      imageStyle : 'compliance',
      action : () => history.push('/mycompliance')
    }]

    return (
      <AppBar>
        <div id={ 'drawer-header' }>
          <div className = {'icon-header'}>
            <div>
              {
                // <img
                //   style={ style.show }
                //   src={ require('../../../../images/menu.png')}
                //   className = {'_img-ub-profile'}
                //   onClick = { () => this.onToggleShow() }/>
              }
              <img
                style={ style.navbar }
                src={ require('../../../../images/union-logo.png') }
                className={'_img-ub-logo'}/>
            </div>
            <div
              style = { style.navList }>
              {
                navBarList.map((resp, key) => (
                  <div
                    onClick = { () => resp.action() }
                    key = { key }
                    className = { 'appbar-default-menu' }>
                    <center className = { 'appbar-navbar-icon-grid' }>
                      <div className = { 'appbar-grid-icon-center' }>
                        <div></div>
                        <span
                          className = { `appbar-${ resp.imageStyle }-icon${ selected === resp.id ? 'active' : '' } appbar-icon` }/>
                        <div></div>
                      </div>
                      <a className = { `font-size-11px default${ selected === resp.id ? 'active' : '' }` }>
                        { resp.name }
                      </a>
                    </center>
                  </div>
                ))
              }
            </div>
            <div className = { 'appbar-menu-text-grid' }>
            <div></div>
              <div className = {  'cursor-pointer' }>
                {
                  profileImage ?
                  <img
                    onClick = { () => {
                      if(displayNavIcon === 'block') {
                        this.onToggleShow()
                      } else {
                        this.onToggleShowChangeDisplay()
                      }
                    }}
                    src = { profileImage }
                    className = { 'appbar-logo-circle' }/>
                  :
                  <img
                    onClick = { () => {
                      if(displayNavIcon === 'block') {
                        this.onToggleShow()
                      } else {
                        this.onToggleShowChangeDisplay()
                      }
                    }}
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
                              <h2 className = { 'appbar-welcome-name' }>Hi, { firstName ? firstName : 'Test' }</h2>
                              <h2 className = { 'appbar-welcome-position' }>{ profillePosition ? profillePosition : 'Test Position' }</h2>
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
                              className = { `appbar-${ resp.imageStyle }-icon appbar-menu-icon` }/>
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
