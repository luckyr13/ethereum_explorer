import detectEthereumProvider from '@metamask/detect-provider'
import Web3 from 'web3';

export class Web3Provider {
	constructor() {
		this.provider = null;
		this.web3 = null;

	}
	
	async setProvider() {
		this.provider = await detectEthereumProvider();
		

	}

	getProvider() {
		return this.provider;
	}

	isValidProvider() {
		return (
			this.provider === window.ethereum
		);
	}

	async setWeb3() {
		if (this.provider === null) {
			await this.setProvider();
		}
		
		if (this.isValidProvider() && this.web3 === null) {
			this.web3 = new Web3(this.web3 || Web3.givenProvider || "ws://localhost:8545");
		}
	}

	async getWeb3() {
		await this.setWeb3();
		return this.web3;
	}

	async requestAccounts() {
		const accounts = await this.web3.eth.requestAccounts();
		return accounts;
	}

	

}
