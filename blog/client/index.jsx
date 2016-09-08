/**
 * Created by caozheng on 2016/9/2.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';
import '{public}/css/index.scss';
import React, { Component } from 'react'
import AppRouter from './router';
class Root extends Component{
    render (){
        return(
            <div>
                <AppRouter/>
            </div>
        )
    }

}
ReactDOM.render(<Root/>,document.getElementById('wrapper'));
