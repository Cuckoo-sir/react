import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ComponentInput extends Component {
    static propTypes={
        onSubmit: PropTypes.func
    }

    constructor () {
        super()
        this.state = {
            username:'',
            content:'',
            createdTime:''
        }
    }
    _loadUsername () {
        const username = localStorage.getItem('username');
        if (username) {
            this.setState({
                username:username
            })
        }
    }
    componentWillMount () {
        this._loadUsername()
    }
    componentDidMount () {
        this.textarea.focus();
    }
    handleUsernameChange (e) {
        this.setState({
            username:e.target.value 
        })
    }
    handleContentChange (e) {
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit () {
        if (this.props.onSubmit) {
            // const {username, content} = this.state;
            // this.props.onSubmit({username, content});
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                createdTime: +new Date()
            })
            
            this.setState({content:''}) // 每次提交时文本框内容置空
        }
    }
    _saveUsername (username) {
        localStorage.setItem('username',username)
    }
    handleUsernameBlur (e) {
        this._saveUsername(e.target.value)
    }
    render () {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                <span className='comment-field-name'>用户名：</span>
                <div className='comment-field-input'>
                    <input value={this.state.username} onBlur={this.handleUsernameBlur.bind(this)} onChange={this.handleUsernameChange.bind(this)} />
                </div>
                </div>
                <div className='comment-field'>
                <span className='comment-field-name'>评论内容：</span>
                <div className='comment-field-input'>
                    <textarea ref={(textarea) => this.textarea=textarea} value={this.state.content} onChange={this.handleContentChange.bind(this)} />
                </div>
                </div>
                <div className='comment-field-button'>
                <button onClick={this.handleSubmit.bind(this)}>
                    发布
                </button>
                </div>
            </div>
        )
    }
}
export default ComponentInput