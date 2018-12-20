import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton} from '../../../ub-components/'

import './styles/modalStyle.css'

class MaternityOptionModal extends Component {
  constructor (props) {
    super (props)
  }

  checkGender (gender) {
    const data = gender && gender
    if(data.toLowerCase() === 'f') {
      return false
    } else if (data.toLowerCase() === 'm') {
      return true
    } else if (data.towLowerCase() === 'female') {
      return false
    } else if (data.towLowerCase() === 'male') {
      return true
    }
  }

  render () {

    const femaleRequirements = [{
      id: 0,
      name: `Certified True Copy of Child's Birth Certificate with local civil registry numbers`,
    },{
      id: 1,
      name: 'Marriage Certificate (if applicable)',
    },{
      id: 2,
      name: 'SSS Complete Obstetrical History',
    },{
      id: 3,
      name: 'SSS MAT-2 Reimbursement Form',
    },{
      id: 4,
      name: 'SSS Digitized ID or UMID ID or 2 Valid IDs (photocopy front & back)',
    },{
      id: 5,
      name: 'Print-out Contribution List from SSS Online Inquiry ER ID: 0339677007',
    },{
      id: 6,
      name: 'Statement of Account',
    },{
      id: 7,
      name: 'Official Receipt of the Hospital Bill and Professional Fee',
    }]

    const femaleRequirementsMiscarriage = [{
      id : 0,
      name: 'SSS Sickness Notification Form'
    }, {
      id : 1,
      name : 'Certified True Copy of Operating Room Record from Hospital'
    }, {
      id: 2,
      name : 'Certified True Copy of D&C Histopathological Report'
    }]

    const maleRequirements = [{
      id: 0,
      name: `Certified True Copy of Child's Birth Certificate with local civil registry numbers`,
    }, {
      id: 1,
      name: 'Marriage Certificate',
    }]

    const maleRequirementsMiscarriage = [{
      id : 0,
      name: 'SSS Sickness Notification Form'
    }, {
      id: 1,
      name : 'Certified True Copy of Operating Room Record from Hospital'
    }, {
      id : 2,
      name : 'Certified True Copy of D&C Histopathological Report'
    }]

    const {
      showConfirmationModalFunc,
      navigateMedical,
      showMoreText,
      showMoreCheck,
      showMoreTextFunc,
      showMoreCheckFunc,
      gender
    } = this.props

    return (
      <Modal>
        <div>
          <h4
            className = { 'text-align-center font-size-16px font-weight-lighter'  }>
            We&#39;d like to help you in your labor expenses but this benefit requires post-submission of multiple documents. Would you like to proceed?</h4>
          <br/>
          <div>
            <div className = { 'medical-scheduling-grid-option' }>
              <h2 className = { 'font-weight-normal font-size-14px ' }>List of requirements * </h2>
            <div className = { 'text-align-right' }>
                <GenericButton
                  className = { 'profile-button-small' }
                  text = { showMoreText }
                  onClick = { () => {
                    showMoreCheckFunc(showMoreCheck !== true ? true : false)
                    showMoreTextFunc(showMoreText !== 'View requirements'? 'View requirements' : 'hide')
                  } }
                />
              </div>
            </div>
            {
              showMoreCheck &&
              <div>
                {
                  this.checkGender(gender) ?
                  <div>
                    <h2 className = { 'font-weight-bold font-size-14px' }>Male</h2>
                    {
                      maleRequirements.map(resp =>
                        <h4 className = { 'font-size-12px font-weight-lighter' }>&#8226; { '  '+resp.name }</h4>
                      )
                    }
                    <br/>
                  <h2 className = { 'font-weight-normal font-size-13px' }>Additional Requirements if Miscarriage:</h2>
                    {
                      maleRequirementsMiscarriage.map(resp =>
                        <h4 className = { 'font-size-12px font-weight-lighter' }>&#8226; { '  '+resp.name }</h4>
                      )
                    }
                  </div>
                  :
                  <div>
                    <br/>
                    <h2 className = { 'font-weight-bold font-size-14px' }>Female</h2>
                      {
                        femaleRequirements.map(resp =>
                          <h4 className = { 'font-size-12px font-weight-lighter' }>&#8226; { '  '+resp.name }</h4>
                        )
                      }
                    <br/>
                  <h2 className = { 'font-weight-normal font-size-13px' }>Additional Requirements if Miscarriage:</h2>
                    {
                      femaleRequirementsMiscarriage.map(resp =>
                        <h4 className = { 'font-size-12px font-weight-lighter' }>&#8226; { '  '+resp.name }</h4>
                      )
                    }
                    <br/>
                  </div>
                }
              </div>
            }
          </div>
          <br/>
          <div className = { 'grid-global' }>
            <GenericButton
              className = { 'profile-button-small' }
              text = { 'Cancel' }
              onClick = { () => {
                showConfirmationModalFunc(false)
              } }
              />
            <GenericButton
              onClick = { () => {
                showConfirmationModalFunc(true)
                navigateMedical()
                }
              }
              className  = { 'profile-button-small' }
              text = { 'Proceed' }/>
          </div>
        </div>
      </Modal>
    )
  }
}


MaternityOptionModal.propTypes = {
}

export default MaternityOptionModal
