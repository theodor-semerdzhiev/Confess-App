import react, {Component} from "react";
import axios from "axios";

class SubmitBox extends Component {

    constructor(props){
        super()
        this.state = {
            Title:"",
            Message:"",
            error:false,
            error_message:""
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

        await axios.post("http://localhost:3500/api/confess", post).
                then(response => {
                    this.setState({
                        error : false,
                        error_message : ""
                    })
                }).catch(error => {
                    this.setState({
                        error : true,
                        error_message : error.response.data
                    })
                })

    }

    render() { 
        return  (
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Title" name="title"/>
                            <textarea type="text" placeholder="Confession" name="confession"/>
                            <button>Post</button>
                            {(this.state.error)? <nobr>{this.state.error_message}</nobr>: <p></p>}
                        </form>
                    </div>
                )
            }
}

export default SubmitBox;