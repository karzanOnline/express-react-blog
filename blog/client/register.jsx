/**
 * Created by caozheng on 2016/9/8.
 */
import QueueAnim from 'rc-queue-anim';
import {Component} from 'react';
export default class Login extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount (){

    }

    submitLogin(){
        let _this = this;
        let obj = {
            d:JSON.stringify({
                name : _this.refs.user_name.value,
                password : _this.refs.user_pass.value,
                passwordRe : _this.refs.user_pass_re.value
            })
        };
        $.post('/reg',obj,(data)=>{
            if (data.success){

            }else {
                alert(data.description)
            }
        },'json')
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
                    <span className="item-pass">密码：</span>
                    <input type="password"
                           placeholder="请输入密码"
                           ref="user_pass_re"
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