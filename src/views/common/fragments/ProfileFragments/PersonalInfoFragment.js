import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  Line,
  GenericButton,
  GenericInput,
  MultipleAttachments,
  SingleInputModal,
  Card
} from '../../../../ub-components/'

class PersonalInfoFragment extends Component {

  constructor (props) {
    super(props)
    this.state={
      isDismisable : true,
      updateAddress : false,
      updateCivilStatus : false,
      showCivilStatusModal : false,
      attachments : [{
        name : 'Proof Attachments'
      }],
      addressText : '',
      regionText: '',
      countryText: '',
      postalCode : '',
      civilStatusId : '',
      civilStatus : '',
      civilStatusErrorMessage : '',
      civilStatusArray : [
        {
          id: 1,
          name: 'Single'
        },
        {
          id: 2,
          name: 'Married'
        },
        {
          id: 3,
          name: 'Divorced'
        },
        {
          id: 4,
          name: 'Widowed'
        }
      ]
    }
  }

  submitCivil () {
    const { civilStatus } = this.state
    const { onUpdateCivilStatusFunc } = this.props
    if(civilStatus === '') {
      this.setState({ civilStatusErrorMessage : 'Please select a civil status' })
    } else {
      onUpdateCivilStatusFunc(civilStatus)
      this.setState({ civilStatusErrorMessage : '', updateCivilStatus: false })
    }
  }

