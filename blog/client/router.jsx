/**
 * Created by caozheng on 2016/9/8.
 */
import {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { Route, Router, browserHistory ,IndexRoute } from 'react-router';
//各种路由组件引入
import Main from './main';
import Login from './login';
import Post from './post';
import Register from './register';
import PostIndex from './postIndex';
import EditInfo from './editInfo';
import UserPost from './userPost';
import MainArticle from './mainArticle';
import Catalog from './catalog';

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
                        <Route path="u/:paramName" component={UserPost} title ="个人文章"/>
                        <Route path="aticle" component ={MainArticle} title="单篇文章"/>
                        <Route path="catalog" component ={Catalog} title="文章目录"/>
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
