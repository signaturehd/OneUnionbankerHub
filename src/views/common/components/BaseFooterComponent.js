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
      history,
      preEmploymentStatus
    } = this.props
    console.log(preEmploymentStatus)
    return (
      <div id={'global-footer-cover'}>
        <div id={'global-footer'}>
          <div className={'global-footer-container'}>
            <div className={'globaldetails-footer-copyright column'}>
              <h3>Site Links</h3>
              <ul>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mygoals') }>My Goals and Performance</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/myrewards') }>Rewards and Recognition</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/coe') }>My Documents</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mytravel') }>My Travel</a></li>
                <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/pensionfunds') }>My Future</a></li>
              </ul>
            </div>
            <div className={'globaldetails-footer-copyright column'}>
              <h3>Site Links</h3>
              {
                preEmploymentStatus &&
                preEmploymentStatus === 1 ||
                preEmploymentStatus === 2 &&
                <ul>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mybenefits') }>My Benefits</a></li>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mylearning') }>My Learning</a></li>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/payslip') }>My Pay</a></li>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/preemployment') }>Pre-Employment</a></li>
                </ul>
              }
              {
                preEmploymentStatus &&
                preEmploymentStatus === 6 &&
                <ul>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mybenefits') }>My Benefits</a></li>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mylearning') }>My Learning</a></li>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/payslip') }>My Pay</a></li>
                </ul>
              }
              {
                preEmploymentStatus &&
                preEmploymentStatus === 3 ||
                preEmploymentStatus === 4 ||
                preEmploymentStatus === 5 &&
                <ul>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mybenefits') }>My Benefits</a></li>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/mylearning') }>My Learning</a></li>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/payslip') }>My Pay</a></li>
                  <li className = { 'cursor-pointer' }><a onClick = { () => history.push('/postemployment') }>Post-Employment</a></li>
                </ul>
              }
            </div>
            <div className="globaldetails-footer-link column">
              <h3
                className = { 'cursor-pointer' }
                onClick = { () =>history.push('/feedback') }>Feedback</h3>
              <p className = { 'feedbak-global-footer' }>
                How was your experience in using this website? Help us improve our way to serve you better.
              </p>
            </div>
            <div className={ 'globaldetails-footer-copyright2 column' }>
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
