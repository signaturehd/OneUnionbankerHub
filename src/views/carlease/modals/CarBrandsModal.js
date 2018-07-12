import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Modal, GenericButton } from '../../../ub-components'

import './styles/carleaseModalStyle.css'

class CarBrandsModal extends Component {

  constructor (props) {
      super(props)
  }

  render () {
    const { onClose, brands, onGetCarBrands } = this.props

    return (
      <Modal
        onClose={ onClose }
        isDismisable={ true }
      >
        <center>
        <span className={ 'carlease-icons carlease-icons-car' }/>
          <h2>Car Brands</h2>
          {
            brands?

            brands && brands.map((car, key) =>
              <GenericButton
                className={ 'carlease-modal-button' }
                key={ key }
                text={ car.name }
                onClick={ ()=> onGetCarBrands(car, false) }
              />
            )
            :
            <div></div>
          }
        </center>
      </Modal>
    )
  }
}

CarBrandsModal.propTypes = {
  onClose : PropTypes.func,
  brands : PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  onGetCarBrands : PropTypes.func
}

export default CarBrandsModal
