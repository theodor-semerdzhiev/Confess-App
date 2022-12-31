import React, {Component} from 'react';
import Post from './Post';

class List extends Component{
    constructor() {
        super();
        this.state = {
            posts: []
        }
    }

    componentDidMount(){
        this.setState({
            posts: this.props.posts
        })
    }

    render() {
        if(this.props.error) {
            return <div><p>{this.props.error}</p></div>
        } else if (this.props.isLoading) {
            return <div><p>Is Loading</p></div> 
        } else {
            console.log(this.state.posts)
            return (
            <div className='post-list'>
                {this.props.posts
                .map((post) => {
                    return <Post post={post} key={post._id}/>
                })}
            </div>)
        }
    }
}

export default List;