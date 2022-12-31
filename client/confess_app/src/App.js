import {Component} from "react";
import List from "./List";
import SubmitBox from "./SubmitBox";
import Title from './Title';
import axios from 'axios';
import Description from "./description";

class App extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            isListLoading: true,
            error : ""
        }
        this.addPost=this.addPost.bind(this);
    }

    addPost(post) {
        if(this.state.posts.length == 20) {
            this.setState({
                posts: this.state.posts.pop()
            });
        }
        this.setState({
            posts: [post, ...this.state.posts]
        });
    }

    async componentDidMount(){

        await axios.get("http://localhost:3500/api")
            .then(response => {
                const posts = response.data;

                this.setState({ 
                    posts: posts.sort((x,y) => {
                        return (new Date(y.date).getTime() - new Date(x.date).getTime())
                    }), 
                    error:""
                })
            })
            .catch(error => {
                console.log('Something went wrong with http request: ' + error.message)
                this.setState({ error: `Request:${error.request} Error Code:${error.code}`})
            })
            .finally(() => {
                this.setState({ isListLoading: false });
            });
    }

    render() {
        return <div>
                    <Title title={"McGill Confessions"}/>
                    <div className="top">
                        <Description/>
                        <SubmitBox addPost={this.addPost}/>
                    </div>
                    <hr/>
                    <List 
                    posts={this.state.posts} 
                    isLoading={this.state.isListLoading} 
                    error={this.state.error}
                    />
                    
                    <div className="bottom-page-text">
                        <small>Date: {new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}</small>
                        <hr/>
                        <small>Made by Theodor Semerdzhiev, additional help from Samuel Beaudoin</small>
                    </div>
                </div>
    }
}

export default App;