/**
 * Created by caozheng on 2016/9/8.
 */
import {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Pubsub from './pubsub';
import {browserHistory } from 'react-router';
import {getAuthority} from './redux/actions/authority';


class Main extends Component{
    constructor(props){
        super(props);
    }

    /*
    * 关于权限 有node 在ejs返回权限列表
    * 进来之后就只需要判断一次即可
    * 第二次判断是在退出登录退出登录时用pubsub通知父组件
    *
    * */
    componentDidMount (){
        // pageAuthor = pageAuthor.value.split(',').map((item,index)=>{
        //     return LINK_PAGE_DATA[item]
        // });
        // console.log(pageAuthor);
        // this.setState({
        //     linkData : pageAuthor||''
        // });
        // Pubsub.subscribe('author',function () {
        //
        // })
    }


    getTitleName (){
        let _this = this,
            route = _this.props.location.pathname;
        switch (route){
            case '/' :{return '主页'}
            case '/index':{return '主页'}
            case '/post' :{return '文章'}
            case '/login' :{return  '登陆'}
            case '/register':{return '注册'}
            case '/info' :{return '个人信息'}
            default:{return '未知'}
        }
    }

    exitBlog (){
        let {dispatch} = this.props.route;
        $.post('/exit',{},(data)=>{
            if (data.success){
                dispatch(getAuthority(2));
                browserHistory.push('/index')
            }else{
                alert(data.description)
            }
        },'json')

    }

    //刚进入网页所拥有权限 主页(1) 登录(4) 注册(5)
    //登录后所拥有权限  主页(1) 文章(2) 退出(3)
    render (){
        const props = this.props;
        return(
            <div>
                <header>
                    <h1>{this.getTitleName()}</h1>
                </header>
                <nav>
                    <QueueAnim>
                        {
                            props.routerState==1?(
                                <div>
                                    <span><Link key="1" title="主页" to="/index">主页</Link></span>
                                    <span><Link key="2" title="个人信息" to="/info">个人信息</Link></span>
                                    <span><Link key="3" title="文章" to="/post">文章</Link></span>
                                    <span><a key="4" onClick={this.exitBlog.bind(this)} >退出</a></span>
                                </div>
                            ):(
                                <div>
                                    <span><Link key="1" title="主页" to="/index">主页</Link></span>
                                    <span><Link key="2" title="登陆" to="/login">登陆</Link></span>
                                    <span><Link key="3" title="注册" to="/register">注册</Link></span>
                                </div>
                            )
                        }
                        {/*<span><Link key="1" title="主页" to="/index">主页</Link></span>
                        <span><Link key="2" title="文章" to="/post">文章</Link></span>
                        <span><Link key="3" title="退出" to="/">退出</Link></span>
                        <span><Link key="4" title="登陆" to="/login">登陆</Link></span>
                        <span><Link key="5" title="注册" to="/register">注册</Link></span>*/}
                    </QueueAnim>
                </nav>

                <article>
                    <QueueAnim type={['right', 'left']} className="router-wrap">
                        {React.cloneElement(props.children)}
                    </QueueAnim>
                </article>

            </div>

        )
    }
}
function mapStateToProps(state) {

    // if (document.getElementById('user').value){
    //     routerState = 1
    // }
    return {
        routerState : state.getIn(['getAuthority','routerState'])
    }

}
export default connect(mapStateToProps)(Main)
