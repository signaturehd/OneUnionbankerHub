import React, { Component } from 'react'
import staticBanner  from '../../../images/rewards/giftsBanner.jpg'

class GiftDetailsBannerComponent extends Component {

  render () {
    const {
      name,
      tagline,
      category,
      locations,
      latitude,
      longtitude
    } = this.props

    const locationLength = locations && locations.length
    console.log(longtitude)
    console.log(latitude)
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
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
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
