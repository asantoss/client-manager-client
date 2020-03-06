import * as React from 'react';
// import Navbar from './Navbar/Navbar';
import { LayoutStyled } from '../../styles';

interface LayoutProps {
	children: any;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<LayoutStyled>
			<main>{children}</main>
			{/* <footer>
				<Navbar />
			</footer> */}
		</LayoutStyled>
	);
};

export default Layout;
