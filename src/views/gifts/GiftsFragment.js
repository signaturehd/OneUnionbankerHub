import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/GiftsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import './style/GiftsStyle.css'

import GiftsBanner from './components/GiftsBanner'

class GiftsFragment extends BaseMVPView {
	constructor (props) {
	super(props)
	}

	componentDidMount () {
    this.presenter.getRewardGifts()
	}

	setRewardGifts (rewardGifts) {
		this.setState({ rewardGifts })
	}

	render () {

		return (
			<div>
				<div className={ 'gifts-container' }>
					<center>
						<div className={ 'gifts-main-item1' }>
							<GiftsBanner/>
						</div>
						<div className={ 'gifts-main-item2' }>
							x
						</div>
						<div className={ 'gifts-main-item3' }>
							x
						</div>
				  </center>
				</div>
			</div>

		)
	}
}

GiftsFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
}

export default ConnectView(GiftsFragment, Presenter)
