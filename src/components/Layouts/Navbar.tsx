import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { css } from '@emotion/core';
import { IconButton } from '@material-ui/core';
import { Toolbar } from '../../styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Menu, More, Receipt } from '@material-ui/icons';
import { Bottombar } from '../../styles/Navbar';

const useStyles = makeStyles(theme => ({
	text: {
		padding: theme.spacing(2, 2, 0)
	},
	paper: {
		paddingBottom: 50
	},
	list: {
		marginBottom: theme.spacing(2)
	},
	subheader: {
		backgroundColor: theme.palette.background.paper
	},
	appBar: {
		top: 'auto',
		bottom: 0,
		backgroundColor: '#212120'
	},
	grow: {
		flexGrow: 1
	},
	fabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto'
	}
}));

function Navbar() {
	// const [isOpen, setOpen] = useState(false);

	return (
		<Bottombar>
			<NavLink to='/about' activeClassName='current'>
				<IconButton
					edge='start'
					aria-label='open drawer'
					color='inherit'>
					<Menu />
				</IconButton>
			</NavLink>
			<NavLink
				to='/invoice/creator'
				activeClassName='current'>
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
