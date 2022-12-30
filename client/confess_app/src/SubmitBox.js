import {Component} from "react";
import axios from "axios";

class SubmitBox extends Component {

    constructor(props){
        super()
        this.state = {
            Title:"",
            Message:"",
            error:false,
            error_message:"",
            pendingRequest: false,
            GoodRequest: null
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.resetStatus=this.resetStatus.bind(this);
    }

    resetStatus(){
        this.setState({
            error:false,
            error_message:"",
            pendingRequest: false,
            GoodRequest: null
        });
    }
    //will parse information and send it to the backend
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({
            Title: event.target.elements.title.value,
            Message: event.target.elements.confession.value,
        });

        const post = {
            title: event.target.elements.title.value,
            message: event.target.elements.confession.value
        }

        this.setState({
            pendingRequest: true
        });

        await axios.post("http://localhost:3500/api/confess", post).
                then(response => {
                    console.log(response.data);
                    this.setState({
                        error : false,
                        error_message : "",
                        pendingRequest: false,
                        GoodRequest: true
                    })
                    this.props.addPost(response.data);
                })
                .catch(error => {
                    const response=null;
                    if(error.response.data === undefined) {
                        response="It seems something went wrong";
                    } else {
                        response=error.response.data
                    } 
                    this.setState({
                        error : true,
                        error_message : `${response}, unable to post`,
                        pendingRequest: false,
                        GoodRequest: false
                    }, () => {
                        console.log(this.state)
                    })
                });   
    }

    render() { 
        return  (
                    <div className="form-group">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>Title</label>
                                <input type="text" placeholder="Title" name="title"/>
                            </div>
                            <div>
                                <label>Message</label>
                                <textarea type="text" placeholder="Confession" name="confession"/>
                            </div>
                            <button>Post</button>
                            {
                            ((this.state.pendingRequest)? <nobr>Sending...</nobr>: 
                            (this.state.error_message)? <nobr className="error-message">{this.state.error_message}</nobr>: 
                            (this.state.GoodRequest === true)? <nobr className="success-message">Posted!</nobr>:
                            (this.state.GoodRequest == null)? <nobr></nobr>:
                            <p>Timeout</p>)
                            }
                        </form>
                    </div>
                )
            }
}

export default SubmitBox;