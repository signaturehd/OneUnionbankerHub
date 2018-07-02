import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Line, Card } from '../../../../ub-components/'

import './styles/profileComponent.css'

class CertificateComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      onClick,
      profileCertificate }=this.props

      const certificateDefault = [{
        id: 0 ,
        title: 'UP Diliman',
        imagePath: require('../../../../images/icons/IdCardOrange.png'),
        course: 'Bachelor of Science in Computer Studies',
        year: '2015-2018'
      }, {
        id: 1 ,
        title: 'De Lasalle University',
        imagePath: require('../../../../images/icons/IdCardOrange.png'),
        course: 'Bachelor of Science in Computer Studies',
        year: '2015-2018'
      }]

    return (
      <div>
        <h2> Certificate </h2>
        <br/>
        {
          certificateDefault.map((certificate, key)=>
            <Card
              key={ key }
              className={ 'components-view' }>
              <div>
                <img
                  className={ 'components-image' }
                  key={ key }
                  src={ certificate.imagePath }/>
              </div>
              <div>
                <h2 className={ 'font-size-18px font-weight-normal' }>
                  { certificate.title }
                </h2>
                <h3 className={ 'font-size-17px font-weight-lighter' }>
                  { certificate.course }
                </h3>
                <h4 className={ 'font-size-16px font-weight-lighter' }>
                  { certificate.year }
                </h4>
              </div>
            </Card>
          )
        }
      </div>
    )
  }
}

CertificateComponent.propTypes = {
  onClick : PropTypes.func,
  profileCertificate : PropTypes.array,
}

export default CertificateComponent
