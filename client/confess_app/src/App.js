import React, {Component} from "react";
import List from "./List";
import SubmitBox from "./SubmitBox";
import Title from './Title';


class App extends Component {

    constructor(){
        super()
       
    }

    render() {
        return <div>
                    <Title title={"Confess App"}/>
                    <SubmitBox/>
                    <List/>
                </div>
    }
}

export default App;