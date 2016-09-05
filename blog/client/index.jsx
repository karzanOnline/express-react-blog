/**
 * Created by caozheng on 2016/9/2.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

let Index = React.createClass({
    componentDidMount : function () {
        $.get('/getPost',{},(data)=>{
            console.log(data)
        },'json')

    },
    render : function () {
        return <div>
            <p><h2><a href="#">曹政的第一篇文章</a></h2></p>
            <p className="info">
                作者：<a href="#">caozheng_550</a> |
                日期：2016-9-5 15:17
            </p>
            <p>这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文这是正文</p>
        </div>
    }

});
ReactDOM.render(<Index/>,document.getElementById('wrapper'));
