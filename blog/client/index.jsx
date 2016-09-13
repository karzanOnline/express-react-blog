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

console.log(helloStore);
console.log('log from index jsx');

class Root extends Component{
    render (){
        return(
            <Provider store ={helloStore}>
                <AppRouter/>
            </Provider>
        )
    }

}
ReactDOM.render(<Root/>,document.getElementById('wrapper'));
