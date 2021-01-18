import React from 'react';
import './Header.css';

export function Header(props) {
	return (
		<div className="container-fluid">
			<h1 className="Header-title text-center">
				{ props.title }
			</h1>
		</div>
	);
}