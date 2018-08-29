import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { format } from '../../../utils/numberUtils'

import defaultImage from '../../../images/icons/default_image_loading.png'
import { Card }  from '../../../ub-components/'

class CalamityMultiplePropertyCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      cardDataHolder,
      setCard,
      disabled,
      errorMessage,
      count,
      onEditModeProperty
    } = this.props

    return (
      <div>
        {
          cardDataHolder.length !== 0 &&
          cardDataHolder.map((resp, key) => (
            <div>
              <Card
                className = { 'multiple-card-grid-option' }
                key = {key}>
                <div>
                  <div
                    style={ {
                      backgroundImage: `url('${defaultImage}')`,
                      width: 'auto',
                      height: '100px',
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                    } }
                  >
                  </div>
                </div>
                <div className = { 'grid-global' }>
                  <div>
                      <h2 className = { 'font-size-14px font-weight-bold' }>{ resp.propertyName }</h2>
                      <h2 className = { 'font-size-12px font-weight-lighter' }>{ resp.propertyType }</h2>
                      <h2 className = { 'font-size-10px font-weight-lighter' }>
                        Repair Cost: &#8369; { format(resp.repairCost) }
                      </h2>
                  </div>
                  <div>
                    <h2 className = { 'font-size-14px font-weight-bold' }>
                      Acquisition Value: &#8369; { format(resp.acquisitionValue) }
                    </h2>
                  </div>
                </div>
                <div className = { 'grid-global-rows' }>
                  {
                    !disabled &&
                    <img
                      className = { 'close-button-global' }
                      src = { require('../../../images/icons/ic_mode_edit_grey_500_18dp.png') }
                      onClick = { () =>
                        onEditModeProperty(
                          resp.propertyName,
                          resp.description,
                          resp.propertyType,
                          resp.acquisitionValue,
                          resp.repairCost,
                          resp.imageKey,
                          true,
                          true)
                      }
                    />
                  }
                  {
                    !disabled &&
                    <img
                      className = { 'close-button-global' }
                      src = { require('../../../images/x-circle-global.png') }
                      onClick = { () => {
                        cardDataHolder.splice(key, 1)
                        setCard(cardDataHolder)
                      }}
                    />
                  }
                </div>
              </Card>
              <br/>
            </div>
          ))
        }
      </div>
    )
  }
}

CalamityMultiplePropertyCardComponent.propTypes = {
  cardDataHolder : PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.shape({
          name : PropTypes.string,
          file : PropTypes.object,
          base64 : PropTypes.blob,
        })
      )
  ),
  placeholder : PropTypes.string,
  errorMessage : PropTypes.string,
  onEditModeProperty : PropTypes.func,
  setCard : PropTypes.func,
  disabled : PropTypes.bool,
}

CalamityMultiplePropertyCardComponent.defaultProps = {
  cardDataHolder : [],
}

export default CalamityMultiplePropertyCardComponent
