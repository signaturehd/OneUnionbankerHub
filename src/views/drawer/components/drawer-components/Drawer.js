import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import './styles/drawer.css'
import Presenter from './presenter/ComponentsPresenter'
import BenefitsPartial from '../../../benefits/BenefitsPartial'
import LibraryView from '../../../library/LibraryView'
class Drawer extends Component {
  constructor (props) {
    super (props)
  }
  render () {
    return (
      <div className = { '_main-content' }>
        <div className = { '_option-components' }>
          {
            this.props.children
          }
        </div>
      </div>
    )
  }
}
export { Drawer, Presenter }
