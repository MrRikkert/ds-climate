import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Treemap extends Component {
    componentDidMount() {
        console.log(this.props.data)
        this.setState({
            data: this.props.data
        })
    }

    render() {
        return (
            <span>hallo</span>
        );
    }
}

export default Treemap;
