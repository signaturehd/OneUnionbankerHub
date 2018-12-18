import React, { Component } from 'react'

import PropTypes from 'prop-types'

class VaccineListComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      vaccineList
    } = this.props

    return (
      <div>
        {
          vaccineList &&
          vaccineList.map((vaccine, key) => {
            
          })
        }
      </div>
    )
  }
}

VaccineListComponent.propTypes = {
  vaccineList: PropTypes.array,
}

export default VaccineListComponent
