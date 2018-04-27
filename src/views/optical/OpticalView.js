import React from 'react'
import BaseView from '../common/base/BaseView'
import { GenericTextBox } from '../../ub-components/TextBox/'
import Uploader from '../../ub-components/FileUploader/Uploader'
import OpticalPresenter from './presenter/OpticalPresenter'
import GenericButton from '../../ub-components/UButton/GenericButton'
import HRBenefitsService from '../data/service/HRBenefitsService'

class OpticalView extends BaseView {
 // constructor (props) {
 // super(props)
  // this.state = {
   // showOptical: []
 // }
// }
 // componentDidMount () {
  // this.presenter.addOptical()
 // }

 // showOptical (optical) {
  // this.setState({ showOptical:optical })
 // }
 constructor (props) {
  super(props)
  this.handleSubmit = this.handleSubmit.bind(this)
 }

 handleSubmit (event) {
  event.preventDefault()
 }

    render () {
     // const { showOptical } = this.state
        return (
         <form onSubmit={this.handleSubmit}>
            <div>
             <GenericTextBox type="text" ref={input => this.input = input}
              placeholder = { 'Amount' } />
             <Uploader/>
             <Uploader/>
             <input type ="submit" value="SUBMIT" />
             </div>
         </form>

        )
}
}
export default (OpticalView)