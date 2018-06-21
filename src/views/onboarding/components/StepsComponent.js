import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles/boarding-styles.css'

class Stepper extends Component {
  constructor () {
    super()

    this.state = { activeStep: 0 }
  }


  handleStepChange (activeStep) {
    this.setState({ activeStep })
  }

  nextStep () {
    if (this.state.activeStep < this.props.steps.length - 1) {
      this.setState({ activeStep: this.state.activeStep + 1 })
    }
  }

  previousStep () {
    if (this.state.activeStep > 0) {
      this.setState({ activeStep: this.state.activeStep - 1 })
    }
  }

  render () {
    const { steps, onFinish } = this.props
    const { activeStep } = this.state
    const stepIndicators = steps.map((step, i) => (
        <div className={ 'stepper-inner' }
             onClick={() => this.handleStepChange(i) }>
          <div className={ `stepper-number ${ activeStep === i && 'active' }` }>
            <span>{i + 1}</span>
            <div className={ 'line-linkage' }></div>
          </div>
          {
            i !== steps.length &&
              <div className={ 'stepper-label' }>
              { step.label }
              </div>
          }
        </div>
       ))

    return (
      <div className={ 'stepper' }>
        <div className={ 'stepper-indicator' }>
          {stepIndicators}
        </div>
        <div className={ 'stepper-steps' }>
          { steps[activeStep].component }
        </div>
        <div className="stepper-actions">
          <button
            className= 'genericbutton'
            onClick={ () => this.previousStep() }>
            Previous
          </button>
          {
            activeStep === steps.length - 1 ?
              <button
                className={ 'genericbutton' }
                disabled={ !!steps[activeStep].exitValidation }
                onClick={ onFinish }>
                Submit
              </button> :
              <button
                className={ 'genericbutton' }
                disabled={ !!steps[activeStep].exitValidation }
                onClick={ () => this.nextStep() }>
                Next
              </button>
          }
        </div>
      </div>
    )
  }
}

export default Stepper
