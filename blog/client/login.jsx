/**
 * Created by caozheng on 2016/9/7.
 */
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
/* 这个页面所用到的事件集合*/
// TODO 这里需要修改
import { submitLogin , submitStart } from './redux/actions/helloAction';
import { getAuthority } from './redux/actions/authority';
import { browserHistory } from 'react-router';
import '{public}/css/login.scss';
import { getInfo } from './redux/actions/navContent';
import Alert from './components/src/js/managers/DialogManager';

// import {Component} from 'react';
class Login extends React.Component {
    constructor(props) {
        super(props);
        //绑定引用
        window._this = this;
        this.state = { name: '123' };
    }


    fKedown (e){

        (e.keyCode==13) && (window._this.submitLogin())
    }

    componentDidMount() {

        document.addEventListener('keydown', this.fKedown);
    }

    componentWillUnmount(){

        document.removeEventListener('keydown', this.fKedown)
    }

    submitLogin() {
        // browserHistory.push('/index')
        var name = this.refs.user_name.value,
            password = this.refs.user_pass.value;
        let { dispatch } = this.props,
            obj = {
                d: JSON.stringify({
                    name: this.refs.user_name.value,
                    password: this.refs.user_pass.value,
                }),
            };
        if (!name){
            Alert.alert({
                title:'',
                message:'请输入用户名！'
            });
            setTimeout(function () {
                Alert.clearAll();
            },2000);
            return;
        }
        if(!password){
            Alert.alert({
                title:'',
                message:'请输入密码！'
            });
            setTimeout(function () {
                Alert.clearAll();
            },2000);
            return;
        }
        $.post('/login', obj, (data) => {
            if (data.success) {
                Alert.alert({
                    message:'登陆成功！'
                });
                setTimeout(function () {
                    Alert.clearAll();
                },2000);
                dispatch(getAuthority(1));
                dispatch(getInfo());
                browserHistory.push('/index');
            } else {
                Alert.alert({
                    title:'',
                    message: data.description
                });
            }
        }, 'json');
        // dispatch(submitLogin(obj));
    }

    componentWillReceiveProps(props) {

    }


    render() {
        console.log(this.props);
        return (
            <QueueAnim interval={100} duration={1500}>
            <div key="1" className="form-style">
                <div className="item-input">
                    <span>用户名：</span>
                    <input type="text"
                      placeholder="请输入用户名"
                      ref="user_name"
                      autoComplete="new-password"
                      name="name"
                    />
                </div>
                <div className="item-input">
                    <span className="item-pass">密码：</span>
                    <input type="password"
                      placeholder="请输入密码"
                      ref="user_pass"
                      autoComplete="new-password"
                      name="password"
                    />
                </div>
                <div className="item-input">
                    <button onClick={this.submitLogin.bind(this)} className="submit-button">提交</button>
                </div>
            </div>
           </QueueAnim>
        );
    }

}


// function mapStateToProps(state,history) {
//     //从服务端获取数据后 跳转router
//     debugger;
//     if(state.getIn(['submitReduce','data','success'])){
//         history.route.dispatch(submitStart());
//         browserHistory.push('/index')
//     }
//
//     return {
//         submitReduce : state.get('submitReduce')
//     }
//
// }

export default connect()(Login);
