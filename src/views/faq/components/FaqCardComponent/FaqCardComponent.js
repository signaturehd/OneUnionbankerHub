import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './styles/faqCardComponent.css'


class FaqCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { onClick, title, icon, subtitle } = this.props
  const style = {
    iconFaqs : {
      background : `url('${icon}')`,
      backgroundSize : 'cover',
      backgroundRepeat : 'no-repeat',
      fontWeight : 'bold',
      textAlign: 'center',
      height: '50px',
      margin: '0px auto',
      width: '50px',
    }
  }

  return (
    <Card
      className = { 'faqs-container-content' }
      onClick = { onClick }>
      <div className = { 'faqs-container-column-grid' }>
        <div style = { style.iconFaqs } />
        <p className = { 'loans-option-cards font-weight-bold font-size-14px' }>
          { title }
        </p>
        <h2 className = { 'font-size-12px' }>{ subtitle }</h2>
      </div>
    </Card>
    )
  }
}

FaqCardComponent.propTypes = {
  onClick : PropTypes.func,
  icon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default FaqCardComponent
