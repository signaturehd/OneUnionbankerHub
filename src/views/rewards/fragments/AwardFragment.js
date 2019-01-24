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
      employeeList,
      enabledCircularLoader,
      deleteEmployeeToList,
      selectAllIsChecked,
      selectAllEmployee,
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
                <h4 className = {'text-align-justify font-weight-bold font-size-13px'}>{value.principles}</h4>
                <h4 className = {'text-align-justify font-weight-lighter font-size-12px'}>{value.principlesDetails}</h4>
                <br/>
                <h4 className = {'text-align-justify font-weight-bold font-size-13px'}>{value.value}</h4>
                <h4 className = {'text-align-justify font-weight-lighter font-size-12px'}>{value.valuesDetails}</h4>
              </div>
            )
          )
        }
        <div>
        <br/>
        {
          // membersData &&
          // <div className = { 'awards-grid-select-option' }>
          //   <div></div>
          //   <h4 className = { 'font-size-10px font-weight-lighter' }>Select all</h4>
          //   <Checkbox
          //     selected = { selectAllIsChecked }
          //     onChange = { () =>
          //       selectAllEmployee()
          //     }
          //   />
          // </div>
        }
				<RewardSearchComponent
          enabledCircularLoader = { enabledCircularLoader }
          searchString = { searchString }
          searchFunc = { () => searchFunc() }
          onChangeData = { (e) =>
            onChangeDataFunc(e)
          }
					sendDataList = { (e) => {
            membersDataFunc(e)
          } }
          className = { 'myrewards-input' }
					listData = { membersData }/>
        </div>
        <div>
          <h4 className={'celebrate-container-space font-size-14px'}>Who will I award this to?</h4>
          <br/>
        <div className = { 'grid-global' }>
          {
            employeeList &&
            employeeList.map((resp, key) =>
              resp.isChecked === true &&
              <Card
                ket = { key }
                style = {{
                  borderRadius: '5px',
                  backgroundColor: '#ff8a00',
                  textAlign: 'left',
                  marginBottom: '10px',
                  padding: '1px 5px 1px 10px',
                  display: 'grid',
                  color: '#fff',
                  gridTemplateColumns: 'auto .01fr',
                  alignItems: 'center',
                }}>
                <h4
                  className = { 'align-items-center cursor-pointer font-weight-lighter font-size-10px' }>
                  { resp.name }
                </h4>
                <div className = { 'text-align-right' }>
                  <img
                    className = { 'close-button-global' }
                    src = { require('../../../images/x-circle-global.png') }
                    onClick = { () => {
                      deleteEmployeeToList(key, resp.id)
                    }}
                  />
                </div>
              </Card>
            )}
          </div>
        </div>
        <div className={ 'celebrate-container-space ' }>
          <h4 className={'celebrate-margin-bottom font-size-14px'}>Write a personal message of gratitude for this award's recipients.</h4>
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
