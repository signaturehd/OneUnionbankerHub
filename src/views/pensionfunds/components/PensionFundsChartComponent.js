import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Chart } from 'chart.js'

import {
  LineChart,
  GenericButton
} from '../../../ub-components/'

import './styles/fundsComponentStyle.css'

class PensionFundsChartComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      pensionChartData
    } = this.props
    let data = {
        labels: pensionChartData,
        datasets: [
        {
          borderColor: 'white',
          label: "Prime and Fibonacci",
          fillColor: "white",
          strokeColor: "white",
          pointColor: "white",
          pointStrokeColor: "white",
          pointHighlightFill: "white",
          backgroundColor: "rgb(255,102,0)",
          pointHighlightStroke: "white",
          data: [2, 20, 10, 2, 25, 28, 17, 25, 10, 29,50,100]
        },
      ]
    }
    return (
      <div className = { 'pension-chart-grid-3x' }>
        <div>
          <LineChart
            id = { 'oneunionbankerhub-chart' }
            width = { 'auto' }
            data = { data }/>
        </div>
        <div></div>
      </div>
    )
  }
}

PensionFundsChartComponent.propTypes = {
  pensionChartData : PropTypes.object,
}


export default PensionFundsChartComponent
