import React, { useState } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { css } from '@emotion/core';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Menu, More, Receipt } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
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

function Navbar(props) {
	const [isOpen, setOpen] = useState(false);
	const theme = useTheme();
	const classes: any = useStyles(theme);
	return (
		<div className={classes.root}>
			<AppBar
				position='fixed'
				className={classes.appBar}>
				<Toolbar
					css={css`
						justify-content: space-between;
						button {
							color: #61605e;
						}
						.current > button {
							color: #f7a705;
						}
					`}>
					<NavLink
						to='/about'
						activeClassName='current'>
						<IconButton
							edge='start'
							aria-label='open drawer'>
							<Menu />
						</IconButton>
					</NavLink>
					{/* <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <Add />
          </Fab> */}
					<NavLink
						to='/clients'
						activeClassName='current'>
						<IconButton>
							<Receipt />
						</IconButton>
					</NavLink>
					<NavLink
						to='/invoices'
						activeClassName='current'>
						<IconButton edge='end'>
							<More />
						</IconButton>
					</NavLink>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withRouter(Navbar);
