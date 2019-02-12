import React, { Component } from 'react'
import { format } from '../../../utils/numberUtils'
import staticBanner  from '../../../images/rewards/footer-logo-gray.png'
import staticFB from '../../../images/rewards/icons8-facebook-filled-96.png'
import staticTwitter  from '../../../images/rewards/icons8-twitter-96.png'
import staticEmail  from '../../../images/rewards/icons8-envelope-96.png'
import '../styles/giftDetails.css'

class GiftDetailsFooterComponent extends Component {

  render () {

    return (
      <div id={'giftdetails-footer-cover'}>
        <div id={'giftdetails-footer'}>
          <div className={'giftdetails-footer-container'}>
            <div className={'giftdetails-copyright column'}>
              <h3>Site Links</h3>
              <ul>
                <li><a href="/howitworks">How It Works</a></li>
                <li><a href="/terms">Terms and Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="giftdetails-copyright column">
              <h3>Follow Us</h3>
              <ul style = {{
                display : 'flex',
                alignItems: 'center'
              }}>
                <li>
                  <img
                    className = { 'cursor-pointer' }
                    height={ 27 }
                    width={ 30 }
                    src={ `${ staticFB }` }
                    alt="..."
                    onClick={ () => window.open('https://www.facebook.com/giftawayph', '_blank') } />
                </li>
                <li>
                  <img
                    height={ 35 }
                    width={ 35 }
                    src={ `${ staticTwitter }` }
                    alt="..."
                    onClick={ () => window.open('https://twitter.com/GiftawayPH', '_blank') }/>
                </li>
                <li>
                  <img
                    height={ 38 }
                    width={ 35 }
                    src={ `${ staticEmail }` }
                    alt="..."
                    onClick={ () => window.open('mailto:1uhub-test@giftaway.ph', '_blank') }/>
                </li>
              </ul>
            </div>
            <div className="giftdetails-link column">
              <h3>Contact Us</h3>
              <p>
                For inquiries, email <a href={ 'mailto:1uhub-test@giftaway.ph' }>1uhub-test@giftaway.ph</a>
              </p>
            </div>
            <div className={ 'giftdetails-copyright2 column' }>
              <a href={ '/' } className={ 'logo' }>
                <img
                  src={ `${staticBanner}` }
                  alt={ '1UHub for Unionbank' } />
              </a>
              <p>© 2019 Giftaway Inc.<br/>All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GiftDetailsFooterComponent
