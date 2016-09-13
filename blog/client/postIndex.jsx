/**
 * Created by caozheng on 2016/9/9.
 */
import {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
export default class PostIndex extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('index post page');

    }

    render (){
        return(
            <QueueAnim interval={100} duration={1500}>
            <div key="1">

                <p><h2><a href="#">第一篇文章</a></h2></p>
                <p className="info">
                作者：<a href="#"></a> | caozheng_550
                日期：2019.03.15
                </p>
                <p>这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文</p>

            </div>
            <div key="2">
                <p><h2><a href="#">第一篇文章</a></h2></p>
                <p className="info">
                    作者：<a href="#"></a> | caozheng_550
                    日期：2019.03.15
                </p>
                <p>这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文这里是正文</p>
            </div>
            </QueueAnim>
        )
    }
}