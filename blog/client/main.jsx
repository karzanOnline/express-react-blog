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
import Header from './header';
/*left nav content*/
import NavContent from './navContent';
import '{public}/css/main.scss'


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
                <nav>
                    <NavContent/>
                    <QueueAnim>
                        <div style={{margin:'40px 0'}}>
                        {
                            props.routerState==1?(
                                <div>
                                    <span><Link activeClassName='active' key="1" title="主页" to="/index">主页</Link></span>
                                    <span><Link activeClassName='active' key="2" title="个人信息" to="/info">个人信息</Link></span>
                                    <span><Link activeClassName='active' key="3" title="文章" to="/post">文章</Link></span>
                                    <span><a key="4" onClick={this.exitBlog.bind(this)} >退出</a></span>
                                </div>
                            ):(
                                <div>
                                    <span><Link activeClassName='active' key="1" title="主页" to="/index">主页</Link></span>
                                    <span><Link activeClassName='active' key="2" title="登陆" to="/login">登陆</Link></span>
                                    <span><Link activeClassName='active' key="3" title="注册" to="/register">注册</Link></span>
                                </div>
                            )
                        }
                        </div>
                    </QueueAnim>
                </nav>
                <article className="main-article">
                    <div>
                      {/*  <Header {...props.location}/>*/}
                        <QueueAnim type={['right', 'left']} className="router-wrap">
                            <div className="article-inner">
                                {React.cloneElement(props.children)} 
                            </div>
                        </QueueAnim>
                    </div>
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
