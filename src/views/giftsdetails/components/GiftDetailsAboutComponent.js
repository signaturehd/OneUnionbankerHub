import React, { Component } from 'react'

class GiftDetailsAboutComponent extends Component {

  render () {
    const {
      writeup,
      name,
      recommendations
    } = this.props

    return (
      <div id = { 'giftdetails-about-cover' }>
        <div id={ 'giftdetails-about' }>
          <div className={ 'giftdetails-about-container' }>
            <h2 className = { 'giftdetails-about-title' }>About { name }</h2>
            <div className = {  'giftdetails-about-write-up'}>
              <p>{ writeup }</p>
            </div>
            <div className={ 'giftdetails-other-info' }>
              <h3>{ name }</h3>
              <ul>
                {
                  recommendations && recommendations.map((resp, key) =>
                    <li key = { key }>{ resp }</li>
                  )
                }
              </ul>
            </div>
          </div>
          <div className={ 'giftdetails-about-background' }></div>
        </div>
      </div>
    )
  }
}

export default GiftDetailsAboutComponent
