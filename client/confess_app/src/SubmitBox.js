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
        this.resetRequestStatus=this.resetRequestStatus.bind(this);
    }

    resetRequestStatus() {
        this.setState({
            GoodRequest: null
        });
    }

    //will parse information and send it to the backend
    async handleSubmit(event) {
        event.preventDefault();

        const post = {
            title: event.target.elements.title.value,
            message: event.target.elements.confession.value
        }

        this.setState({
            pendingRequest: true,
            Title: event.target.elements.title.value,
            Message: event.target.elements.confession.value,
        });

        event.target.reset();
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
                    let response=null;
                    if(error.response === undefined) {
                        response="Network Error";
                    } else if(error.response.data === undefined) {
                        response="It seems something went wrong";
                    } else {
                        response=error.response.data
                    } 
                    this.setState({
                        error : true,
                        error_message : response,
                        pendingRequest: false,
                        GoodRequest: false
                    });
                });   
    }

    render() { 
        return  (
                    <div className="form-group">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>Title</label>
                                <input 
                                    id="TitleText" 
                                    type="text" 
                                    placeholder="Title" 
                                    name="title"
                                    onFocus={this.resetRequestStatus}
                                />
                            </div>
                            <div>
                                <label>Message</label>
                                <textarea 
                                    id="MessageText" 
                                    type="text" 
                                    placeholder="Confession" 
                                    name="confession"
                                    onFocus={this.resetRequestStatus}
                                />
                            </div>
                            <button type="submit">Post</button>
                            {
                            ((this.state.pendingRequest)? 
                                <nobr>Sending...</nobr>: 
                            (this.state.error_message)? 
                                <nobr className="error-message">{this.state.error_message}</nobr>: 
                            (this.state.GoodRequest === true)? 
                                <nobr className="success-message">Posted!</nobr>:
                            (this.state.GoodRequest == null)? 
                                <nobr></nobr>:
                                    <p>Timeout</p>)
                            }
                        </form>
                    </div>
                )
    }
}

export default SubmitBox;