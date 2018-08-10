import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import EnrolledTrainingCardComponent from '../components/EnrolledTrainingCardComponent'

import * as MyTrainingFunctions from
'../functions/MyTrainingFunctions'

import {
  CircularLoader,
  Line,
  GenericInput,
  GenericButton,
  Modal
} from '../../../ub-components/'

import './styles/myTrainingStyle.css'

class ApprovalTrainingFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      enrolledTrainingList : [],
      enabledLoader: false,
      index: 8,
    }
  }

  componentDidMount () {
    this.props.presenter.getEnrolledTraining()
  }

  setEnrolledTrainingList (enrolledTrainingList) {
    this.setState({ enrolledTrainingList })
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
  const { history, presenter, searchString } = this.props
  const {
    enrolledTrainingList,
    enabledLoader,
    index,
  } = this.state


  let training = enrolledTrainingList
  const search = searchString.trim().toLowerCase()
  if (search.length > 0) {
        training = enrolledTrainingList.filter(enrolledTrainingList =>
       enrolledTrainingList.name.toLowerCase().match(search) ||
       enrolledTrainingList.title.toLowerCase().match(search))
  }

  return (
    <div>
      { super.render() }
      {
        enabledLoader ?
        <center className = { 'circular-loader-center' }>
           <CircularLoader show = { true }/>
         </center>
       :
      <div className = { 'mytrainings-grid-container-row' }>
        <div className = { 'mytrainings-list-card' }>
          <div>
            <Line/>
            <br/>
          </div>
          <div className = { 'mytrainings-list' }>
          {
           training &&
           training.slice(0, index).map((resp, key) =>
             <EnrolledTrainingCardComponent
               key = { key }
               id = { resp.id }
               name = { resp.name }
               title = { resp.title }
               date = { resp.date }
             />
           )
          }
          </div>
          <div>
            <div className = { 'grid-global' }>
              <GenericButton
                className = { 'transaction-component-button' }
                text = { 'View Less' }
                onClick = { () =>
                  this.setState({
                    index : MyTrainingFunctions.indexDecreased(index)
                    })
                  }
                />
              <GenericButton
                className = { 'transaction-component-button' }
                text = { 'View More' }
                onClick = { () =>
                  this.setState({
                    index : MyTrainingFunctions.indexIncreased(index)
                    })
                  }
                />
            </div>
            <Line/>
          </div>
        </div>
      </div>
      }
    </div>
    )
  }
}

export default ApprovalTrainingFragment
