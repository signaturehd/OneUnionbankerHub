import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
}  from '../../../ub-components/'

class NewEmployeeHireHeaderComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {

    return (
      <div className = { 'neo-header-grid' }>
  	    <div className = { 'margin-auto' } >
  	    	<h4 className = { 'neo-employee-name unionbank-color-grey' } >
  	    		WELCOME JUAN DELA CRUZ,
  	    	</h4>
  	    	<h4 className = { 'neo-description unionbank-color-grey' }>
  	    		Learn to own your future
  	    	</h4>
  	    	<h4 className = { 'neo-description unionbank-color-grey' }>
  	    		by knowing more about unionbank
  	    	</h4>
  	    	<h4 className = { 'neo-deadline' }>
	        	Must be finished on or before Feb. 29, 2019
  	    	</h4>
  	    </div>
        <div className = { 'text-align-right' }>
          <Progress
            type = { 'circle' }
            theme = {{
              active: {
              symbol: 65 + '%',
                trailColor: 'grey',
                color: 'orange'
              }}
            }
            height = { 100 }
            width = { 100 }
            percent = { 65 }
            />
        </div>
      </div>
    )
  }
}

export default NewEmployeeHireHeaderComponent
