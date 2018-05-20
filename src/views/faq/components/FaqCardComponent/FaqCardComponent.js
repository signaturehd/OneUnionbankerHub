import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './faq-card-component.css'

class FaqCardComponent extends Component {
  constructor (props) {
    super(props)
    }

  render () {
  const { searchCategory, onClick, faqs, history } = this.props
  const style = {
      iconFaqs : {
        background : `url('${searchCategory && searchCategory.icon}') rgb(0,0,0,0.7)`,
        backgroundSize : '125px',
        backgroundRepeat : 'no-repeat',
        height: '100% auto',
        color: 'white',
        backgroundBlendMode : 'color',
        fontWeight : 'bold',
      }
    }
 return (
      <Card
        className = { 'faqs-container' }
        onClick = { onClick }>
        <div style = {style.iconFaqs} className = { 'faqs-body' }>
        <h2>{searchCategory.category || searchCategory.title }</h2>
        </div>
      </Card>
    )
  }
}

FaqCardComponent.propTypes = {
  onClick : PropTypes.func,
}

export default FaqCardComponent
