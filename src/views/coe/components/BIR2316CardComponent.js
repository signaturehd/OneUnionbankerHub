import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/coeComponentStyle.css'
import {  Card } from '../../../ub-components/'

// import PayslipDetailsModal from '../modals/PayslipDetailsModal'

class BIR2316CardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      birArrayList,
      onSubmit,
      viewMoreText,
      viewMore,
      viewLess,
      index,
      backToList
    }=this.props

    const isVisible = (birArrayList && birArrayList.length > 4) ? '' : 'hide'

    return (
    <div className = { 'coe-grid-column-2' }>
      <div>
        <i
          className = { 'back-arrow' }
          onClick = { () => backToList() }>
        </i>
      </div>
      <div>
        <div className={ 'bir-card-container' }>
          {
            birArrayList.slice(0, index).map((bir, key) =>
              <Card
                className={ 'bir-card-component' }
                key={ key }
                onClick={ () =>
                  onSubmit(bir && bir.period ? bir.period : '')
                } >
                <div className={ 'bir-grid-card-container' }>
                  <div>
                    <span className={ ' bir-icon-forms bir-icon' }/>
                  </div>
                  <div>
                    <h2 className={ 'bir-label' }>
                      { bir && bir.date ? bir.date : '(Not Yet Provided)' }
                    </h2>
                  </div>
                  <div><span className={ 'bir-icon-forms bir-icon-proceed' }/>
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
              if(index === birArrayList.length)
                viewLess()
              else
                viewMore()
            }
          }>
          <img src={ require('../../../images/icons/horizontal.png') } />
          <span className={ 'tooltiptext' }>{ viewMoreText }</span>
        </button>
      </div>
    </div>
    )
  }
}

BIR2316CardComponent.propTypes = {
  payslipList : PropTypes.array,
  viewMore : PropTypes.func,
  viewMoreText : PropTypes.string,
  viewLess : PropTypes.func,
}

export default BIR2316CardComponent
