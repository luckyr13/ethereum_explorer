import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class QueryBlock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			blocknumber: '',
			data: {}
		};

		this.handleOnChangeBlockNumber = this.handleOnChangeBlockNumber.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleOnChangeBlockNumber(event) {
		this.setState({
			blocknumber: event.target.value.trim()
		});
	}

	async handleSubmit(event) {
		event.preventDefault();

		let data = {};
		this.setState({
			data: {}
		});

		try {
			data = await this.props.ethereumProvider.eth.getBlock(this.state.blocknumber);
			
			this.setState({
				data: data
			});

		} catch(err) {
			toast.error('Error: Invalid hash or block number');
		}
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} >
			 	<div className="form-group">
					<label>Query block data from block hash or block number:</label>
					<input 
						className="form-control" 
						value={this.state.blocknumber}
						onChange={this.handleOnChangeBlockNumber} 
					/>
				</div>
				<input className="btn btn-primary" type="submit" value="Get data" />
				<h6>Block data</h6>
				<code>
					 { JSON.stringify(this.state.data)  }
				</code>
			</form>
		);
	}
}