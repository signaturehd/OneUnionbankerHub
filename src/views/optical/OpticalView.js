import React from 'react'
import BaseView from '../common/base/BaseView'
import { GenericTextBox } from '../../ub-components/TextBox/'
import Uploader from '../../ub-components/FileUploader/Uploader'


class OpticalView extends BaseView {
    render () {
        return (

            <div>
             <form>
             <GenericTextBox
              placeholder = { 'Amount' }
              type = { 'text' }/>
             <Uploader/>
             <Uploader/>

             <input type="submit" value="submit"/>



         </form>
             </div>



        )
}
}
export default (OpticalView)