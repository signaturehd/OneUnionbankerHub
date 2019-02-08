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
			filterTitle : 'everything',
			selectedCard : false
		}
	}

	componentDidMount () {
    this.presenter.getRewardGifts()
	}

	setRewardGifts (rewardGifts) {
		this.setState({ rewardGifts })
	}

	setCategoryTypeList (rewardGiftsType) {
		this.setState({ rewardGiftsType })
	}

	circularLoader (loader) {
		this.setState({ loader })
	}

	render () {
		const {
			rewardGifts,
			loader,
			rewardGiftsType,
			filterTitle,
			selectedCard
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
									<div
										onClick = { () => {
											this.setState({ selectedCard: true })
									 	} }
										onMouseLeave = { () => {
											this.setState({ selectedCard: false })
										} }
										className={ 'flip' }>
						        <div className={ `card ${ selectedCard && 'flipped' }` }>
					            <div className={ `face front` }>
					                Front
					            </div>
					            <div className={ `face back` }>
					                Back
					            </div>
						        </div>
							    </div>
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
									<GiftsListComponent
										filterTitle = { filterTitle }
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
