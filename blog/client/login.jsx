/**
 * Created by caozheng on 2016/9/7.
 */
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
/*这个页面所用到的事件集合*/
//TODO 这里需要修改
import {submitLogin,submitStart} from './redux/actions/helloAction';
import {browserHistory} from 'react-router';



// import {Component} from 'react';
class Login extends React.Component{
    constructor(props){
        super(props)
        
    }


    componentDidMount (){

    }

    submitLogin(event){
        event.preventDefault();
        // browserHistory.push('/index')

        let {dispatch} = this.props.route,
            obj = {
                d:JSON.stringify({
                    name : this.refs.user_name.value,
                    password : this.refs.user_pass.value
                })
            };
        dispatch(submitLogin(obj));
    }

    componentWillReceiveProps (props){
        debugger;

    }


    render (){
        console.log(this.props);
        return(
            <QueueAnim interval={100} duration={1500}>
            <div>{this.props.submitReduce&&this.props.submitReduce.get('submitState').toString()}</div>
            <div>{this.props.submitReduce.get('data').toString()}</div>
            {this.state&&this.state.submitReduce}
            <div key="1" className="form-style">
                <div className="item-input">
                    <span>用户名：</span>
                    <input type="text"
                           placeholder="请输入用户名"
                           ref="user_name"
                           name="name"/>
                </div>
                <div className="item-input">
                    <span className="item-pass">密码：</span>
                    <input type="password"
                           placeholder="请输入密码"
                           ref="user_pass"
                           name="password"/>
                </div>
                <div className="item-input">
                    <button onClick={this.submitLogin.bind(this)} className="submit-button">提交</button>
                </div>
            </div>
           </QueueAnim>
        )
    }

}

function mapStateToProps(state,history) {
    //从服务端获取数据后 跳转router
    if(state.getIn(['submitReduce','data','success'])){
        history.route.dispatch(submitStart())
        browserHistory.push('/index')
    }

    return {
        submitReduce : state.get('submitReduce')
    }
    
}

export default connect(mapStateToProps)(Login)
