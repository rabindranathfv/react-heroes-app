import React, {Component} from 'react';

export default class Test extends Component {
    goToInvoices = () => {
        const { history } = this.props;
        history.push("/invoices");
    }

    render() {
        return (
            <p onClick={this.goToInvoices}>IR A INVOICES </p>
        )
    }
}