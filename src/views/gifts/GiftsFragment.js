import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/GiftsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import './style/GiftsStyle.css'
import { CircularLoader, Line } from '../../ub-components/'

import GiftsBanner from './components/GiftsBanner'
import GiftsListComponent from './components/GiftsListComponent'

class GiftsFragment extends BaseMVPView {
	constructor (props) {
		super(props)
		this.state = {
			loader : false,
		}
	}

	componentDidMount () {
    this.presenter.getRewardGifts()
	}

	setRewardGifts (rewardGifts) {
		this.setState({ rewardGifts })
	}

	setCategoryTypeList (rewardGiftsType) {
		console.log(rewardGiftsType)
		this.setState({ rewardGiftsType })
	}

	circularLoader (loader) {
		this.setState({ loader })
	}

	render () {
		const {
			rewardGifts,
			loader,
			rewardGiftsType
		} = this.state

		return (
			<div>
				<div className={ 'gifts-container' }>
					<center>
						<div className={ 'gifts-main-item1' }>
							<GiftsBanner/>
						</div>
						<div className={ 'gifts-main-item2' }>
						</div>
						<div className={ 'gifts-main-item3' }>
						{
							loader ?
							<CircularLoader
								show = { loader }
								validateLoading = { true }
								/>
							:
							<div className = { 'gifts-grid-columnt-3x' }>
								<div></div>
								<div>
									<br/>
									<div style = {{
											display: 'flex',
											textAlign: 'center',
											margin: 'auto',
										}}>
										{
											rewardGiftsType &&
											rewardGiftsType.map((resp, key) =>
												<h4 className = { ' gifts-header-style' }>{resp}</h4>
											)
										}
									</div>
									<br/>
									<Line />
									<br/>
									<br/>
									<center>
										<br/>
										<h4 className = { 'gifts-title-feature' }>Features</h4>
										<br/>
									</center>
									<GiftsListComponent
										rewardGifts = { rewardGifts }
									/>
								</div>
								<div></div>
							</div>
						}
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
