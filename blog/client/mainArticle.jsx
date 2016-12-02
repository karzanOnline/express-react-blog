
import {connect} from 'react-redux';
import {oGetParam} from './tools/tools';
import QueueAnim from 'rc-queue-anim';
//引用dialog组件
import Dialog from './components/src/js/controls/Dialog.jsx';
//loading
import Loading from './components/src/js/controls/Loading';
import Alert from './components/src/js/managers/DialogManager';

const codeStyle = {
    maxHeight : 'inherit'
};

class MainArticle extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            postData :'',
            editData : {
                title : '',
                post :　''
            }
        }
    }
    
    componentDidMount (){
        let _this = this;
        let paramObj = oGetParam(this.props.location.search);
        $.post('/article',paramObj,(data)=>{
            if(data.success){
                _this.setState({postData:data.resultMap.post})
            }else{
                alert(data.description)
            }

        },'json');
    }

    editArticle (){
        var _this = this;
        let paramObj = oGetParam(this.props.location.search);
        paramObj.markdown = true;

        $.ajax({
            url : '/article',
            type : 'post',
            dataType : 'json',
            data : paramObj,
            success : function (data) {
                _this.refs.fullLoading.close();
                if(data.success){
                    _this.setState({
                        editData : data.resultMap.post
                    })
                }else{
                    Alert.alert({
                        title:'',
                        message: data.description
                    });
                }
            },
            beforeSend : function () {
                _this.refs.fullLoading.open();
            }
        });

        this.refs.Dialog.show();

    }

    deleteArticle (){

    }

    submitPost (){
        var _this = this;
        let paramObj = oGetParam(this.props.location.search);
        paramObj.post = _this.refs.post_body.value;
        paramObj.title = _this.refs.post_title.value;
        $.ajax({
            url : '/editPost',
            dataType : 'json',
            type : 'post',
            data : {
                d : JSON.stringify(paramObj)
            },
            success : function (data) {
                _this.refs.fullLoading.close();
                if(data.suucess) {
                    Alert.alert({
                        title:'提示',
                        message: '操作成功！'
                    });
                }else{
                    Alert.alert({
                        title:'提示',
                        message: data.description
                    });
                }
            },
            beforeSend : function () {
                _this.refs.fullLoading.open();
            }
        })

    }

    textChange (key, e){
        var editData = this.state.editData;
        editData[key] = e.target.value;
        this.setState({editData : editData})
    }

    render (){
        const state = this.state;
        return (
            <QueueAnim>
                <article key='1' className="article-post">
                    <header className="article-header">
                        <h2><a className="article-title">{state.postData&&state.postData.title}</a></h2>
                    </header>
                    <content className="main-article-entry article-entry">
                        <p className='info'>
                            <span>作者：</span><a >{state.postData&&state.postData.name}</a>  |
                            <span>日期：</span>{state.postData&&state.postData.time.minute}
                        </p>
                        <p dangerouslySetInnerHTML={{__html:state.postData&&state.postData.post}}></p>
                    </content>
                    <footer className="article-info">
                        <button className="button" onClick={this.editArticle.bind(this)}>编辑</button>
                        <button className="button" onClick={this.deleteArticle.bind(this)}>删除</button>
                    </footer>
                </article>
                <Dialog ref="Dialog">
                    <content className="from-content" >
                        <div className="form-col">
                            <label className="post-title">标题</label>
                            <input type="text" name="title"
                                   ref="post_title"
                                   placeholder="请输入新文章的标题"
                                   className="form-text-style"
                                   value={state.editData.title}
                                   onChange={this.textChange.bind(this, 'title')}
                            />
                        </div>
                        <div className="form-col">
                            <label className="post-title">正文</label>
                            <textarea name="post"
                                      ref="post_body"
                                      placeholder="请输入新文章的正文(支持MarkDown语法)"
                                      className="post-body"
                                      value = {state.editData.post}
                                      onChange={this.textChange.bind(this, 'post')}
                            ></textarea>
                        </div>
                        <div className="form-col text-center">
                            <button className="button-primary" onClick={this.submitPost.bind(this)}>提交修改</button>
                        </div>
                    </content>
                </Dialog>
                <Loading ref="fullLoading"
                         type={'full-screen'}
                         mask={true}
                         size={'s-small'}/>
           </QueueAnim>

        )

    }
}

function mapStateToProps(state){

    return {
        authorState : state.getIn(['reduceInfo', 'data', 'resultMap'])
    }
}

// function mapDispatchToProps(dispatch){
//     return {
//         fGet()=>{

//         }
        
//     }

// }

export default connect(mapStateToProps)(MainArticle)