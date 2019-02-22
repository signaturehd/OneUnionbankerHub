import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Card, GenericLoader, GenericButton, Line } from '../../../ub-components'

import moment from 'moment'

class SquadDetailsComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      squadDetails,
      showPositionDetails,
      vacantDetails
    } = this.props

    return (
      <div className = { 'grid-global-columns-x3' }>
        {
          vacantDetails &&
          vacantDetails.map((resp) =>
            resp.position.map((data, key) =>
            <Card
              key = { key }
              onClick = { () => showPositionDetails(resp, data) }
              className = { 'squad-card-grid-component cursor-pointer' }>
              <div className = { 'text-align-left' }>
                <h4 className = { 'font-weight-bold' }>{ data.name }</h4>
              </div>
              <div className = { 'text-align-right' }>
              </div>
            </Card>
          )
        )}
      </div>
    )
  }
}

SquadDetailsComponent.propTypes = {
  squadsDetails: PropTypes.object,
  hideFragment: PropTypes.func,
}

SquadDetailsComponent.defaultProps = {
  squadsDetails: {}
}

export default SquadDetailsComponent
