import React, { Component } from 'react'
import { Card, GenericInput, Checkbox } from '../../../ub-components'
import PropTypes from 'prop-types'

class RewardSearchComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      storedData: [],
      employeeName: 'dawd'
    }
  }

  updateSearch (e) {
    console.log(e)
    this.props.onChangeData(e.target.value.substr(0 , 20))
  }

  searchFunc () {
    this.props.searchFunc()
  }

  receiveData (data) {
    const newData = [...this.state.storedData]
    newData.push(data)
    this.setState({ storedData : newData })
    this.props.sendDataList(storedData)
  }

  render () {
    const {
      listData,
      hint,
      type,
      sendDataList,
      onChangeData,
      searchString,
      searchFunc
    } = this.props

    const {
      storedData
    } = this.state

    let list = listData
    const search = searchString.trim().toLowerCase()
    if(list && list.length !== 0) {
      if (search.length > 0) {
        list = listData && listData.filter(listData => listData && listData.name.toLowerCase().match(search))
      }
    }

    return (
      <div>
        <GenericInput
          type = { 'text' }
          className = { 'newsSearchBar' }
          refCallback = { 'search' }
          type = { 'text' }
          hint = { `${ hint ? hint : '' }` }
          value = { searchString }
          onChange = { () => this.updateSearch(e) }
          onKeyPress = { (e) => {
            if(e.which === 13) {
              searchFunc()
            }
          } }
          />
        {
          searchString &&
          <div>
            {
              type  === 'suggestion' ?
              <div>
                <h4 className = { 'font-weight-lighter font-size-10px' }>Suggestions</h4>
                <div style = {{
                  backgroundColor : 'transparent',
                  padding: '5px',
                  display: 'grid',
                  gridTemplateColumns: 'auto auto auto',
                  columnGap: '1%',
                }}>
                {
                  list &&
                  list.map((resp) =>
                    <h4
                      onClick = { () => this.receiveData(resp) }
                      style = {{
                        borderRadius: '5px',
                        backgroundColor: '#ffa000',
                        textAlign: 'center',
                        color : '#fff',
                        marginBottom: '3px',
                        marginRight: '1px',
                      }}
                      className = { 'cursor-pointer font-weight-lighter font-size-12px' }>
                      { resp.name }
                    </h4>
                  )
                }
              </div>
            </div>
            :
            <div>
              <h4 className = { 'font-weight-lighter font-size-10px' }>Search Results</h4>
              <div style = {{
                backgroundColor : 'transparent',
                padding: '5px',
                columnGap: '1%',
              }}>
              {
                list &&
                list.map((resp) =>
                <div
                  onClick = { () => this.receiveData(resp) }
                  style = {{
                    borderRadius: '20px',
                    backgroundColor: 'rgba(243, 238, 238, 0.63)',
                    textAlign: 'left',
                    marginBottom: '10px',
                    padding: '10px 0px 10px 20px',
                    display: 'grid',
                    gridTemplateColumns: 'auto .01fr',
                    alignItems: 'center',
                  }}>
                  <h4
                    className = { 'align-items-center cursor-pointer font-weight-lighter font-size-16px' }>
                    { resp.name }
                  </h4>
                  <div className = { 'text-align-right' }>
                    <Checkbox/>
                  </div>
                </div>
              )}
            </div>
          </div>
            }
          </div>
        }
      </div>
    )
  }
}

RewardSearchComponent.propTypes = {
  hint: PropTypes.string,
  sendDataList: PropTypes.func,
  type : PropTypes.string,
}

export default RewardSearchComponent
