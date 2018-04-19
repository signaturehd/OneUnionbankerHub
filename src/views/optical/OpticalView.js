import React from 'react'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectPartial from '../../utils/ConnectPartial'



class OpticalView extends BaseMVPView {
    render () {
        return (
            <div className={'Uploader'}> </div>

        )
}
}
export default ConnectPartial(OpticalView)