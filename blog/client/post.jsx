/**
 * Created by caozheng on 2016/9/8.
 */

import {Component} from 'react';
import '{public}/css/post.scss';
export default class Post extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    render (){
        return (
            <div style={{padding:'20px'}}>
                <div className="form-col">
                    <label className="post-title">标题</label>
                    <input type="text" name="title"
                           placeholder="请输入新文章的标题"
                           className="form-text-style" />
                </div>
                <div className="form-col">
                    <label className="post-title">正文</label>
                    <textarea name="post"
                              placeholder="请输入新文章的正文"
                              className="post-body"></textarea>
                </div>
                <div className="form-col text-center">
                    <button>发布</button>
                </div>
            </div>
        )
    }
}

