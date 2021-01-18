import React from 'react';

export class ErrorComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let body = null;

		switch(this.props.errorCode) {
			case '1':
				body = (
					<div className="container">
						<div className="alert alert-warning text-center">
							You need an Ethereum Wallet to use this Dapp.<br />
							Please install Metamask from: <br />
							<a href="https://metamask.io">https://metamask.io</a>
						</div>
					</div>
				);
			break;
			default:

			break;
		}
		return body;
	}
}