  render () {
    const {
      onClose,
      profile,
      accountNumber,
      backgroundColor,
      rank,
      lineManager,
    }=this.props

    const {
      isDismisable,
      updateAddress,
      updateCivilStatus,
      attachments,
      addressText,
      postalCode,
      countryText,
      regionText,
      civilStatusId,
      civilStatus,
      civilStatusErrorMessage,
      showCivilStatusModal,
      civilStatusArray
    }=this.state


    return (
      <Card className={ 'profile-others-card padding-profileFragment' }>
        <div className={ 'profile-padding' }>
          <div className = { 'grid-global' }>
            <div>
              <h2 className={ 'unionbank-color-grey font-weight-normal padding-profileFragment-name' }>
                Personal Information
              </h2>
              <div>
                <br/>
                <div className={ 'contact-info-grid' }>
                  <div
                    className={ 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings employeeId' }/>
                    </div>
                    <div className={ 'contact-info-grid-row' }>
                      <div className={ 'font-size-17px contact-title' }>
                        <h2>Employee ID </h2>
                      </div>
                      <div className={ 'font-size-16px' }>
                        <a>
                          { profile && profile.employeeNumber ?  profile.employeeNumber : '(Not Yet Provided)' }
                        </a>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div
                    className={ 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings employeeId' }/>
                    </div>
                    <div className={ 'contact-info-grid-row' }>
                      <div className={ 'font-size-17px contact-title' }>
                        <h2>Account Number </h2>
                      </div>
                      <div className={ 'font-size-16px' }>
                        <a>
                          { accountNumber && accountNumber }
                        </a>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div
                    className={ 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings employeeBdate' }/>
                    </div>
                    <div className={ 'contact-info-grid-row' }>
                      <div className={ 'font-size-17px contact-title' }>
                        <h2>Birth Date </h2>
                      </div>
                      <div className={ 'font-size-16px' }>
                        <a>
                          { profile && profile.birthDate ?  profile.birthDate : '(Not Yet Provided)' }
                        </a>
                      </div>
                    </div>
                  </div>
                  <br/>
                  <div
                    className={ 'contact-number-grid' }>
                    <div>
                      <span className={ 'contact-icon-settings employeeGender' }/>
                    </div>
                    <div className={ 'contact-info-grid-row' }>
                      <div className={ 'font-size-17px contact-title' }>
                        <h2>Gender</h2>
                      </div>
                      <div className={ 'font-size-16px' }>
                        <a>
                          { profile && profile.gender ?  profile.gender : '(Not Yet Provided)' }
                        </a>
                      </div>
                    </div>
                  </div>
                  <br/>
                  {
                    showCivilStatusModal &&
                    <SingleInputModal
                      label = { 'Select Civil Status' }
                      inputArray = { civilStatusArray }
                      selectedArray = { (civilStatusId, civilStatus) =>
                        this.setState({
                          civilStatusId,
                          civilStatus,
                          civilStatusErrorMessage: '',
                          showCivilStatusModal: false })
                      }
                      onClose = { () => this.setState({ showCivilStatusModal: false }) }
                    />
                  }
                  <div>
                  {
                      updateCivilStatus ?
                      <div className = { 'profile-grid-description align-items-center' }>
                        <div>
                          <GenericInput
                            errorMessage = { civilStatusErrorMessage }
                            text = { 'Civil Status' }
                            onClick = { () =>
                              this.setState({ showCivilStatusModal : true })
                            }
                            value = { civilStatus }
                          />
                        </div>
                        <div>
                          <GenericButton
                            className = { 'align-items-center global-button profile-button-small' }
                            onClick = { () => this.submitCivil() }
                            text = { 'Update' }
                          />
                        </div>
                      </div>
                      :
                      <div className={ 'contact-number-grid' }>
                        <div>
                          <span className={ 'contact-icon-settings employeeCivilStatus' }/>
                        </div>
                        <div className = { 'profile-address-grid-x2' } >
                        <div className={ 'contact-info-grid-row' }>
                          <div className={ 'font-size-17px contact-title' }>
                            <h2>Civil Status</h2>
                          </div>
                          <div className={ 'font-size-16px' }>
                            <a>
                              { profile && profile.civilstatus ?  profile.civilstatus : '(Not Yet Provided)' }
                            </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    }

                  </div>
                  <br/>
                  {
                    !updateAddress ?
                      <div
                        className={ 'contact-number-grid' }>
                        <div>
                          <span className={ 'contact-icon-settings employeeHomeAddress' }/>
                        </div>
                        <div className = { 'profile-address-grid-x2' } >
                          <div className={ 'contact-info-grid-row' }>
                            <div className={ 'font-size-17px contact-title' }>
                              <h2>Address</h2>
                            </div>
                            <div className={ 'font-size-16px' }>
                              <a>
                                { profile && profile.address ?  profile.address : '(Not Yet Provided)' }
                              </a>
                            </div>
                          </div>
                          {
                            // <span
                            //   onClick = { () => this.setState({ updateAddress : true }) }
                            //   className = { 'alignment-center profile-icon-settings editIconImage' }/>
                          }
                        </div>
                      </div> :
                    <Modal
                      isDismisable = { true }
                      onClose = { () => this.setState({ updateAddress : false }) }>
                      <div>
                        <GenericInput
                        text = { 'Address' }
                        onChange = { (e) => this.setState({ addressText : e.target.value }) }
                        />
                        <div className = { 'grid-global-columns-x3' }>
                          <GenericInput
                            text = { 'Country' }
                            onChange = { (e) => this.setState({ countryText : e.target.value }) }
                            />
                          <GenericInput
                            text = { 'Region' }
                            onChange = { (e) => this.setState({ regionText : e.target.value }) }
                            />
                          <GenericInput
                            text = { 'Postal Code' }
                            type = { 'number' }
                            onChange = { (e) => this.setState({ postalCode : e.target.value }) }
                            />
                        </div>
                        <MultipleAttachments
                          fileArray = { attachments }
                          setFile = { (attachments) => this.setState({ attachments }) }
                        />
                      </div>
                      <center className = { 'grid-global' }>
                        <GenericButton
                          className = { 'profile-button-small' }
                          text = { 'Update' }
                          onClick = { () => {
                            const objectParam = {
                              postalCode: postalCode,
                              address: addressText,
                              country: countryText,
                              region: regionText
                            }
                            this.props.updateAddressFunc(objectParam, attachments)
                            this.setState({ updateAddress : false })
                          } }
                        />
                        <GenericButton
                          className = { 'update-profile-button' }
                          text = { 'Close' }
                          onClick = { () => this.setState({ updateAddress : false }) }
                        />
                      </center>
                    </Modal>
                  }
                </div>
              </div>
            </div>
            <div>
              <h2 className={ 'unionbank-color-grey font-weight-normal padding-profileFragment-name' }>
                Company Information
              </h2>
              <br/>
              <div className={ 'contact-info-grid' }>
                <div
                  className={ 'contact-number-grid' }>
                  <div>
                    <span className={ 'contact-icon-settings employeeWorkClass' }/>
                  </div>
                  <div className={ 'contact-info-grid-row' }>
                    <div className={ 'font-size-17px contact-title' }>
                      <h2>Work Class </h2>
                    </div>
                    <div className={ 'font-size-16px' }>
                      <a>
                        { profile.workClass ?  profile.workClass : '(Not Yet Provided)' }
                      </a>
                    </div>
                  </div>
                </div>
                <br/>
                <div
                  className={ 'contact-number-grid' }>
                  <div>
                    <span className={ 'contact-icon-settings employeeRank' }/>
                  </div>
                  <div className={ 'contact-info-grid-row' }>
                    <div className={ 'font-size-17px contact-title' }>
                      <h2>Rank </h2>
                    </div>
                    <div className={ 'font-size-16px' }>
                      <a>
                        { rank ?  rank : '(Not Yet Provided)' }
                      </a>
                    </div>
                  </div>
                </div>
                <br/>
                <div
                  className={ 'contact-number-grid' }>
                  <div>
                    <span className={ 'contact-icon-settings employeeLineManager' }/>
                  </div>
                  <div className={ 'contact-info-grid-row' }>
                    <div className={ 'font-size-17px contact-title' }>
                      <h2>Line Manager</h2>
                    </div>
                    <div className={ 'font-size-16px' }>
                      <a>
                        { lineManager ? lineManager : '(Not Yet Provided)' }
                      </a>
                    </div>
                  </div>
                </div>
                <br/>
                <div
                  className={ 'contact-number-grid' }>
                  <div>
                    <span className={ 'contact-icon-settings employeeLocation' }/>
                  </div>
                  <div className={ 'contact-info-grid-row' }>
                    <div className={ 'font-size-17px contact-title' }>
                      <h2>Address</h2>
                    </div>
                    <div className={ 'font-size-16px' }>
                      <a>
                        { profile && profile.location ?  profile.location : '(Not Yet Provided)' }
                      </a>
                    </div>
                  </div>
                </div>
                <br/>
                <div
                  className={ 'contact-number-grid' }>
                  <div>
                    <span className={ 'contact-icon-settings employeeDateHired' }/>
                  </div>
                  <div className={ 'contact-info-grid-row' }>
                    <div className={ 'font-size-17px contact-title' }>
                      <h2>Date Hired</h2>
                    </div>
                    <div className={ 'font-size-16px' }>
                      <a>
                        { profile && profile.dateHired ?  profile.dateHired : '(Not Yet Provided)' }
                      </a>
                    </div>
                  </div>
                </div>
                <br/>
                <div
                  className={ 'contact-number-grid' }>
                  <div>
                    <span className={ 'contact-icon-settings employeeRegularizationDate' }/>
                  </div>
                  <div className={ 'contact-info-grid-row' }>
                    <div className={ 'font-size-17px contact-title' }>
                      <h2>Regularization Date</h2>
                    </div>
                    <div className={ 'font-size-16px' }>
                      <a>
                        { profile && profile.regularizationDate ?  profile.regularizationDate : '(Not Yet Provided)' }
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

PersonalInfoFragment.propTypes={
}

export default PersonalInfoFragment
