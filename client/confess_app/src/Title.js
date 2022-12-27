import React, {Component} from "react";


class Title extends Component {

    render() {
        return <div className="title"><h1>{this.props.title}</h1></div>
    }
}

export default Title;