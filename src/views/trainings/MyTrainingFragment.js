import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MyTrainingPresenter'

import TrainingCardModal from
'./modals/TrainingCardModal'

import MyTrainingListCardComponent from
'./components/MyTrainingListCardComponent'

import * as MyTrainingFunctions from
'./functions/MyTrainingFunctions'

import {
  CircularLoader,
  Line,
  GenericInput,
  GenericButton
} from '../../ub-components/'

import './styles/myTrainingStyle.css'

class MyTrainingFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      trainingList : [],
      enabledLoader: false,
      searchString : '',
      index: 8,
      trainingDetails: null,
      showConfirmation : false,
    }
    this.programSearch = this.programSearch.bind(this)
  }

  componentDidMount () {
    this.presenter.getEmployeeTraining()
  }

  setTrainingDetails (trainingDetails) {
    this.setState({ trainingDetails })
  }

  showTrainingList (trainingList) {
    this.setState({ trainingList })
  }

  showCircularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  hideCircularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  programSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  render () {
  const { history, presenter } = this.props
  const {
    trainingList,
    enabledLoader,
    searchString,
    index,
    trainingDetails,
    showConfirmation,
  } = this.state


  let training = trainingList
  const search = searchString.trim().toLowerCase()
  if (search.length > 0) {
        training = trainingList.filter(trainingList =>
       trainingList.venue.toLowerCase().match(search) ||
       trainingList.title.toLowerCase().match(search))
  }

  return (
    <div>
      { super.render() }
      {
        trainingDetails &&
        <TrainingCardModal
          onClose = { () => this.setState({ trainingDetails : '' }) }
          details = { trainingDetails }
          onEnroll = { (id) => this.presenter.enrollEmployee(id) }
          showConfirmation = { showConfirmation }
          setConfirmation = { (showConfirmation) => this.setState({showConfirmation}) }
        />
      }
      <div className={ 'header-margin-container' }>
        <i
          className = { 'back-arrow' }
          onClick = { () =>
            history.push('/mylearning') }>
        </i>
        <h2 className = { 'header-margin-default' }>My Trainings</h2>
      </div>
      {
        enabledLoader ?
        <center className = { 'circular-loader-center' }>
           <CircularLoader show = { true }/>
         </center>
       :
      <div className = { 'mytrainings-grid-container-row' }>
        <div className = { 'mytrainings-grid-container-column' }>
          <div></div>
          <div>
            <GenericInput
              type = { 'text' }
              className = { 'transaction-search-bar' }
              refCallback = { 'search' }
              hint = { 'Search ( e.g Venue, Title of Trainings )' }
              value = { searchString }
              onChange = { this.programSearch } />
            <br/>
          </div>
        </div>

        <div className = { 'mytrainings-list-card' }>
          <div>
            <Line/>
            <br/>
          </div>
          <div className = { 'mytrainings-list' }>
          {
           training &&
           training.slice(0, index).map((resp, key) =>
             <MyTrainingListCardComponent
               key = { key }
               id = { resp.id }
               venue = { resp.venue }
               title = { resp.title }
               startTime = { resp.startTime }
               endTime = { resp.endTime }
               status = { resp.status }
               startDate = { resp.startDate }
               endDate = { resp.endDate }
               onClick = { (id) => this.presenter.getEmployeeTrainingDetails(id) }
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

MyTrainingFragment.propTypes={
  setSelectedNavigation: PropTypes.func,
}

export default ConnectView(MyTrainingFragment, Presenter)
