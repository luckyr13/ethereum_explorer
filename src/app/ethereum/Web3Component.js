import React from 'react';

export function Web3Component(props) {
	return (
		<div className="container-fluid text-center">
			<button 
				type="button" 
				onClick={ props.login } 
				className="btn btn-primary">
				Sign in
			</button>
		</div>
	);
}