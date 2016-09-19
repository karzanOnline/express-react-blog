/**
 * Created by caozheng on 2016/9/8.
 */
import {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import Pubsub from './pubsub';
import LinkPage from './common/linkPage';
import LINK_PAGE_DATA from './common/linkData';

class Main extends Component{
    constructor(props){
        super(props);
        this.state ={
            linkData : ''
        };
        console.log('from main constructor');
        console.log(this.props)
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

    // componentWillUpdate (){
    //     console.log(12343)
    // }


    getTitleName (){
        let _this = this,
            route = _this.props.location.pathname;
        switch (route){
            case '/' :{return '主页'}
            case '/index':{return '主页'}
            case '/post' :{return '文章'}
            case '/login' :{return  '登陆'}
            case '/register':{return '注册'}
            default:{return '未知'}
        }

    }

    //刚进入网页所拥有权限 主页(1) 登录(4) 注册(5)
    //登录后所拥有权限  主页(1) 文章(2) 退出(3)
    render (){
        const props = this.props;
        //console.log(props)
        return(
            <div>
                <header>
                    <h1>{this.getTitleName()}</h1>
                </header>
                <nav>
                    <QueueAnim>
                        {/*<LinkPage linkString={this.state.linkData}/>*/}
                        <span><Link key="1" title="主页" to="/index">主页</Link></span>
                        <span><Link key="2" title="文章" to="/post">文章</Link></span>
                        <span><Link key="3" title="退出" to="/">退出</Link></span>
                        <span><Link key="4" title="登陆" to="/login">登陆</Link></span>
                        <span><Link key="5" title="注册" to="/register">注册</Link></span>
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
    return {
        mainState : ''
    }

}
export default connect(mapStateToProps)(Main)
