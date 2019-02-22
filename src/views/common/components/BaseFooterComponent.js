import React, { Component } from 'react'
import { format } from '../../../utils/numberUtils'
import staticBanner  from '../../../images/rewards/footer-logo-gray.png'
import staticFB from '../../../images/rewards/icons8-facebook-filled-96.png'
import staticTwitter  from '../../../images/rewards/icons8-twitter-96.png'
import staticEmail  from '../../../images/rewards/icons8-envelope-96.png'
import './styles/footer.css'

class BaseFooterComponent extends Component {

  render () {

    return (
      <div id={'giftdetails-footer-cover'}>
        <div id={'giftdetails-footer'}>
          <div className={'giftdetails-footer-container'}>
            <div className={'giftdetails-copyright column'}>
              <h3>Site Links</h3>
              <ul>
                <li><a onClick = { () => history.push('/mygoals') }>My Goals and Performance</a></li>
                <li><a onClick = { () => history.push('/myrewards') }>Rewards and Recognition</a></li>
                <li><a onClick = { () => history.push('/coe') }>My Documents</a></li>
                <li><a onClick = { () => history.push('/mytravel') }>My Travel</a></li>
                <li><a onClick = { () => history.push('/pensionfunds') }>My Future</a></li>
              </ul>
            </div>
            <div className={'giftdetails-copyright column'}>
              <h3>Site Links</h3>
              <ul>
                <li><a onClick = { () => history.push('/mybenefits') }>My Benefits</a></li>
                <li><a onClick = { () => history.push('/mylearning') }>My Learning</a></li>
                <li><a onClick = { () => history.push('/payslip') }>My Pay</a></li>
                <li><a onClick = { () => history.push('/feedback') }>Feedback</a></li>
              </ul>
            </div>
            <div className="giftdetails-link column">
              <h3>Contact Us</h3>
              <p>
                For inquiries, email <a href={ 'mailto:1uhub-helpdesk@unionbank.com' }>1uhub-helpdesk@unionbank.com</a>
              </p>
            </div>
            <div className={ 'giftdetails-copyright2 column' }>
              <a href={ '/' } className={ 'logo' }>
                <img
                  height = { 100 }
                  width = { 100 }
                  src={ `${staticBanner}` }
                  alt={ '1UHub for Unionbank' } />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BaseFooterComponent
