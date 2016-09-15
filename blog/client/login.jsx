/**
 * Created by caozheng on 2016/9/7.
 */
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
/*这个页面所用到的事件集合*/
//TODO 这里需要修改
import {submitLogin} from './redux/actions/helloAction';



// import {Component} from 'react';
class Login extends React.Component{
    constructor(props){
        super(props)
        console.log('login ');
        console.log(this.props)
        this.state={
            submitState : false
        }
    }


    componentDidMount (){

    }

    submitLogin(){

        let {dispatch} = this.props.route,
            obj = {
                d:JSON.stringify({
                    name : this.refs.user_name.value,
                    password : this.refs.user_pass.value
                })
            };
        dispatch(submitLogin(obj))
    }


    render (){
        return(
            <QueueAnim interval={100} duration={1500}>
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

function mapStateToProps(state) {
    return{
        submitState : state.submitState
    }
}
function mapDispatchToProps(dispatch) {
    return{
        submitReduce : ()=>{
            dispatch(submitReduce())
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
