import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Line, Card } from '../../../../ub-components/'

import './styles/profileFragment.css'

import defaultImage from '../../../../images/icons/ic_course.png'

class CertificateFragment extends Component {

  constructor (props) {
    super(props)
    this.state = {
      index : 3,
      viewMoreText: 'view more, work & experience',
    }
  }

  render () {
    const {
      index,
      viewMoreText
    } = this.state

    const {
      onClick,
      profileCertificate,
    }=this.props

    const isVisible = (profileCertificate && profileCertificate.length > 4) ? '' : 'hide'

    return (
      <div>
        <h2 className={ 'font-weight-normal unionbank-color-grey' }> Certificate </h2>
        <br/>
        <Line/>
        <br/>
        {
          profileCertificate ?
            <div>
              {
                profileCertificate.slice(0, index).map((certificate, key)=>
                  <Card
                    key={ key }
                    className={ 'components-view' }>
                    <div>
                      <img
                        className={ 'components-image' }
                        key={ key }
                        src={ defaultImage }/>
                    </div>
                    <div>
                      <h2 className={ 'font-size-18px font-weight-normal' }>
                        Title : { certificate.name }
                      </h2>
                      <h3 className={ 'font-size-17px font-weight-lighter' }>
                        Issued body: { certificate.issuingBody }
                      </h3>
                      <h4 className={ 'font-size-14px font-weight-lighter' }>
                        Date Issued: { certificate.dateIssued }
                      </h4>
                    </div>
                  </Card>
                )
              }
              <button
                type = { 'button' }
                className = { `viewmore tooltip ${isVisible}` }
                onClick = {
                  () => {
                    if(index === profileCertificate.length)
                      this.setState({ index : 3, viewMoreText : 'view less, work & experience' })
                    else
                      this.setState({ index : profileCertificate.length, viewMoreText : 'view more, work & experience' })
                  }
                }>
                <img src={ require('../../../../images/icons/horizontal.png') } />
                <span className={ 'tooltiptext' }>{ viewMoreText }</span>
              </button>
            </div>
            :
            <center><h3>No Information Available</h3><br/></center>

        }
      </div>
    )
  }
}

CertificateFragment.propTypes = {
  onClick : PropTypes.func,
  profileCertificate : PropTypes.array,
}

export default CertificateFragment
