import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { PlusOne, Receipt } from '@material-ui/icons';
import { Bottombar } from '.';

function Navbar() {
	return (
		<Bottombar>
			<NavLink to='/invoice/creator' activeClassName='current'>
				<IconButton edge='start' aria-label='open drawer' color='inherit'>
					<PlusOne />
				</IconButton>
			</NavLink>
			<NavLink to='/invoices' activeClassName='current'>
				<IconButton color='inherit'>
					<Receipt />
				</IconButton>
			</NavLink>
		</Bottombar>
	);
}

export default withRouter(Navbar);
