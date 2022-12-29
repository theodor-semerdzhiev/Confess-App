import React, {Component} from 'react';
import Post from './Post';



class List extends Component{
    constructor(){
        super()
    }

    render() {
        //console.log("Render...")
        if(this.props.error) {
            return <div><p>{this.props.error}</p></div>
        } else if (this.props.isLoading) {
            return <div><p>Is Loading</p></div> 
        } else {
            return (
            <div>
                {this.props.posts
                .map((post, index) => {
                    //console.log(post);
                    
                    return <Post post={post} key={index}/>
                }, () => {console.log(this.props.posts)})}
            </div>)
        }
    }
}

export default List;