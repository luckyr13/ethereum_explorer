import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class QueryBalance extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			balance: 0
		};

		this.handleOnChangeAddress = this.handleOnChangeAddress.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleOnChangeAddress(event) {
		this.setState({
			address: event.target.value.trim()
		});
	}

	async handleSubmit(event) {
		event.preventDefault();

		let balance = 0;
		this.setState({
			balance: 0
		});

		try {
			balance = this.props.ethereumProvider.utils.fromWei(
				await this.props.ethereumProvider.eth.getBalance(this.state.address)
			);

			this.setState({
				balance: balance
			});

		} catch(err) {
			toast.error('Error: Invalid address');
		}
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} >
			 	<div className="form-group">
					<label>Query balance from address:</label>
					<input 
						className="form-control" 
						value={this.state.address}
						onChange={this.handleOnChangeAddress} 
					/>
				</div>
				<input className="btn btn-primary" type="submit" value="Get Balance" />
				<div>
					Balance: { this.state.balance }
				</div>
			</form>
		);
	}
}