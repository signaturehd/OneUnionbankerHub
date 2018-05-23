import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './faq-card-component.css'

import ImageLoader from 'react-image-file'

class FaqCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { onClick, title, icon, imageResponse } = this.props
  console.log(imageResponse)
  const style = {
    iconFaqs : {
      background : `url('${imageResponse}') rgb(0,0,0,0.7)`,
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
        <ImageLoader file={imageResponse} alt='some text'/>
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
