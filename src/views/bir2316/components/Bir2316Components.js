import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/birStyle.css'
import {  Card } from '../../../ub-components/'

class Bir2316Components extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      dataArayList,
      onSubmit,
      viewMoreText,
      viewMore,
      viewLess,
      index
    }=this.props

    const isVisible = (dataArayList && dataArayList.length > 4) ? '' : 'hide'

    return (
      <div>
      <br/>
        <div className={ 'bir2316list-card-container' }>
          {
            dataArayList.slice(0, index).map((bir2316list, key) =>
              <Card
                className={ 'bir2316list-card-component' }
                key={ key }
                onClick={ () =>
                  onSubmit(bir2316list && bir2316list.period ? bir2316list.period : '')
                } >
                <div className={ 'bir2316list-grid-card-container' }>
                  <div>
                    <span className={ ' bir2316list-icon-forms bir2316list-icon' }/>
                  </div>
                  <div>
                    <h2 className={ 'bir2316list-label' }>
                      { bir2316list && bir2316list.date ? bir2316list.date : '(Not Yet Provided)' }
                    </h2>
                  </div>
                  <div><span className={ 'bir2316list-icon-forms bir2316list-icon-proceed' }/>
                </div>
                </div>
              </Card>
            )
          }
        </div>
        <br/>
        <button
          type = { 'button' }
          className = { `viewmore tooltip ${isVisible}` }
          onClick = {
            () => {
              if(index === dataArayList.length)
                viewLess()
              else
                viewMore()
            }
          }>
          <img src={ require('../../../images/icons/horizontal.png') } />
          <span className={ 'tooltiptext' }>{ viewMoreText }</span>
        </button>
      </div>
    )
  }
}

Bir2316Components.propTypes = {
  dataArayList : PropTypes.array,
  viewMore : PropTypes.func,
  viewMoreText : PropTypes.string,
  viewLess : PropTypes.func,
}

export default Bir2316Components
