import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/laptopLeaseComponentStyle.css'
import {
  Card,
} from '../../../ub-components/'

class LaptopLeaseOptionComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      getCardOptionIdFunc
    } = this.props

    const laptopLeaseOption = [
      {
        id : 0,
        subtitle: '',
        title: 'Bank to Purchase',
        imageSrc : require('../../../images/icons/banktopurchase.png')
      }, {
        id : 1,
        subtitle: '',
        title: 'Employee to Purchase',
        imageSrc : require('../../../images/icons/employeetopurchase.png')
      }
    ]

    return (
      <div className = { 'laptoplease-option-grid' }>
        <div></div>
        <div className = { 'grid-global' }>
          {
            laptopLeaseOption.map((resp, key) =>
              <Card
                className = { 'laptoplease-card-option cursor-pointer text-align-center' }
                key = { key }
                onClick = { () => getCardOptionIdFunc(resp.id) }
                >
                <img
                  style = {{
                    height : '50px',
                    width: '50px',
                    objectFit: 'cover',
                    backgroundRepeat : 'no-repeat',
                   }}
                  src = { resp.imageSrc }/>
                <br/>
                <h2>{ resp.title }</h2>
              </Card>
            )
          }
        </div>
        <div></div>
      </div>
    )
  }
}

LaptopLeaseOptionComponent.propTypes = {
}

export default LaptopLeaseOptionComponent
