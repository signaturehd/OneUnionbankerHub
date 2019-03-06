import React, { Component } from 'react'
import { format } from '../../../utils/numberUtils'
import staticBanner  from '../../../images/rewards/footer-logo-gray.png'
import staticFB from '../../../images/rewards/icons8-facebook-filled-96.png'
import staticTwitter  from '../../../images/rewards/icons8-twitter-96.png'
import staticEmail  from '../../../images/rewards/icons8-envelope-96.png'
import './styles/footer.css'

class BaseFooterComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      history
    } = this.props

    return (
      <div id={'giftdetails-footer-cover'}>
        <div id={'giftdetails-footer'}>
          <div className={'giftdetails-footer-container'}>
            <div className={'giftdetails-copyright column'}>
              <h3>Site Links</h3>
              <ul>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mygoals') }>My Goals and Performance</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/myrewards') }>Rewards and Recognition</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/coe') }>My Documents</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mytravel') }>My Travel</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/pensionfunds') }>My Future</a></li>
              </ul>
            </div>
            <div className={'giftdetails-copyright column'}>
              <h3>Site Links</h3>
              <ul>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mybenefits') }>My Benefits</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mylearning') }>My Learning</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/payslip') }>My Pay</a></li>
              </ul>
            </div>
            <div className="giftdetails-link column">
              <h3
                className = { 'cursor-pointer' }
                onClick = { () =>history.push('/feedback') }>Feedback</h3>
              <p>
                For inquiries, let us know.
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
