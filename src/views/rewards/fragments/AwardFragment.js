import React, { Component } from 'react'
import { Card } from '../../../ub-components'
import { GenericButton, GenericInput, Checkbox  } from '../../../ub-components'

import RewardSearchComponent from '../components/RewardSearchComponent'

class Award extends Component {

  render () {
    const {
      awardData,
      selectedId,
      selectedAwards,
      setEmployeeMessage,
      employeeMessage,
      setEmployeeName,
      onSubmitAwards,
      employeeName,
      membersData,
      membersDataFunc,
      orNumberErrorMessage,
      onChangeDataFunc,
      searchFunc,
      searchString,
      enabledCircularLoader,
      employeeList
    } = this.props

    return (
      <div className = {'celebrate-container'}>
        <div className = { 'text-align-right' }>
          <i
            className = { 'back-arrow' }
            onClick = { () => selectedAwards(false) }>
          </i>
        </div>
        <div className = {'celebrate-main-item'}>
          {
            awardData.map((value, key) =>
            (
              value.id === selectedId &&
              <div className = {'text-align-center'}>
                <div
                  className={ value.styleName }
                  text={ '' } >
                </div>
                <h4 className = { 'font-size-30px' }>{value.title}</h4>
                <br/>
                <h4 className = {'text-align-justify celebrate-margin-bottom font-weight-lighter font-size-16px'}>{value.details}</h4>
                <h4 className = {'text-align-justify font-weight-bold font-size-15px'}>{value.principles}</h4>
                <h4 className = {'text-align-justify font-weight-lighter font-size-14px'}>{value.principlesDetails}</h4>
                <br/>
                <h4 className = {'text-align-justify font-weight-bold font-size-14px'}>{value.value}</h4>
                <h4 className = {'text-align-justify font-weight-lighter font-size-14px'}>{value.valuesDetails}</h4>
              </div>
            )
          )
        }
        <div>
        <br/>
				<RewardSearchComponent
          enabledCircularLoader = { enabledCircularLoader }
          searchString = { searchString }
          searchFunc = { () => searchFunc() }
          onChangeData = { (e) =>
            onChangeDataFunc(e)
          }
					sendDataList = { (e) => membersDataFunc(e) }
					listData = { membersData }/>
        </div>
        <div>
          <h4 className={'celebrate-container-space'}>Who will I award this to?</h4>
          <br/>
          <div>
          {
            employeeList &&
            employeeList.map((resp, key) =>
              resp.isChecked === true &&
              <div
                ket = { key }
                style = {{
                  borderRadius: '5px',
                  backgroundColor: '#ff8a00',
                  textAlign: 'left',
                  marginBottom: '10px',
                  padding: '10px 0px 10px 20px',
                  display: 'grid',
                  color: '#fff',
                  gridTemplateColumns: 'auto .01fr',
                  alignItems: 'center',
                }}>
                <h4
                  className = { 'align-items-center cursor-pointer font-weight-lighter font-size-16px' }>
                  { resp.name }
                </h4>
                <div className = { 'text-align-right' }>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={ 'celebrate-container-space ' }>
          <h4 className={'celebrate-margin-bottom'}>Write a personal message of gratitude for this award's recipients.</h4>
          <GenericInput
            type={ 'textarea' }
            resize={150}
            value={ employeeMessage }
            defaultValue={ employeeMessage }
            onChange={ (e) => setEmployeeMessage(e.target.value) }>
          </GenericInput>
        </div>
        <div className={'text-align-center '}>
          <GenericButton
            text={ 'Submit' }
            className={ 'celebrate-button-center ' }
            onClick={ () => onSubmitAwards()}/>
        </div>
      </div>
    </div>
    )
  }
}

export default Award
