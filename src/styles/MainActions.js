import React from 'react-dom';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const Container = styled.div`
	color: #f7a705;
	display: flex;
	justify-content: space-between;
	padding: 1em;
	width: 100%;
`;
export const MainActions = ({ closeFunction, pageName }) => {
	return (
		<Container>
			<h4>{pageName}</h4>
			<IconButton
				color='inherit'
				onClick={closeFunction}>
				<Close />
			</IconButton>
		</Container>
	);
};
