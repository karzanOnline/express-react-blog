

import {connect} from 'react-redux';

import {userPost} from './redux/actions/userPost';

class UserPost extends React.Component{
    constructor (props){
        super(props)
    }

    componentDidMount(){
        let {dispatch,params} = this.props;
        dispatch(userPost(`/u/${params.paramName}`))
    }

    openClick(){
        let {dispatch,params} = this.props;
        dispatch(userPost(`/u/${params.paramName}`))
    }

    render (){
        const props = this.props;
        return (
            <div>
            {
                props.post.map((item,index)=>{
                    return (
                        <article key={item} className="article-post">
                            <header className="article-header" key={index}>
                                <h2><a className="article-title" href="#">{item.get('title')}</a></h2>
                            </header>
                            <content className="article-entry">
                                <p className='info'>
                                    <span>作者：</span><a onClick={this.openClick.bind(this)}>{item.get('name')}</a>  |
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
            
            </div>
        )
    }
}

function mapStateToProps (state){
    return {
        post : state.getIn(['UserPost','data'])
    }
    
}


export default connect(mapStateToProps)(UserPost);

