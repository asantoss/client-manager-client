import React from 'react';
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import { css } from '@emotion/core';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { More, ExitToApp, AssignmentInd } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../reducers';

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
		backgroundColor: '#212120',
		top: 0,
		bottom: 'auto'
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

function Topbar() {
	const { isLoggedIn } = useSelector((state: AppState) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const theme = useTheme();
	const classes: any = useStyles(theme);
	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		history.push('/login');
	};
	return (
		<div className={classes.root}>
			<AppBar position='fixed' className={classes.appBar}>
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
					{isLoggedIn ? (
						<NavLink to='/login' activeClassName='current'>
							<IconButton edge='end'>
								<ExitToApp />
							</IconButton>
						</NavLink>
					) : (
						<IconButton
							edge='start'
							aria-label='open drawer'
							onClick={handleLogout}>
							<AssignmentInd />
						</IconButton>
					)}
					{/* <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <Add />
          </Fab> */}
					<NavLink to='/' activeClassName='current'>
						<IconButton edge='end'>
							<More />
						</IconButton>
					</NavLink>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default withRouter(Topbar);
