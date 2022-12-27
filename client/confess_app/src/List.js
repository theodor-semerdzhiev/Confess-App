import React, {Component} from 'react';
import Post from './Post';
import axios from 'axios';


class List extends Component{
    constructor(){
        super()
        this.state = {
            posts: [],
            isLoading: false,
            error: ""
        }
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    async componentDidMount(){

        this.setState({ isLoading: true });

        await axios.get("http://localhost:3500/api")
            .then(response => {
                this.setState({ 
                    posts: response.data, 
                    isLoading: false,
                    error:""
                })
            })
            .catch(error => {
                console.log('Something went wrong with http request: ' + error.message)
                this.setState({ error: `Request:${error.request} Error Code:${error.code}`})
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        if(this.state.error) {
            return <div><p>{this.state.error}</p></div>
        } else if (this.state.isLoading) {
            return <div><p>Is Loading</p></div> 
        } else {
            return (
            <div>
                {this.state.posts.
                sort((x,y) => {
                   return (new Date(y.date).getTime() - new Date(x.date).getTime())
                })
                .map((post, index) => {
                    return (
                    <div>
                        <Post post={post} key={index}/>
                    </div>
                    )
                })}
            </div>)
        }
    }
}

export default List;