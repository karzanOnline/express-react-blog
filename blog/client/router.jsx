/**
 * Created by caozheng on 2016/9/8.
 */
import {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { Route, Router, browserHistory ,IndexRoute } from 'react-router';
import Main from './main';
import Login from './login';
import Post from './post';
import Register from './register';
import PostIndex from './postIndex';

class AppRouter extends Component{
    constructor(props) {
        super(props);
        console.log(this.props);
        console.log('router')
    }

    render (){
        const history = this.props.history;
        console.log(history);
        return(
            <QueueAnim interval={100} duration={1500}>
                <Router history={history} >
                    <Route path="/" {...this.props} component={Main} ignoreScrollBehavior>
                        <IndexRoute component={PostIndex} title = "主页"/>
                        <Route path="index" component={PostIndex} title="主页"/>
                        <Route path="login" {...this.props} component={Login} title="登陆"/>
                        <Route path="post" component={Post} title="发表文章" />
                        <Route path="register" component={Register} title="注册" />
                    </Route>
                </Router>
                </QueueAnim>
            )
    }

}
function select(state) {
    //console.log(state.submitReduce.submitState);
    return{
        submitState : state.get('submitReduce').get('submitState')
    }
}
export default connect(select)(AppRouter)
