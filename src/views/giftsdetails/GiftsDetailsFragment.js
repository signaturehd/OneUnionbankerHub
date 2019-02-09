import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/GiftDetailsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'

import './styles/giftDetails.css'

import { CircularLoader, Line, GenericButton } from '../../ub-components/'

import NoDataListedComponent from '../common/components/NoDataListedComponent'
import GiftDetailsBannerComponent from './components/GiftDetailsBannerComponent'
import GiftDetailsEgiftComponent from './components/GiftDetailsEgiftComponent'
import GiftDetailsAboutComponent from './components/GiftDetailsAboutComponent'
import GiftDetailsFooterComponent from './components/GiftDetailsFooterComponent'
import GiftDetailsMapComponent from './components/GiftDetailsMapComponent'

class GiftsDetailsFragment extends BaseMVPView {
	constructor (props) {
		super(props)
		this.state = {
			loader : false,
		}
	}

	componentDidMount () {
    const id = this.props.match.params.id
    this.presenter.getRewardGiftsDetails(id)
	}

	circularLoader (loader) {
		this.setState({ loader })
	}

	setRewardGiftsDetails (rewardDetails) {
		this.setState({ rewardDetails })
	}

	render () {
		const { history } = this.props
		const { loader, rewardDetails } = this.state

		return (
			<div>
				{
					loader ?
					<CircularLoader
						validateLoading = { true }
						show = { loader }/>
					:
					<div>
						<GiftDetailsBannerComponent
							tagline = { rewardDetails && rewardDetails.tagline }
							name = { rewardDetails && rewardDetails.name }
							category = { rewardDetails && rewardDetails.category }
							locations = { rewardDetails && rewardDetails.locations }
						/>
						<GiftDetailsEgiftComponent
							denominations = { rewardDetails && rewardDetails.denominations }
						/>
						<GiftDetailsAboutComponent
							name = { rewardDetails && rewardDetails.name }
							writeup = { rewardDetails && rewardDetails.writeup }
							recommendations = { rewardDetails && rewardDetails.highlights }
						/>
						<GiftDetailsFooterComponent
							name = { rewardDetails && rewardDetails.name }
							writeup = { rewardDetails && rewardDetails.writeup }
							recommendations = { rewardDetails && rewardDetails.highlights }
						/>
					</div>
				}
			</div>
		)
	}
}

GiftsDetailsFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
}

export default ConnectView(GiftsDetailsFragment, Presenter)
