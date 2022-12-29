import {PureComponent} from "react";
import axios from "axios";

class Post extends PureComponent {

    constructor(props){
        super(props);
        this.state = {
            like_error: false,
            waitingForLikeRequest:false
        }
        this.addLike=this.addLike.bind(this);
    }
    async addLike(){
        this.setState({waitingForLikeRequest: true});
        await axios.put(`http://localhost:3500/api/${this.state.id}`)
            .then((response) => {
                this.setState({
                    likes: this.state.likes+1,
                    like_error: false,
                    waitingForLikeRequest: false
                }, () => console.log('liked...'));
            })
            .catch((error) => {
                this.setState({
                    like_error: true,
                    waitingForLikeRequest: false
                })
            })
    }

    parseRelativeTime(date){
        const seconds = Math.round(((new Date().getTime()/1000)-new Date(date).getTime()/1000));
        if(seconds < 60)
            return seconds === 1? `Posted ${seconds} second ago`:`Posted ${seconds} seconds ago`;
        if(Math.round(seconds/60) < 60) 
            return Math.round(seconds/60) === 1? `Posted ${Math.round(seconds/60)} minute ago`:`Posted ${Math.round(seconds/60)} minutes ago`;
        const minutes = Math.round(seconds/60);
        if(Math.round(minutes/60) < 24) 
            return Math.round(minutes/60) === 1? `Posted ${Math.round(minutes/60)} hour ago`:`Posted ${Math.round(minutes/60)} hours ago`;
        const hours = Math.round(minutes/60);
        if(Math.round(hours/24) < 7) 
            return Math.round(hours/24) === 1? `Posted ${Math.round(hours/24)} day ago`:`Posted ${Math.round(hours/24)} days ago`;
        const days = Math.round(hours/24);
        if(Math.round(days/7) < 4) 
            return Math.round(days/7) === 1? `Posted ${Math.round(days/7)} week ago`: `Posted ${Math.round(days/7)} weeks ago`;
        const weeks = Math.round(days/7);
        if(Math.round(weeks/4) < 12) 
            return (Math.round(weeks/4) === 1? `Posted ${Math.round(weeks/4)} month ago` : `Posted ${Math.round(weeks/4)} months ago`);
        const months = Math.round(weeks/4);
        if(Math.round(months/12) < 100) 
            return Math.round(months/12) === 1? `Posted ${Math.round(months/12)} year ago` : `Posted ${Math.round(months/12)} years ago`;
    }

    render() {
        return <div className="post">
                    <h2>{this.props.post.message}</h2>
                    <p>{this.props.post.title}</p>
                    <button onClick={this.addLike}>Like: {this.props.post.likes}</button>
                        {this.state.waitingForLikeRequest? <p>Sending Request...</p> : 
                        (this.state.like_error) ? 
                            <div className="error-message"><p>It seems something went wrong</p></div>:null
                        }
                    <strong>Date: {this.parseRelativeTime(this.props.post.date)}</strong>
                </div>
    }
}

export default Post;