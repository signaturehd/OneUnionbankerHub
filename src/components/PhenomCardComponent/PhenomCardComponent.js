import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/phenomCardComponentStyle.css'

import Card from '../../ub-components/Card/Card'
import GenericButton from '../../ub-components/UButton/GenericButton'

import moment from 'moment'

class PhenomCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClick,
      className,
    } = this.props

    return (
      <Card
        className = { `${ resp.styleName }` }
        key = { key }>
        <div className = { 'phenom-content-card' }>
          <div className = { 'phenom-content-grid-column-right' }>
            <span className = { `${ base64 ? base64 : 'phenom-logo-icon' } phenom-logo-icon-default` }/>
            <div>
              <h2 className = { 'phenom-label-reward' }>
                Mc Donald's
              </h2>
            </div>
          </div>
          <div className = { 'phenom-content-grid-column-left' }>
            <span
              onClick = { () =>
                this.setState({ activeSelect : 'phenom-clicked' }) }
              className = { `${ selected === resp.id ? activeSelect : 'phenom-status-icon' } phenom-icon` }/>
          </div>
        </div>
      </Card>
    )
  }
}

PhenomCardComponent.propTypes = {
  onClick : PropTypes.func,
  className : PropTypes.string,
}

PhenomCardComponent.defaultProps = {
  children : null,
  className : 'card',
}

export default PhenomCardComponent
