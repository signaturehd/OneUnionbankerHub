import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MyTrainingPresenter'

import MyTrainingCardComponent from
'./components/MyTrainingCardComponent'

import MyTrainingListCardComponent from
'./components/MyTrainingListCardComponent'

import {
  CircularLoader,
  Line,
  GenericInput
} from '../../ub-components/'

import './styles/myTrainingStyle.css'

class MyTrainingFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      trainingList : [],
      enabledLoader: false,
      searchString : '',
      index: 3,
    }
  }

  componentDidMount () {
    this.presenter.getEmployeeTraining()
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

  updateSearch () {

  }

  render () {
  const { history } = this.props
  const {
    trainingList,
    enabledLoader,
    searchString,
    index
  } = this.state


  let trainingSearch = trainingList
  const search = searchString.trim().toLowerCase()
  if (search.length > 0) {
        trainingSearch = trainingList.filter(trainingList =>
       trainingList.venue.toLowerCase().match(search) ||
       trainingList.title.toLowerCase().match(search))
  }

  return (
    <div>
      { super.render() }
      <div className={ 'header-margin-container' }>
        <i className = { 'back-arrow' } onClick = { () =>
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
              onChange = { this.updateSearch } />
          </div>
        </div>
        <div className = { 'mytrainings-list-card' }>
          <div>
            <Line/>
          </div>
          <div className = { 'mytrainings-list' }>
          {
           trainingSearch &&
           trainingSearch.map((resp, key) =>
             <MyTrainingListCardComponent
               key = { key }
               venue = { resp.venue }
               startDate = { resp.startDate }
             />
           )
          }
          </div>
          <div>
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
