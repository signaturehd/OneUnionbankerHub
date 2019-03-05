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
              className = { 'padding-10px cursor-pointer' }>
              <div className = { 'text-align-left' }>
                <br/>
                <h4 className = { 'font-weight-bold' }>{ data.name }</h4>
                <br/>
                <br/>
              </div>
              <div></div>
              <div className = { '' }>
                <h4 className = { 'unionbank-color-grey font-size-13px text-align-left' }>{ data.description }</h4>
                <br/>
                <h4 className = { 'unionbank-color-grey font-size-12px text-align-right' }>{ data.date.start + '-' + data.date.end }</h4>
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
