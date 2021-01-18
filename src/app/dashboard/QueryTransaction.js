import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class QueryTransaction extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hash: '',
			transaction: {}
		};

		this.handleOnChangeHash = this.handleOnChangeHash.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleOnChangeHash(event) {
		this.setState({
			hash: event.target.value.trim()
		});
	}

	async handleSubmit(event) {
		event.preventDefault();

		let transaction = {};
		this.setState({
			transaction: {}
		});

		try {
			transaction = await this.props.ethereumProvider.eth.getTransaction(this.state.hash);
			
			this.setState({
				transaction: transaction
			});

		} catch(err) {
			toast.error('Error: Invalid hash');
		}
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} >
			 	<div className="form-group">
					<label>Query transaction data from transaction hash:</label>
					<input 
						className="form-control" 
						value={this.state.hash}
						onChange={this.handleOnChangeHash} 
					/>
				</div>
				<input className="btn btn-primary" type="submit" value="Get data" />
				<h6>Transaction data</h6>
				<code>
					 { JSON.stringify(this.state.transaction)  }
				</code>
			</form>
		);
	}
}