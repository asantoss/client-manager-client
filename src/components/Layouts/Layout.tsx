import React from 'react';
import Navbar from './Navbar';
import { LayoutStyled } from '../../styles';

export default function Layout({ children }) {
	return (
		<LayoutStyled>
			<main>{children}</main>
			<footer>
				<Navbar />
			</footer>
		</LayoutStyled>
	);
}
