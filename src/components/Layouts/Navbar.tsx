import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Menu, More, Receipt } from '@material-ui/icons';
import { Bottombar } from '../../styles/Navbar';

function Navbar() {
	// const [isOpen, setOpen] = useState(false);
	return (
		<Bottombar>
			<NavLink to='/dashboard' activeClassName='current'>
				<IconButton edge='start' aria-label='open drawer' color='inherit'>
					<Menu />
				</IconButton>
			</NavLink>
			<NavLink to='/invoice/creator' activeClassName='current'>
				<IconButton color='inherit'>
					<Receipt />
				</IconButton>
			</NavLink>
			<NavLink to='/invoices' activeClassName='current'>
				<IconButton edge='end' color='inherit'>
					<More />
				</IconButton>
			</NavLink>
		</Bottombar>
	);
}

export default withRouter(Navbar);
