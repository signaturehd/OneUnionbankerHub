import React, { Component } from 'react'

class GiftDetailsAboutComponent extends Component {

  render () {
    const {
      denominations
    } = this.props

    return (
      <div id={ 'giftdetails-about' }>
        <div className={ 'giftdetails-about-container' }>
          <h2 className = { 'giftdetails-about-title' }>About Puregold</h2>
          <div className = {  'giftdetails-about-write-up'}>
            <p>Puregold is one of the leading supermarkets in the country. From compact, well-selected groceries to expansive complexes that cater to more merchants and activities, Puregold makes it convenient to buy both basic and fancy necessities. </p>
            <p>Branches are strategically located all over the country, an easy choice for consumers. Passionately delivering the best products, Puregold carries its vision to provide great goods, customer service, and over-all experience.</p>
            <p>Puregold—always panalo!</p>
          </div>
          <div className={ 'giftdetails-other-info' }>
            <h3>Puregold Stores</h3>
            <ul>
              <li>Puregold Price Club</li>
              <li>Puregold Jr.</li>
              <li>Puregold Extra</li>
            </ul>
          </div>
        </div>
        <div className={ 'giftdetails-about-background' }></div>
      </div>
    )
  }
}

export default GiftDetailsAboutComponent
