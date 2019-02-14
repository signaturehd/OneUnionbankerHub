import React, { Component } from 'react'
// import staticBanner  from '../../../images/GOALS/mygoal-banner.png'
import staticBanner  from '../../../images/rewards/giftsBanner.jpg'
import { GenericButton } from '../../../ub-components/'

class GiftDetailsBannerComponent extends Component {

  render () {
    const {
      name,
      tagline,
      category,
      locations,
      latitude,
      longtitude,
      showGiftCart,
      logo,
      totalPoints
    } = this.props

    const locationLength = locations && locations.length
    return (
      <div
        id={'giftdetails-cover'}
        style = {{
          backgroundImage: `url(${staticBanner})`,
        }}>
        <div className = { 'giftdetails-container' }>
          <div
            id = { 'giftdetails-info' }
            className = { 'gift-details-content' }>
            <div id = { 'gifts-overlay1' }>
              <div
                style = {{
                  paddingRight: '50px'
                }}
                className = { 'text-align-right cursor-pointer' }>
                <img
                  height = { '50' }
                  width = { '50' }
                  onClick={ () => showGiftCart() }
                  src = { require('../../../images/rewards/cart.png') }/>
              </div>
            </div>
            <br/>
            <div style = {{
                backgroundImage : `url(${ logo })`,
                backgroundSize: 'cover',
                height: '100px',
                width: '100px',
                margin: 'auto',
                backgroundPosition: 'center',
                borderRadius: '100px',
              }}/>
            <br/>
            <h1>{ name && name ? name : '(No Title Provided)' }</h1>
            <p>{ tagline && tagline ? tagline : '(No Tagline Provided)' }</p>
            <div className = { 'giftdetails-tags' }>
              <span>{ category }</span>          &#x000D7;
              <span>{ locationLength  } Location{locationLength > 1 ? 's' : ''}</span>          &#x000D7;
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GiftDetailsBannerComponent
