import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Line, Card } from '../../../../ub-components/'

import './styles/profileFragment.css'

import defaultImage from '../../../../images/icons/ic_course.png'

class CertificateFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClick,
      profileCertificate,
    }=this.props

      const certificateDefault = [{
        id: 0 ,
        title: 'UP Diliman',
        imagePath: require('../../../../images/icons/ic_course.png'),
        course: 'Bachelor of Science in Computer Studies',
        year: '2015-2018'
      }, {
        id: 1 ,
        title: 'De Lasalle University',
        imagePath: require('../../../../images/icons/ic_course.png'),
        course: 'Bachelor of Science in Computer Studies',
        year: '2015-2018'
      }]

    return (
      <div>
        <h2 className={ 'font-weight-normal unionbank-color' }> Certificate </h2>
        <br/>
        <Line/>
        <br/>
        {
          profileCertificate ?
            profileCertificate.map((certificate, key)=>
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
                    { certificate.name }
                  </h2>
                  <h3 className={ 'font-size-17px font-weight-lighter' }>
                    { certificate.issuingBody }
                  </h3>
                  <h4 className={ 'font-size-16px font-weight-lighter' }>
                    { certificate.dateIssued }
                  </h4>
                </div>
              </Card>
            )
            :
            <center><h3>Not yet Provided</h3><br/></center>

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
