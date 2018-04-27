import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Cards } from '../../../../ub-components/'

import './styles.css'

class PodCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { podcasts, onClick } = this.props
    return (
        <Cards>
          <div></div>
          <div className = {'card-body'}>
            <h3>{podcasts.title}</h3>
          </div>
          <div className = {'card-footer'}>
            <small><a onClick = { () => onClick(podcasts) }>Read More</a></small>
          </div>
        </Cards>
    )
  }
}

PodCardComponent.propTypes = {
  podcasts : PropTypes.object,
  onClick : PropTypes.func
}

PodCardComponent.defaultProps = {

}

export default PodCardComponent
