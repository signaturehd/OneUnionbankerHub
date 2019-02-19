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
      pensionChartData,
      array,
      url
    } = this.props
    let objectData = this.props.match.params.array
    var myobj = JSON.parse(objectData);
    let labelData = url ? myobj.label : pensionChartData && pensionChartData.label
    let amountData = url ? myobj.value : pensionChartData && pensionChartData.amount

    let data = {
      labels: labelData,
      datasets: [
        {
          borderColor: 'white',
          label: "Contributional Chart",
          fillColor: "white",
          strokeColor: "white",
          pointColor: "white",
          pointStrokeColor: "white",
          pointHighlightFill: "white",
          backgroundColor: "rgb(255,102,0)",
          pointHighlightStroke: "white",
          data: amountData,
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
