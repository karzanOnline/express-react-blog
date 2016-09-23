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
import EditInfo from './editInfo';

class AppRouter extends Component{
    constructor(props) {
        super(props);
    
    }

    render (){
        const history = this.props.history;
        //console.log(history);
        return(
            <QueueAnim interval={100} duration={1500}>
                <Router history={history} >
                    <Route path="/" {...this.props} component={Main} ignoreScrollBehavior>
                        <IndexRoute component={PostIndex} title = "主页"/>
                        <Route path="index" component={PostIndex} title="主页"/>
                        <Route path="login" component={Login} title="登陆"/>
                        <Route path="info" component={EditInfo} title="个人信息" />
                        <Route path="post" component={Post} title="发表文章" />
                        <Route path="register" component={Register} title="注册" />
                    </Route>
                </Router>
                </QueueAnim>
            )
    }

}
function mapStateToProps(state) {
    console.log('==========')
    console.log(state)
    return {
        routerState : ''
    }
}
export default connect(mapStateToProps)(AppRouter)
