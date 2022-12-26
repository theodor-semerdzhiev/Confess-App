import React, {Component} from 'react';
import Post from './Post';
import axios from 'axios';


class List extends Component{
    constructor(){
        super()
        this.state = {
            posts: [],
            isLoading: false

        }
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    async componentDidMount(){

        this.setState({ arePostsLoading: true });

        await axios.get("http://localhost:3500/api")
            .then(response => {

                this.setState({ posts: response.data })
                this.setState({ isLoading: false });
            })
            .catch(error => {
                //revise this in the futur
                console.log('Something went wrong with http request:' + error)
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        console.log(this.state.posts)
        if (this.state.isLoading) {
            return <p>Is Loading</p>
        } else {
            return (
            <div>
                {this.state.posts.map((post, index) => {
                    return (
                        <div>
                        {console.log(post)}
                        <Post post={post} key={index}/>
                        </div>
                    )
                })}
            </div>)
        }
    }
}

export default List;