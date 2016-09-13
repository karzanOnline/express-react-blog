/**
 * Created by caozheng on 2016/9/8.
 */

import {Component} from 'react';
import '{public}/css/post.scss';
import QueueAnim from 'rc-queue-anim';
export default class Post extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    submitPost(){
        let _this = this;
        let obj = {
            d:JSON.stringify({
                title : _this.refs.post_title.value,
                body : _this.refs.post_body.value
            })
        };
        $.post('/post/savePost',obj,(data)=>{
            if (data.success){

            }else{
                alert(data.description)
            }
        },'json')

    }

    render (){
        return (
            <QueueAnim interval={100} duration={1500}>
            <div key="1" style={{padding:'20px'}}>
                <div className="form-col">
                    <label className="post-title">标题</label>
                    <input type="text" name="title"
                           ref='post_title'
                           placeholder="请输入新文章的标题"
                           className="form-text-style" />
                </div>
                <div className="form-col">
                    <label className="post-title">正文</label>
                    <textarea name="post"
                              ref="post_body"
                              placeholder="请输入新文章的正文"
                              className="post-body"></textarea>
                </div>
                <div className="form-col text-center">
                    <button className="button-primary" onClick={this.submitPost.bind(this)}>发布</button>
                </div>
            </div>
            </QueueAnim>
        )
    }
}

