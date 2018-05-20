import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/FaqPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'

import FaqCardComponent from './components/FaqCardComponent/FaqCardComponent'
import FaqModal from './modals/FaqModal'

import './styles/faq.css'

class FaqFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
        faqs: [],
        faqsCategory: [],
        faqsList: [],
        showFaqModal : false,
        show : false,
        showSelected: false,
        showListFragment : false,
        searchString : '',
        faqSelected :  '',
        key : '',
        faqTitle : null
    }

    this.updateSearch = this.updateSearch.bind(this)
    this.getFaqDetails = this.getFaqDetails.bind(this)
    this.showSelected = this.showSelected.bind(this)
  }

  updateSearch (e) {
      this.setState({ searchString: e.target.value })
  }

  componentDidMount () {
    this.props.history.push('/faqs')
    this.presenter.getFaqs(this.state.faqsList)
    this.props.setSelectedNavigation(3)
  }

  showFaqs ( faqs ) {
    this.setState({ faqs })
  }

  showFaqsCategories (faqsCategory) {
    this.setState({ faqsCategory })
  }

  showSelected (selected) {
    this.setState({ faqsList : selected })
    this.props.history.push('/faqs/' + selected.category)
  }

  showFaqsList ( faqsList ) {
    this.setState({ faqsList })
  }

  getFaqDetails (id, faqTitle) {
    this.setState({ showFaqModal : true, faqTitle })
    this.presenter.getFaqDetails(id)
  }

  showFaqDetails (details) {
    this.setState({ details })
  }

  render () {
    const { history } = this.props
    const {
      faqsList,
      faqs,
      faqsCategory,
      show,
      details,
      key,
      showFaqModal,
      faqTitle,
      searchString
    } = this.state
    let searchCategory = faqs
    const search = searchString.trim().toLowerCase()
    if (search.length > 0) {
        searchCategory = searchCategory.filter(faq => faq.category.toLowerCase().match(search))
    }
    const Faq = () => (
        <div className = {'container'}>
          <h1 className = { 'title-view' }>FAQ&#39;s</h1>
            <input type = 'text'
                   className = 'faqsSearchBar'
                   placeholder = {'Search FAQs'}
                   value = { this.state.searchString }
                   onChange = { this.updateSearch } />
          <div className = {'card-container'}>
          {
          searchCategory.map((faq, i) =>
            <FaqCardComponent
              key = {i}
              searchCategory = { faq }
              onClick = { () => this.showSelected(faq) } />
            )
          }
          </div>
        </div>
      )
      const FaqListFragment = props => {
        return (
        <div className = {'container'}>
          <i className = { 'left' } onClick = { () => history.push('/faqs') }></i>
          <h1 className = { 'title-view' }>{faqsList && faqsList.category }</h1>
            <input type = 'text'
                   className = 'faqsSearchBar'
                   placeholder = {'Search FAQs'}
                   value = { this.state.searchString }
                   onChange = { this.updateSearch } />
          <div className = {'card-container'}>
          {
            faqsList &&
            faqsList.question.map((faq, i) =>
              <FaqCardComponent
                key = {i}
                searchCategory = { faq }
                onClick = { () => this.getFaqDetails(faq.id, faq.title) } />
            )
          }
          </div>
        </div>
      )
    }
    return (
      <div>
         <Switch>
           <Route path = '/faqs/:id' render = { props => <FaqListFragment { ...props } /> }/>
           <Route exact path = '/faqs' render = { Faq } />
        </Switch>

        {
          showFaqModal &&
          <FaqModal
            faqTitle = { faqTitle }
            details = { details }
            onClose = { () => this.setState({ showFaqModal : false, details: null, faqTitle: null })} />
        }
      </div>
    )
  }
}

FaqFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(FaqFragment, Presenter)
