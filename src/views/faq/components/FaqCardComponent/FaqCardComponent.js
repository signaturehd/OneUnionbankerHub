import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './faq-card-component.css'

class FaqCardComponent extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { categorize, onClick, faqsCategory } = this.props
    const newCategory = categorize.category
 return (
      <Card>
        <div className = {'card-body'}>
        <h2>{newCategory.category}</h2>
        </div>
        <div className = {'card-footer'}>
          <small><a onClick = { onClick }>Read More</a></small>
        </div>
      </Card>
    )

  }
}

FaqCardComponent.propTypes = {
  onClick : PropTypes.func,
}

FaqCardComponent.defaultProps = {

}

export default FaqCardComponent
