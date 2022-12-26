import react, {Component} from "react";

class SubmitBox extends Component {

    constructor(props){
        super()
        this.state = {
            Title:"",
            Confession:"",
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    //will parse information and send it to the backend
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            Title: event.target.elements.title.value,
            Confession: event.target.elements.confession.value,
        });
        //here you should sent a POST API call 

        console.log(this);
    }

    render() { 
        return  (
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" placeholder="Title" name="title"/>
                            <input type="text" placeholder="Confession" name="confession"/>
                            <button>Post</button>
                        </form>
                    </div>
                )
            }
}

export default SubmitBox;