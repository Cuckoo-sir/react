import React, {Component} from 'react'
import ComponentInput from './CommentInput'
import ComponentList from './CommentList'

class ComponentApp extends Component {
    constructor () {
        super();
        this.state = {
            comments:[]
        }
    }


    _loadComments() {
        let comments = localStorage.getItem('comments');
        if (comments) {
            comments = JSON.parse(comments)
            this.setState({
                comments:comments
            })
        }
    }
    componentWillMount() {
        this._loadComments();
    }

    _saveComments (comments) {
        localStorage.setItem('comments',JSON.stringify(comments));
    }
    handelSubmitContent (comment) {
        if (!comment) return;
        if (!comment.username)  return alert("请输入用户名");
        if (!comment.content)  return alert("请输入评论内容");
        
        this.state.comments.push(comment);
        this.setState({comments: this.state.comments});

        const comments = this.state.comments;
        this._saveComments(comments);
    }
    handleDeleteComment(index) {
        console.log(index);
        
        const comments = this.state.comments;
        comments.splice(index,1);
        this.setState({comments:this.state.comments});
        this._saveComments(comments);
    }
    render () {
        return (
            <div className='wrapper'>
                <ComponentInput onSubmit={this.handelSubmitContent.bind(this)} />
                <ComponentList comments = {this.state.comments}  onDeleteComment={this.handleDeleteComment.bind(this)}/>
            </div>
        )
    }
}

export default ComponentApp