import React, {Component} from 'react';
import { Link } from 'react-router-dom';
export default class Invoices extends Component {
    render() {
        return (
            <div>test redirection <Link to="/">Back Home </Link></div>
        )
    }
}