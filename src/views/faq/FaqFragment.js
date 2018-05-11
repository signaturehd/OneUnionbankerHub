import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/FaqPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import FaqCardComponent from './components/FaqCardComponent/FaqCardComponent'
import FaqModal from './modals/FaqModal'

import './styles/faq-fragment.css'

class FaqFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        faqs: [],
        show : false,
        searchString : ''
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch () {
    this.setState({ searchString: this.refs.search.value.substr(0 , 20) })
  }

  componentDidMount () {
    this.presenter.getFaqs()
    this.props.setSelectedNavigation(3)
  }

  faqs (faqs) {
    this.setState({ faqs })
  }

  render () {
    const { faqs, show, details } = this.state
    let _faqs = this.state.faqs
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
      _faqs = _faqs.filter(faqs => faqs.title.toLowerCase().match(search))
    }
    return (
      <div className = {'container'}>
        { super.render() }
        <h1>Faqs</h1>
          <input type = 'text'
                 className = 'newsSearchBar'
                 ref="search"
                 placeholder = {'Search Faqs'}
                 value = { this.state.searchString }
                 onChange = { this.updateSearch } />

        <div className = {'card-container'}>
        {
        _faqs.map((faqs, i) =>
          <FaqCardComponent
            key = {i}
            faqs = { faqs }
            onClick = { details => {
              this.setState({ details, show: true })
            }} />)
        }
        </div>
        {
          show &&
          <FaqModal onClose = { () => this.setState({ show: false })} details = { details } />
        }
      </div>
    )
  }
}

FaqFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(FaqFragment, Presenter)
