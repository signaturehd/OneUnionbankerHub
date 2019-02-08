import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from '../../../ub-components/'

class GiftsListComponentNavigation extends Component {
  render () {
    const {
      rewardGifts
    } = this.props

    return (
      <div className = { 'gifts-grid-x5 ex1' }>
        {
          rewardGifts &&
          rewardGifts.map((resp, key) =>
            <Card
              style = {{
                backgroundImage: `url(${ resp.cardUrl })`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                objectFit: 'cover',
              }}
              className = { 'cursor-pointer gifts-card-rewards' }>
              <div  style = {{
                  margin: '10px',
                  textAlign: 'left'
                }}>
                <h4 className = { 'font-size-10px unionbank-white-color' }>General</h4>
                <h4 className = { 'font-size-14px font-weight-bold unionbank-white-color' }>{resp.name}</h4>
              </div>
            </Card>
          )
        }
      </div>
    )
  }
}

export default GiftsListComponentNavigation
