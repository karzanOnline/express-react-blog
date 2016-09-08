/**
 * Created by caozheng on 2016/9/8.
 */
import {Component} from 'react';
import { Route, Router, browserHistory } from 'react-router';
import Main from './main';
import Login from './login';
import Post from './post';
export default class AppRouter extends Component{
    constructor(props) {
        super(props);
    }

    render (){
        return(
                <Router history={browserHistory}>
                    <Route path="/" component={Main}>
                        <Route path="login" component={Login}/>
                        <Route path="post" component={Post} />
                    </Route>
                </Router>
            )
    }

}
