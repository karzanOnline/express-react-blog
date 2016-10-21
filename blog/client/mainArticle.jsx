
import {connect} from 'react-redux';
import {oGetParam} from './tools/tools';
import QueueAnim from 'rc-queue-anim';

class MainArticle extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            postData :''
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

        },'json')
    }


    render (){
        const state = this.state;
        return (
            <QueueAnim>
                <article key='1' className="article-post">
                    <header className="article-header">
                        <h2><a className="article-title">{state.postData&&state.postData.title}</a></h2>
                    </header>
                    <content className="article-entry">
                        <p className='info'>
                            <span>作者：</span><a >{state.postData&&state.postData.name}</a>  |
                            <span>日期：</span>{state.postData&&state.postData.time.minute}
                        </p>
                        <p dangerouslySetInnerHTML={{__html:state.postData&&state.postData.post}}></p>
                    </content>
                    <footer className="article-info">

                    </footer>
                </article>
           </QueueAnim>
        )

    }
}

// function mapStateToProps(state){
//     return {
//         oArticleData : ''
//     }

// }

// function mapDispatchToProps(dispatch){
//     return {
//         fGet()=>{

//         }
        
//     }

// }

export default connect()(MainArticle)