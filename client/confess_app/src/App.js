import React, {Component, useDebugValue} from "react";
import List from "./List";
import SubmitBox from "./SubmitBox";
import Title from './Title';
import axios from 'axios';


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
        this.setState({
            posts: [post, ...this.state.posts]
        }, () => {
            console.log(this.state.posts);
        })
    }

    async componentDidMount(){

        //this.setState({ isListLoading: true });

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
                    <Title title={"Confess App"}/>
                    <SubmitBox addPost={this.addPost}/>
                    <List posts={this.state.posts} isLoading={this.state.isListLoading} error={this.state.error}/>
                </div>
    }
}

export default App;