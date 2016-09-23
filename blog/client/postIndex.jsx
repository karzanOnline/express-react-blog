/**
 * Created by caozheng on 2016/9/9.
 */
import {Component} from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
import {postData} from './redux/actions/indexpost';
import '{public}/css/indexPost.scss';
class PostIndex extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log('index post page');
        let {dispatch} = this.props;
        dispatch(postData())

    }


    render (){
        const props = this.props;
        let resultMap = props.postData.get('data').get('resultMap');
        return(
            <QueueAnim interval={100} duration={1500}>
            {
                resultMap&&resultMap.get('postData').map((item,index)=>{
                    return (
                        <article key={item} className="article-post">
                            <header className="article-header" key={index}>
                                <h2><a className="article-title" href="#">{item.get('title')}</a></h2>
                            </header>
                            <content className="article-entry">
                                <p className='info'>
                                    <span>作者：</span><a href="#">{item.get('name')}</a>  |
                                    <span>日期：</span>{item.getIn(['time','minute'])}
                                </p>
                                <p dangerouslySetInnerHTML={{__html:item.get('post')}}></p>
                            </content>
                            <footer className="article-info">

                            </footer>
                        </article>

                        )
                })
            }

            </QueueAnim>
        )
    }
}

function mapStateToProps (state){
    
    return {
        postData : state.get('indexPost')
    }

}

export default connect(mapStateToProps)(PostIndex)
