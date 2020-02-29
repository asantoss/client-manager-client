import React from 'react';
import { NavLink, withRouter, useHistory } from 'react-router-dom';

import { IconButton } from '@material-ui/core';
import { More, ExitToApp, AssignmentInd } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../../reducers';
import styled from 'styled-components';

const TopBarStyled = styled.div`
	background-color: ${({ theme }) => theme.colors.foreground};
	top: 0;
	left: 0;
	padding: 0.2em 1em;
	position: absolute;
	display: flex;
	justify-content: space-between;
	width: 100%;
	color: ${({ theme }) => theme.colors.primary};
	a {
		color: inherit;
	}
`;

function Topbar() {
	const { isLoggedIn } = useSelector((state: AppState) => state.user);
	const dispatch = useDispatch();
	const history = useHistory();
	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
		history.push('/login');
	};
	return (
		<TopBarStyled>
			{isLoggedIn ? (
				<IconButton edge='end' color='inherit'>
					<NavLink to='/login' activeClassName='current'>
						<ExitToApp />
					</NavLink>
				</IconButton>
			) : (
				<IconButton color='inherit' edge='start' onClick={handleLogout}>
					<AssignmentInd />
				</IconButton>
			)}
			<NavLink to='/' activeClassName='current'>
				<h1>Client Manager</h1>
			</NavLink>

			<IconButton edge='end' onClick={() => history.goBack()} color='inherit'>
				<More />
			</IconButton>
		</TopBarStyled>
	);
}

export default withRouter(Topbar);