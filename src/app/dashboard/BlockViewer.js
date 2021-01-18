import React from 'react';
import './BlockViewer.css';

export function BlockViewer(props) {
	let blockinfo = props.hasOwnProperty('blockInfo') && props.blockInfo ? 
		props.blockInfo : {};
	const hash = blockinfo.hasOwnProperty('hash') ?
		blockinfo.hash : '';
	const nonce = blockinfo.hasOwnProperty('nonce') ?
		blockinfo.nonce : '';
	const blocknumber = blockinfo.hasOwnProperty('number') ?
		blockinfo.number : '';
	const parenthash = blockinfo.hasOwnProperty('parentHash') ?
		blockinfo.parentHash : '';
	const timestamp = blockinfo.hasOwnProperty('timestamp') ?
		blockinfo.timestamp : '';
	let transactions = blockinfo.hasOwnProperty('transactions') ?
		blockinfo.transactions : [];

	transactions = transactions.join('\n');

	return (
		<div className="container">
			<div className="row">
				<div className="col card BlockViewer">
					<div className="card-body">
						<h6 className="card-title text-center">
							Block #{blocknumber} : Hash: {hash}
						</h6>
						<h6 className="text-center">
							Transactions
						</h6>
						<p className="BlockViewer-transactions card-text text-center">
							{transactions}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}