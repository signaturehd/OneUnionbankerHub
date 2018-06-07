import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './styles/faqCardComponent.css'


class FaqCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { onClick, title, icon } = this.props
  const style = {
    iconFaqs : {
      background : `url('http://${icon}') rgb(0,0,0,0.7)`,
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
        <div style = { style.iconFaqs } className = { 'faqs-body' }>
        <h2>{ title }</h2>
        </div>
      </Card>
    )
  }
}

FaqCardComponent.propTypes = {
  onClick : PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string,
}

export default FaqCardComponent
