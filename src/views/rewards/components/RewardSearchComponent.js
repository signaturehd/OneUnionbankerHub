import React, { Component } from 'react'
import { Card, GenericInput, Checkbox, GenericLoader } from '../../../ub-components'
import PropTypes from 'prop-types'

let storeData = []

class RewardSearchComponent extends Component {
  constructor (props) {
    super(props)
  }

  updateSearch (e) {
    this.props.onChangeData(e.target.value.substr(0 , 20))
  }

  searchFunc () {
    this.props.searchFunc()
  }

  receiveData (data) {
    const {
      listData
    } = this.props

    const updateList = [...storeData]

    listData.map((resp, key) => {
      if(data.id.toString() === resp.id.toString()) {
        updateList.push({
          id: resp.id,
          name: resp.name,
          isChecked : !resp.isChecked ? true : false
        })
      } else {
        updateList.push({
          id: resp.id,
          name: resp.name,
          isChecked : resp.isChecked
        })
      }
    })
    storeData = updateList
    this.props.sendDataList(storeData)
  }

  render () {
    const {
      listData,
      hint,
      type,
      sendDataList,
      onChangeData,
      searchString,
      searchFunc,
      enabledCircularLoader
    } = this.props

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
          onChange = { (e) => this.updateSearch(e) }
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
                      onClick = { () =>
                        this.receiveData(resp)
                      }
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
                enabledCircularLoader ?
                <center>
                  <br/>
                  <GenericLoader show = { enabledCircularLoader }/>
                </center>
                :
                <div className = { 'grid-global-column-x3' }>
                  {
                    list &&
                    list.map((resp, key) =>
                    <div
                      ket = { key }
                      style = {{
                        borderRadius: '5px',
                        border: '1px solid #f6f3f3',
                        backgroundColor: 'rgb(254, 254, 254)',
                        textAlign: 'left',
                        marginBottom: '10px',
                        padding: '15px 0px 15px 20px',
                        display: 'grid',
                        gridTemplateColumns: 'auto .01fr',
                        alignItems: 'center',
                      }}>
                      <h4
                        className = { 'align-items-center cursor-pointer font-weight-lighter font-size-12px' }>
                        { resp.name }
                      </h4>
                      <div className = { 'text-align-right' }>
                        <Checkbox
                          selected = { resp.isChecked }
                          onClick = { () => this.receiveData(resp) }
                        />
                      </div>
                    </div>
                  )}
                </div>
              }
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
  enabledCircularLoader : PropTypes.bool,
}

RewardSearchComponent.defaultProps= {
  enabledCircularLoader : false
}

export default RewardSearchComponent
