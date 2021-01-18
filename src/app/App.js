import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Web3Provider } from './ethereum/web3-service';
import { Web3Component } from './ethereum/Web3Component';
import { Header } from './header/Header';
import { Dashboard } from './dashboard/Dashboard';
import { ErrorComponent } from './error/ErrorComponent';

export class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			web3: null,
			network: null,
			accounts: null,
			defaulthardfork: null,
			defaultchain: null,
			protocolversion: null,
			blocknumber: null,
			balance: null,
			blockinfo: null,
			gasprice: null,
		};
	}

	async setOtherDefaultStates(web3, account) {
		try {
			const defaulthardfork= web3.eth.defaultHardfork;
			const defaultchain = web3.eth.defaultChain;
			const protocolversion = await web3.eth.getProtocolVersion();
			const blocknumber = await web3.eth.getBlockNumber();
			const gasprice = web3.utils.fromWei( await web3.eth.getGasPrice() );

			let balance = 0;
			if (account !== undefined && account) {
				balance = web3.utils.fromWei( await web3.eth.getBalance(account) );
			}
			const blockinfo = await web3.eth.getBlock(blocknumber);

			this.setState({
				defaulthardfork: defaulthardfork,
				defaultchain: defaultchain,
				protocolversion: protocolversion,
				blocknumber: blocknumber,
				balance: balance,
				blockinfo: blockinfo,
				gasprice: gasprice,
			});
		} catch (err) {
			toast.error('errorrr!!!');
			console.log('ups', err);
		}
		
	}

	async componentDidMount() {

		const web3provider = new Web3Provider();
		let error = false;
		let web3 = null, provider = null, network = null, accounts = null;

		try {
			web3 = await web3provider.getWeb3();
			provider = web3provider.getProvider();
			network = await web3.eth.getChainId();
			accounts = await web3.eth.getAccounts();
		} catch (err) {
			error = true;
		}

		// Si todo salio bien
		if (error === false) {
			this.setState({
				web3: web3,
				provider: provider,
				network: network,
				accounts: accounts
			});

			// Set other states
			this.setOtherDefaultStates(web3, accounts[0]);

			// Cambio de cuenta
			provider.on('accountsChanged', (accounts) => {
				this.setState({
					accounts: accounts
				});
				// Set other states
				this.setOtherDefaultStates(web3, accounts[0]);
			});

			// Cambio de red
			provider.on('chainChanged', async (chainId) => {
				this.setState({
					network: chainId
				});
				// Set other states
				this.setOtherDefaultStates(web3, accounts[0]);
			});

			// Nuevos bloques
			web3.eth.subscribe('newBlockHeaders', async (error, data) => {
				
				if (data.hasOwnProperty('number')) {
					const blocknumber = data.number;
					const blockinfo = await web3.eth.getBlock(blocknumber);
					this.setState({
						blockinfo: blockinfo,
						blocknumber: blocknumber
					});

					toast.success('New block received ' + data.number);

				} else {
					toast.error('Block suscription error');
				}
			});

		}
		
		// Muestra/oculta contenido
		document.getElementById('AppComponent-Body').className = '';
		document.getElementById('AppComponent-Loading').className = 'invisible';

		

	}

	componentWillUnmount() {

	}

	render() {
		const header = <Header key="HeaderComponent" title="Ethereum Explorer" />;
		let body = null;
		// Si existe el proveedor de Metamask o similar
		if (this.state.web3) {
			const login = async () => {
				let accounts = null;

				try {
					accounts = await this.state.web3.eth.requestAccounts();
					const main_account = accounts[0] ? accounts[0] : '';
					this.setState({
						accounts: accounts
					});
					toast.success('Welcome!');
				} catch(err) {
					var msg = err && err.message ? err.message : 'Error!';
					toast.error(msg);
					return null;
				}

				return accounts;
			};

			// Si ya ha iniciado sesion
			if (this.state.accounts && this.state.accounts.length > 0) {
				const userData = {
					network: this.state.network,
					accounts: this.state.accounts,
					blocknumber: this.state.blocknumber,
					balance: this.state.balance,
					blockinfo: this.state.blockinfo,
					gasprice: this.state.gasprice,
					web3: this.state.web3
				};

				body = <Dashboard key="DashboardComponent" userData={userData} />;

			} else {
				body = <Web3Component 
							key="Web3Component"
							login={ () => { login() } } />;
			}
		
			
		} else {
			body = <ErrorComponent key="ErrorComponent" errorCode="1" />;
		}

		return (
			<div>
				{header}
				<div id="AppComponent-Loading" className="visible text-center">
					<div className="spinner-border">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
				<div id="AppComponent-Body" className="invisible">
					{body}
				</div>
				<ToastContainer position="bottom-center" />
			</div>
		);
	}
	
}