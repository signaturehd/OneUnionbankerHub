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
        faqsCategory: [],
        showCategories: [],
        show : false,
        showFaqs : false,
        faqsCategories : false,
        showFaqsCategories : false,
        searchString : ''
    }
    this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch () {
    this.setState({ searchString: this.refs.search.value.substr(0 , 20) })
  }

  componentDidMount () {
    this.presenter.getFaqs()
    this.presenter.getFaqsCategories()
    this.props.setSelectedNavigation(3)
  }

  showFaqs (faqs) {
    this.setState({ faqs })
  }
  faqsCategories (faqsCategory) {
    this.setState({ faqsCategory })
  }

  render () {
    const { faqs, faqsCategory, show, details, showCategories } = this.state
    let categorize = this.state.faqsCategory
    const search = this.state.searchString.trim().toLowerCase()
    if (search.length > 0) {
      categorize = categorize.filter(faqs => (faqs.category.category).toLowerCase().match(search))
    }

    return (
      <div className = {'container'}>
        { super.render() }
        <h1 className = { 'title-view' }>FAQs</h1>
          <input type = 'text'
                 className = 'newsSearchBar'
                 ref="search"
                 placeholder = {'Search Faqs'}
                 value = { this.state.searchString }
                 onChange = { this.updateSearch } />

        {
          show &&
          <FaqModal onClose = { () => this.setState({ show: false })}  details = { details } />
        }
        <div className = {'card-container'}>
        {
        categorize.map((faq, i) =>
          <FaqCardComponent
            key = {i}
            categorize = { faq }
            onClick = { details => {
              this.setState({ details, show: true })
            }} />)
        }
        </div>
      
      </div>
    )
  }
}

FaqFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(FaqFragment, Presenter)
