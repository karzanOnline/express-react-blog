/**
 * Created by caozheng on 2016/9/23.
 */
import { connect } from 'react-redux';

class Header extends React.Component{
    constructor (props){
        super(props);
    }

    getTitleName(){
        let _this = this,
            route = _this.props.pathname;
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

    render (){
        return (
            <header>
                <h1>{this.getTitleName()}</h1>
            </header>
        )
    }
}

export default connect()(Header);