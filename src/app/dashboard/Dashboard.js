import React from 'react';
import './Dashboard.css';
import { BlockViewer } from './BlockViewer.js';
import { QueryBalance } from './QueryBalance.js';
import { QueryTransaction } from './QueryTransaction.js';
import { QueryBlock } from './QueryBlock.js';

function networkIdToName(id) {
	let name = '';

	id = parseInt(id, 16);

	switch(id) {
		case 0x1:
			name = 'mainnet';
		break;
		case 0x3:
			name = 'ropsten';
		break;
		case 0x2a:
			name = 'kovan';
		break;
		case 0x4:
			name = 'rinkeby';
		break;
		case 0x5:
			name = 'Goerli';
		break;

		default:
			name = 'unknown';
		break;
	}

	return name;
}

export function Dashboard(props) {

	return (

		<div className="Dashboard-body container-fluid">
			<div className="container">
				<div className="row">
					<div className="col-6">
						Network ID: { props.userData.network }
						<br />
						Network Name: { networkIdToName(props.userData.network) }
						<br />
						Accounts: { props.userData.accounts }
						<br />
						Your balance: { props.userData.balance } ETH
						<br />
						Gas price: { props.userData.gasprice } ETH
						<br />
						Block # { props.userData.blocknumber }
						<br />
						Current block Info:
						<br />
						<BlockViewer blockInfo={props.userData.blockinfo} />
					</div>
					<div className="col-6">
						<QueryBalance ethereumProvider={props.userData.web3} />
						<QueryTransaction ethereumProvider={props.userData.web3} />
						<QueryBlock ethereumProvider={props.userData.web3} />
					</div>
					
				</div>
			</div>
		</div>
	);

}