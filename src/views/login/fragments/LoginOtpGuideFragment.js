import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LoginOtpGuideFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      idReplace
    } = this.props

    return (
      <div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h2 className = { 'font-size-24px text-align-left font-weight-bold' }>
          Why can&#39;t i receive my OTP?
        </h2>
        <br/>
        <h4 className = { 'text-align-left font-weight-normal font-size-20px' }>
          Thank you for your interest in using the One Unionbanker Hub! Your user ID is equivalent to your employee ID.
        </h4>
        <br/>
        <br/>
        <br/>
        <center>
          <div
            className = { 'unionbank-color cursor-pointer' }
            >
            <i
              onClick = { () => idReplace() }
              className = { 'back-arrow' }></i>
            <b onClick = { () => idReplace() }>Go Back</b>
          </div>
        </center>
      </div>
    )
  }
}

LoginOtpGuideFragment.propTypes = {
}

export default LoginOtpGuideFragment
