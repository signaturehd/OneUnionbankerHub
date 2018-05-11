import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './faq-card-component.css'

class FaqCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { faqs, onClick } = this.props
    return (
        <Card>
          <div></div>
          <div className = {'card-body'}>
            <h3>{faqs.title}</h3>
          </div>
          <div className = {'card-footer'}>
            <small><a onClick = { () => onClick(faqs) }>Read More</a></small>
          </div>
        </Card>
    )
  }
}

FaqCardComponent.propTypes = {
  faqs : PropTypes.object,
  onClick : PropTypes.func,
}

FaqCardComponent.defaultProps = {

}

export default FaqCardComponent
