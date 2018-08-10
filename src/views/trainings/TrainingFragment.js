import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'
import Presenter from './presenter/MyTrainingPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import MyTrainingFragment from './fragments/MyTrainingFragment'
import EnrolledTrainingFragment from './fragments/EnrolledTrainingFragment'
//import BookRecommendationFragment from './fragments/BookRecommendationFragment'

import {
  CircularLoader,
  Line,
  GenericInput,
  GenericButton,
  Modal } from '../../ub-components'

import './styles/trainingStyles.css'

class TrainingFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      trainingList : [],
      enrolledTrainingList : [],
      forApprovalList : [],
      enabledLoader : false,
      searchString : '',
    }
    this.programSearch = this.programSearch.bind(this)
  }

  componentDidMount () {
    this.props.history.push('/mylearning/trainings/mytrainings')
  }

  navigate () {
    this.props.history.push('/mylearning')
  }

  programSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }

  render () {
    const { history, presenter } = this.props
    const {
      searchString
    } = this.state

    const search = searchString.trim().toLowerCase()

    return (
      <div>
        { super.render() }
        <div className={ 'grid-search' }>
        <div className={ 'header-margin-container' }>
          <i className = { 'back-arrow' } onClick = { this.navigate.bind(this) }></i>
        </div>
        <div></div>
        <GenericInput
          type = { 'text' }
          className = { 'transaction-search-bar' }
          refCallback = { 'search' }
          hint = { 'Search ( e.g Venue, Title of Trainings )' }
          value = { searchString }
          onChange = { this.programSearch } />
        </div>
        <div className = { 'tabs-container' }>
          <input
            className = { 'input-tab' }
            id='tab1'
            type='radio'
            name='tabs'
            onClick = { () => history.push('/mylearning/trainings/mytrainings') }
            defaultChecked />
          <label  htmlFor = 'tab1'>Trainings</label>

          <input
            className = { 'input-tab' }
            id='tab2'
            type='radio'
            onClick = { () => history.push('/mylearning/trainings/enrolledtrainings') }
            name='tabs' />
          <label  htmlFor='tab2'>Enrolled Trainings</label>

          <input
            className = { 'input-tab' }
            id='tab3'
            onClick = { () => null }
            type='radio'
            name='tabs' />
          <label  htmlFor = 'tab3' >For Approval</label>

          <section id='content1'>
              <Switch>
                <Route path = '/mylearning/trainings/mytrainings'
                  render = { props => <MyTrainingFragment
                      presenter = { this.presenter }
                      searchString = { searchString }
                    />
                  }
                />
                <Route path = '/mylearning/trainings/enrolledtrainings'
                  render = { props => <EnrolledTrainingFragment
                    presenter = { this.presenter }
                    searchString = { searchString }
                    />
                  }
                />
            </Switch>
          </section>
        </div>
      </div>
    )
  }
}

TrainingFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(TrainingFragment, Presenter)
