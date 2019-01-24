import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from '../../../../ub-components/'


class PointsFragment extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    const {
      profileBackground,
      badgesAndPoints
    } = this.props

    const badgeString =
    profileBackground.badgesAndPoints &&
    profileBackground.badgesAndPoints.uAreRecognizeBadge.toLocaleString()

    const pointString =
    profileBackground.badgesAndPoints &&
    profileBackground.badgesAndPoints.redeemablePoints.toLocaleString()

    return (
      <Card className={ 'profile-others-card padding-profileFragment' }>
        <div className={ 'profile-padding' }>
          <div className = { 'grid-global' }>
            <div>
              <h2 className={ 'unionbank-color-grey font-weight-normal padding-profileFragment-name' }>
                Badges and Points
              </h2>
              <div>
                <br/>
                <div className={ 'contact-info-grid' }>
                  <div
                    className={ 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings badgeStringComponent' }/>
                    </div>
                    <div className={ 'contact-info-grid-row' }>
                      <div className={ 'font-size-17px contact-title' }>
                        <h2>Badges </h2>
                      </div>
                      <div className={ 'font-size-14px' }>
                        <a>
                          { badgeString ?
                            badgeString :
                            '(0)' } Badge/s
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <br/>
                <div className={ 'contact-info-grid' }>
                  <div
                    className={ 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings pointStringComponent' }/>
                    </div>
                    <div className={ 'contact-info-grid-row' }>
                      <div className={ 'font-size-17px contact-title' }>
                        <h2>Points </h2>
                      </div>
                      <div className={ 'font-size-14px' }>
                        <a>
                          { pointString ?
                            pointString :
                            '(0)' } Point/s
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

PointsFragment.propTypes={
}

export default PointsFragment
