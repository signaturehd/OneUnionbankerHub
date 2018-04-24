import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import LibraryView from '../library/LibraryView'
import BenefitsPartial from '../benefits/BenefitsPartial'
import NewsView from '../news/NewsView'
import Presenter from './presenter/DrawerPresenter'
import { AppBar } from './components/appbar/AppBar'
import { SideBar } from './components/sidebar/SideBar'
import { Drawer } from './components/drawer/Drawer'
import './styles/drawerview.css'

class NavigationView extends BaseMVPView {
  constructor (props) {
    super (props)
  }
  render () {
    const displayShow = 'isActive'
    const display = { display : 'block' }
      return (
        <div className = { 'grid-1' }>
          <div className = { '_drawer-header'}>
            <AppBar></AppBar>
          </div>
          <div className = { '_drawer-sidebar' }
               style = { display }>
            <SideBar
              onNavigaionClick = { path => this.props.history.push(path) } ></SideBar>
          </div>
          <div className = { '_drawer-main' }>
            { super.render() }
            <div className = { '_dynamic-component' }>
                <Drawer>
                  <Switch>
                    <Route path = '/benefits' render = { props => <BenefitsPartial { ...props } />}/>
                     <Route path = '/news' render = { props => <NewsView { ...props } />} />
                     <Route path = '/transactions' render = { props => <TransactionView { ...props } />} />
                     <Route path = '/faqs' render = { props => <Faqs { ...props } />} />
                     <Route path = '/settings' render = { props => <Settings { ...props } />} />
                     <Route path = '/books' render = { props => <LibraryView { ...props } />} />
                 </Switch>
                </Drawer>
            </div>
          </div>
        </div>
    )
  }
}

export default ConnectView(NavigationView, Presenter)
