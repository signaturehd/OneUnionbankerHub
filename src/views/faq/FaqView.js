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
        show : false,
        showFaqs : false,
        showFaqsCategories : false,
        showSelected: false,
        showListFragment : false,
        searchString : '',
        faqSelected :  '',
        key : ''
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.showSelected = this.showSelected.bind(this)
  }

  updateSearch () {
    this.setState({ searchString: this.refs.search.value.substr(0 , 20) })
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
    this.props.history.push('/faqs/' + selected)
  }
  showFaqsList ( faqsList ) {
    this.setState({ faqsList })
  }

  render () {
    const { history } = this.props
    const { faqsList, faqs, faqsCategory, show, detail, key } = this.state
    let searchCategory = this.state.faqsCategory
    const Faq = () => (
        <div className = {'container'}>
          { super.render() }
          <h1 className = { 'title-view' }>FAQ's</h1>
            <input type = 'text'
                   className = 'faqsSearchBar'
                   ref="search"
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
          { super.render() }
          <h1 className = { 'title-view' }>FAQ's</h1>
            <input type = 'text'
                   className = 'faqsSearchBar'
                   placeholder = {'Search FAQs'}
                   value = { this.state.searchString }
                   onChange = { this.updateSearch } />
          <div className = {'card-container'}>
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
      </div>
    )
  }
}

FaqFragment.propTypes = {
  setSelectedNavigation: PropTypes.func,
}

export default ConnectPartial(FaqFragment, Presenter)
