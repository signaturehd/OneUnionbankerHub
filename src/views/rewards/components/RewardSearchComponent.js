import React, { Component } from 'react'
import { Card, GenericInput } from '../../../ub-components'


class RewardSearchComponent extends Component {
  constructor (props) {
    super(props)
      this.state = {
        searchString : ''
      }
      this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch (e) {
    this.setState({ searchString: e.target.value.substr(0 , 20) })
  }

  render () {
    const {
      membersData
    } = this.props

    const {
      searchString
    } = this.state

    let memberList = membersData
    const search = searchString.trim().toLowerCase()
    if (search.length > 0) {
      memberList = membersData.filter(membersData => membersData.name.toLowerCase().match(search))
    }

    return (
      <div>
        <GenericInput
          type = { 'text' }
          className = { 'newsSearchBar' }
          refCallback = { 'search' }
          type = { 'text' }
          hint = { 'Search News' }
          value = { searchString }
          onChange = { this.updateSearch } />
        {
          memberList &&
          memberList.map((resp) =>
            <h2>{ resp.name }</h2>
          )
        }
      </div>
    )
  }
}


export default RewardSearchComponent
