/**
 * Created by caozheng on 2016/9/8.
 */
import QueueAnim from 'rc-queue-anim';
import { Component } from 'react';
import {browserHistory } from 'react-router';
export default class Login extends Component {
    constructor(props) {
        super(props);
        window._this = this;

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
        const _this = this;
        var name = _this.refs.user_name.value,
            password = _this.refs.user_pass.value,
            passwordRe = _this.refs.user_pass_re.value;
        if(!name){
            alert('请输入用户名！');
            return;
        }
        if(!password){
            alert('请输入密码！');
            return
        }
        if(!passwordRe){
            alert('请输入确认密码！');
            return;
        }
        if(password!==passwordRe){
            alert('两次密码输入不一致,请确认！');
            return;
        }
        const obj = {
            d: JSON.stringify({
                name: name,
                password: password,
                passwordRe: passwordRe,
            }),
        };
        $.post('/reg', obj, (data) => {
            if (data.success) {
                browserHistory.push('/login');
            } else {
                alert(data.description);
            }
        }, 'json');
    }


    render() {
        return (
            <QueueAnim interval={100} duration={1500}>
            <div key="1" className="form-style">
                <div className="item-input">
                    <span>用户名：</span>
                    <input type="text"
                      placeholder="请输入用户名"
                      ref="user_name"
                      autoComplete="off"
                      name="name"
                    />
                </div>
                <div className="item-input">
                    <span className="item-pass">密码：</span>
                    <input type="password"
                      placeholder="请输入密码"
                      ref="user_pass"
                      autoComplete="off"
                      name="password"
                    />
                </div>
                <div className="item-input">
                    <span className="item-pass">密码：</span>
                    <input type="password"
                      placeholder="请输入密码"
                      ref="user_pass_re"
                      autoComplete="off"
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
