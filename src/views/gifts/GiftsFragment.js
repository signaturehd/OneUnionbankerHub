import React from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter/GiftsPresenter'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import './style/GiftsStyle.css'
import { CircularLoader, Line, GenericButton } from '../../ub-components/'

import NoDataListedComponent from '../common/components/NoDataListedComponent'
import GiftsBanner from './components/GiftsBanner'
import GiftsListComponent from './components/GiftsListComponent'

class GiftsFragment extends BaseMVPView {
	constructor (props) {
		super(props)
		this.state = {
			loader : false,
			filterTitle : 'everything',
			rewardGiftsId : [],
		}
	}

	componentDidMount () {
    this.presenter.getRewardGifts()
	}

	setRewardGifts (rewardGifts) {
		this.getGiftsId(rewardGifts)
		this.setState({ rewardGifts })
	}

	getGiftsId (gifts) {
		try {
			let listId = [...this.state.rewardGiftsId]
			gifts && gifts.map((resp) => {
				listId.push(resp.id)
			})
			this.setState({ rewardGiftsId : listId })
		} catch (e) {
			 console.log(e)
		}
	}

	setCategoryTypeList (rewardGiftsType) {
		this.setState({ rewardGiftsType })
	}

	circularLoader (loader) {
		this.setState({ loader })
	}

	render () {
		const { history } = this.props
		const {
			rewardGifts,
			rewardGiftsId,
			loader,
			rewardGiftsType,
			filterTitle,
		} = this.state

		return (
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
								<div>
									{
										filterTitle.toLowerCase() === 'everything' ?
										<div
											style = {{
													display: 'flex',
													textAlign: 'center',
													margin: 'auto',
												}}>
											{
												rewardGiftsType &&
												rewardGiftsType.map((resp, key) =>
													<h4
														onClick = { () => this.setState({ filterTitle : resp }) }
														className = { 'cursor-pointer gifts-header-style' }>{resp}</h4>
												)
											}
										</div> :
										<div
											style = {{
													display: 'flex',
													textAlign: 'center',
													margin: 'auto',
												}}>
											{
												rewardGiftsType &&
												rewardGiftsType.map((resp, key) =>
												resp.category.toLowerCase() === filterTitle.toLowerCase() &&
												<h4
													onClick = { () => this.setState({ filterTitle : resp }) }
													className = { 'cursor-pointer gifts-header-style' }>{resp}</h4>
												)
											}
										</div>
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
				        {
									rewardGifts &&
				          rewardGifts.length !== 0 ?
									<div>
										{
											filterTitle.toLowerCase() === 'everything' ?
											<div className = { 'gifts-grid-x4' }>
							          {
													rewardGifts.map((resp, key) =>
														<GiftsListComponent
															rewardGiftsId = { rewardGiftsId }
															resp = { resp }
														/>
													)
												}
											</div> :
											<div className = { 'gifts-grid-x4' }>
							          {
													rewardGifts.map((resp, key) =>
														resp.category.toLowerCase() === filterTitle.toLowerCase() &&
														<GiftsListComponent
															rewardGiftsId = { rewardGiftsId }
															resp = { resp }
														/>
													)
												}
											</div>
										}
									</div>
									:
									<NoDataListedComponent
										text = { 'No Reward/s' }
										/>
								}
							</div>
							<div></div>
						</div>
					}
					</div>
			  </center>
			</div>

		)
	}
}

GiftsFragment.propTypes = {
	setSelectedNavigation: PropTypes.func,
	profileHasCOC: PropTypes.boolean,
}

export default ConnectView(GiftsFragment, Presenter)
