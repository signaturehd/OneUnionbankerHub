import React from 'react'
import BaseMVPView from '../common/base/BaseMVPView'
import { GenericTextBox } from '../../ub-components/TextBox/'


class OpticalView extends BaseMVPView {
    render () {
        return (

            <div>
                <GenericTextBox
                placeholder = { 'Amount' }
                type = { 'text' }/>
            </div>


        )
}
}
export default (OpticalView)