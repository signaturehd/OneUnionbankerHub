import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppBar } from '../../../../ub-components'

import './styles/appbar.css'

class DrawerAppBar extends Component {
  constructor (props) {
    super(props)
    this.onToggleShow = this.onToggleShow.bind(this)
  }
  onToggleShow () {
    if (this.props.displayShow === 'none') {
      this.props.hide()
    } else if (this.props.displayShow === 'block') {
      this.props.show()
    }
  }

  render () {
    const { onClick, displayNavIcon, onToggleShow, displayShow } = this.props
    const style = {
      show: {
        display : displayNavIcon,
        width: 'auto',
        margin: '10px',
      },
      navBar: {
        width: '35px',
        margin: '10px',
        display: 'block',
        height: '35px',
      }
    }

    return (
      <AppBar>
        <div id={ 'drawer-header' }>
          <div className = {'icon-header'}>
            <img
              style={ style.show }
              src={ require('../../../../images/menu.png')}
              className = {'_img-ub-profile'}
              onClick = { this.onToggleShow }/>
            <img
              style={ style.navbar }
              src={ require('../../../../images/union-logo.png') }
              className={'_img-ub-logo'}/>
          </div>
        </div>
      </AppBar>
    )
  }
}
export default DrawerAppBar
