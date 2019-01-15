import React, { Component } from 'react'
import { Card } from '../../../ub-components'
import { GenericButton, GenericInput } from '../../../ub-components'

class Award extends Component {

  render () {
    const {
      awardData,
      selectedId,
      selectedAwards
    } = this.props

    return (
      <div  className = {'celebrate-container'}>
          <GenericButton
            className = {''}
            text = {'back'}
            onClick = { () => selectedAwards(false)  }
            />
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
                          <h1>{value.title}</h1>
                          <h4 className = {'text-align-justify celebrate-margin-bottom text-weight-bolder'}>{value.details}</h4>

                              <h4 className = {'text-align-justify text-weight-bolder'}>{value.principles}</h4>
                              <h4 className = {'text-align-justify'}>{value.principlesDetails}</h4>
                              <h4 className = {'text-align-justify text-weight-bolder'}>{value.value}</h4>
                              <h4 className = {'text-align-justify celebrate-margin-bottom2'}>{value.valuesDetails}</h4>
                      </div>

                  ))
              }
                <div>
                    <GenericInput className={'celebrate-textbox '} hint={'Search employees name'}>
                    </GenericInput>
                </div>
                <div>
                    <h4 className={'celebrate-container-space'}>Who will I award this to?</h4>
                </div>
                <div className={ 'celebrate-container-space ' }>
                    <h4 className={'celebrate-margin-bottom'}>Write a personal message of gratitude for this award's recipients.</h4>
                    <GenericInput type={ 'textarea' } resize={150}>
                    </GenericInput>
                </div>
                    <div className={'text-align-center '}>
                    <GenericButton
                      text={ 'Submit' }
                      className={ 'celebrate-button-center ' } />
                </div>
            </div>
            <div></div>
      </div>
    )
  }
}

export default Award
