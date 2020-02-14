import styled from 'styled-components';
import { animated } from 'react-spring';

export const ClientContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const ClientStyled = styled.div`
	margin: 0.2em;
	.client-panel {
		color: #fff;
		background-color: ${props => props.theme.colors.foreground};
	}
	h5 {
		font-size: 1.5em;
		margin: 0.5em;
	}
	.client-information {
		display: flex;
		color: #fff;
		display: flex;
		justify-content: space-evenly;
		flex-direction: column;
		flex-wrap: 1;
		& > .client-actions {
			align-self: flex-start;
			button {
				display: inline-block;
				margin: 1em;
				color: white;
				&.delete-button {
					background-color: red;
				}
			}
		}
	}
`;

export const ClientPanelStyled = styled(animated.div)`
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	background-color: ${props => props.theme.colors.foreground};
	height: 60vh;
	label {
		padding-left: 1em;
	}
	p {
		margin: 1em;
	}
	.client-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		.client {
		}
	}
`;

export const ClientInformationForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	overflow-x: scroll;
	label {
		text-transform: capitalize;
	}
	& > .client_input {
		margin-bottom: 0.5em;
	}
`;
