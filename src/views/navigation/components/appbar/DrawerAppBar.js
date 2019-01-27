import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppBar } from '../../../../ub-components'

import ExifOrientationImg  from 'react-exif-orientation-img'

import './styles/appbar.css'
import GreetingMessageComponent from '../GreetingMessageComponent.js'

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
      selected,
      tempPreEmployment
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
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
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
      id: 10,
      name: 'Phenom Prime',
      imageStyle : 'phenom',
      action : () => history.push('/phenom'),
    },{
      id: 11,
      name: 'Pre-Employment',
      imageStyle : 'preemployment',
      action : () => history.push('/preemployment'),
    },{
      id: 12,
      name: 'Post-Employment',
      imageStyle : 'postemployment',
      action : () => history.push('/postemployment'),
    },{
      id: 13,
      name: 'My Travel',
      imageStyle : 'travel',
      action : () => history.push('/mytravel'),
    },{
      id: 17,
      name: 'Rewards & Recognition',
      imageStyle : 'rewards',
      action : () => history.push('/myrewards'),
    },{
      id: 14,
      name: 'My Goals & Performance',
      imageStyle : 'goals',
      action : () => history.push('/mygoals'),
    },{
      id: 7,
      name: 'My Documents',
      imageStyle : 'coe',
      action : () => history.push('/coe'),
    },{
      id: 15,
      name: 'My Future',
      imageStyle : 'future',
      action : () => history.push('/pensionfunds'),
    },{
      id: 1,
      name: 'FAQs',
      imageStyle : 'faqs',
      action : () => history.push('/faqs'),
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

    const styleAppIcon = {
      backgroundImage : `url(${ profileImage ? profileImage : require('../../../../images/WEB and LOGO/1UHub Logo_Gotham_2.png') })`,
      width: '45px',
      height: '44px',
      backgroundSize: 'cover',
      objectFit: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      webkitBorderRadius: '99em',
      mozBorderRadius: '99em',
      borderRadius: '99em',
      border: '0px solid #fff',
      boxShadow: '0 3px 2px rgba(0, 0, 0, 0.3)',
      verticalAlign: 'middle',
      margin: 'auto',
      position: 'absolute',
      right: '0',
      bottom: '0',
      top: '0',
      marginRight: '30px',
    }

    const styleAppPopIcon = {
      backgroundImage : `url(${ profileImage ? profileImage : require('../../../../images/WEB and LOGO/1UHub Logo_Gotham_2.png') })`,
      boxShadow: '0 3px 2px rgba(0, 0, 0, 0.3)',
      verticalAlign: 'middle',
      backgroundRepeat : 'no-repeat',
      backgroundSize: 'cover',
      height: 'unset',
      backgroundPosition: 'center',
      boxShadow: 'inset 0px 0px 0px 0px #ffffff',
      width: '100px',
      border: 'solid 2px #fff',
      height: '100px',
      objectFit: 'cover',
      backgroundPosition: 'center',
      borderRadius: '50%',
      transform: 'translateY(-100%) rotate(90deg)',
      transformOrigin: 'left bottom 0px',
    }

    return (
      <AppBar
        className = { 'appbar-style-color' }
      >
        <div id={ 'drawer-header' }>
          <div className = {'icon-header'}>
            <div>
            {
              // <img
              //   style={ style.navbar }
              //   src={ require('../../../../images/union-logo.png') }
              //   className={'_img-ub-logo'}/>
            }
              <img
                style={ style.navbar }
                src={ require('../../../../images/mobileview/UBP Logo 2.png') }
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
            <div className = { 'appbar-menu-text-grid' }>
            <div></div>
              <div className = {  'cursor-pointer' }>
              {
                profileImage ?
                <ExifOrientationImg
                  src = { profileImage}
                  onClick = { () => {
                    if(displayNavIcon === 'block') {
                      this.onToggleShow()
                    } else {
                      this.onToggleShowChangeDisplay()
                    }
                  }}
                  style = { styleAppIcon }
                /> :
                <img
                  onClick = { () => {
                    if(displayNavIcon === 'block') {
                      this.onToggleShow()
                    } else {
                      this.onToggleShowChangeDisplay()
                    }
                  }}
                  src = { require('../../../../images/WEB and LOGO/1UHub Logo_Gotham_2.png') }
                  className = { 'appbar-logo-circle' }/>
              }

                <div
                  style = {{ display : profileDisplay && profileDisplay }}
                  className = { 'appbar-submenu' }>
                  <ul className = { 'appbar-triangle' }>
                    <li className = { 'appbar-list' }>
                      <div className = { 'appbar-background-menu' }>
                        <div className = { 'appbar-grid-submenu-info' }>
                          <div className = { 'appbar-grid-info ' }>
                            <div className= { 'text-align-center' }>
                              {
                                profileImage ?
                                <ExifOrientationImg
                                  src = { profileImage }
                                  style = { styleAppPopIcon }
                                />
                                :
                                <img
                                  src = { require('../../../../images/WEB and LOGO/1UHub Logo_Gotham_2.png') }
                                  className = { 'appbar-submenu-profile-circle' }/>
                              }
                            </div>
                            <GreetingMessageComponent
                              firstName = { firstName }
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                    {
                      tempPreEmployment === 1 || tempPreEmployment === 2 ?
                      <div>
                        {
                          appBarList.map((resp, key) =>
                            resp.id !== 0 &&
                            resp.id !== 1 &&
                            resp.id !== 2 &&
                            resp.id !== 3 &&
                            resp.id !== 4 &&
                            resp.id !== 5 &&
                            resp.id !== 6 &&
                            resp.id !== 8 &&
                            resp.id !== 9 &&
                            resp.id !== 10 &&
                            resp.id !== 12 &&
                            resp.id !== 13 &&
                            resp.id !== 14 &&
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
                      </div>

                      :
                      <div>
                        {
                          tempPreEmployment === 6 ||
                          tempPreEmployment === 0 ||
                          tempPreEmployment === null ||
                          tempPreEmployment === undefined ?
                          <div>
                            {

                              appBarList.map((resp, key) =>
                                resp.id !== 11 &&
                                resp.id !== 12 &&
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
                          </div> :
                          <div>
                            {
                              tempPreEmployment === 3 ||
                              tempPreEmployment === 4 ||
                              tempPreEmployment === 5 ?

                              <div>
                                {
                                  appBarList.map((resp, key) =>
                                    resp.id !== 11 &&
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
                              </div>
                              :
                              <div>
                                {
                                  appBarList.map((resp, key) =>

                                    resp.id !== 12 &&
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
                              </div>
                            }
                          </div>
                        }
                      </div>
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
