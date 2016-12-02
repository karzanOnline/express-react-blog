/**
 * Created by caozheng on 2016/9/8.
 */

import { Component } from 'react';
import '{public}/css/post.scss';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import { publishPost, postReset } from './redux/actions/publishPost';
import { browserHistory } from 'react-router';
import Alert from './components/src/js/managers/DialogManager';

class Post extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    submitPost() {
        const _this = this;
        const obj = {
            d: JSON.stringify({
                title: _this.refs.post_title.value,
                body: _this.refs.post_body.value,
            }),
        };
        const { dispatch } = _this.props;
        dispatch(publishPost(obj));
    }

    render() {
        const props = this.props;
        return (
            <QueueAnim interval={100} duration={1500}>
            <div key="1" className="from-style" style={{ padding: '20px' }}>
                <content className="from-content">
                    <div className="form-col">
                        <label className="post-title">标题</label>
                        <input type="text" name="title"
                          ref="post_title"
                          placeholder="请输入新文章的标题"
                          className="form-text-style"
                        />
                    </div>
                    <div className="form-col">
                        <label className="post-title">正文</label>
                        <textarea name="post"
                          ref="post_body"
                          placeholder="请输入新文章的正文(支持MarkDown语法)"
                          className="post-body"
                        ></textarea>
                    </div>
                    <div className="form-col text-center">
                        <button className="button-primary" onClick={this.submitPost.bind(this)}>发布</button>
                    </div>
                    <div>{props.submitCode}</div>
                </content>

            </div>
            </QueueAnim>
        );
    }
}

function mapStateToProps(state, history) {
    if (state.getIn(['publishPost', 'data', 'success'])) {
        history.routes[0].dispatch(postReset());
        browserHistory.push('/index');
    }
    return {
        submitCode: state.getIn(['publishPost', 'data', 'success']),
    };
}

export default connect(mapStateToProps)(Post);

