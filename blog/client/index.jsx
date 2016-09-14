/**
 * Created by caozheng on 2016/9/2.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
import '{public}/css/index.scss';
import React, { Component } from 'react';
import {Provider } from 'react-redux';
import AppRouter from './router';
import helloStore from './redux/stores/helloStore';
import {syncHistoryWithStore,routerReducer } from 'react-router-redux';
import {browserHistory } from 'react-router';

const history = syncHistoryWithStore(browserHistory, helloStore, {
    selectLocationState (state) {
        return state.get('routing') ;
    }
});
class Root extends Component{
    render (){
        return(
            <Provider store ={helloStore}>
                <AppRouter history={history}/>
            </Provider>
        )
    }

}
ReactDOM.render(<Root/>,document.getElementById('wrapper'));
