import React, { Component } from 'react'
import PropTypes from 'prop-types'

class NoDataListedComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      text,
    } = this.props

    return (
      <center>
        <br/>
        <br/>
        <br/>
        <img
          height = { 70 }
          width = { 70 }
          src = { require('../../../images/icons/empty_data.png') }/>
        <br/>
        <h4 className={ 'font-size-14px' }>{ text }</h4>
        <br/>
        <br/>
      </center>
    )
  }
}

NoDataListedComponent.propTypes = {
  text : PropTypes.string,
}

export default NoDataListedComponent
