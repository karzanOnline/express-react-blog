/**
 * Created by caozheng on 2016/9/8.
 */
import {Component} from 'react';
import {Link} from 'react-router';
export default class Main extends Component{
    constructor(props){
        super(props)
    }

    render (){
        return(
            <div>
                <nav>
                    <span><Link title="主页" to="/">主页</Link></span>
                    <span><Link title="发表" to="/post">文章</Link></span>
                    <span><Link title="登出" to="/logout">退出</Link></span>
                    <span><Link title="登录" to="/login">登录</Link></span>
                    <span><Link title="注册" to="/reg">注册</Link></span>
                </nav>

                <article>
                    {this.props.children}
                </article>

            </div>

        )
    }
}
