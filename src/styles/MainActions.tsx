import * as React from 'react';
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

interface MainActionProps {
	closeFunction: any;
	pageName: string;
}
export const MainActions: React.FC<MainActionProps> = ({
	closeFunction,
	pageName
}) => {
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
