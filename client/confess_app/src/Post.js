import react, {Component} from "react";

class Post extends Component {
    render() {
        console.log(this.props)
        const post = this.props.post;
        return <div className="post">
                  <h>{post.message}</h>
                  <h>{post.title}</h>
                  <h>{post.likes}</h>
                  <h>{post.date}</h>
                  <h>{post._id}</h>
             </div>
    }
}

export default Post;