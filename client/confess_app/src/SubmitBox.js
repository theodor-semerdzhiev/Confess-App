import react, {Component} from "react";
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
                    console.log(error.response);
                    this.setState({
                        error : true,
                        error_message : error.response.data,
                        pendingRequest: false,
                        GoodRequest: false
                    })
                });   
    }

    render() { 
        return  (
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <label>Title:</label>
                                <input type="text" placeholder="Title" name="title"/>
                            </div>
                            <div>
                                <label>Message:</label>
                                <textarea type="text" placeholder="Confession" name="confession"/>
                            </div>
                            <button>Post</button>
                            {
                            ((this.state.pendingRequest)? <nobr>Sending...</nobr>: 
                            (this.state.error)? <nobr>{this.state.error_message}</nobr>: 
                            (this.state.GoodRequest === true)? <nobr>Posted!</nobr>:
                            <p></p>)
                            }
                            <hr/>
                        </form>
                    </div>
                )
            }
}

export default SubmitBox;