import styled from 'styled-components';

export const ClientContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${({ theme }) => theme.colors.background};
	input {
		height: 4em;
		width: 80%;
		font-size: 1em;
		margin: 0.5em auto;
	}
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

export const ClientPanelStyled = styled.div`
	display: flex;
	flex-direction: column;
	overflow-x: hidden;
	margin: 1em;
	align-items: center;
	height: 100vh;
	background-color: ${props => props.theme.colors.foreground};
	label {
		padding-left: 1em;
	}
	p {
		margin: 1em;
	}
	.client-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 2em;
	}
	.client {
		cursor: pointer;
		font-size: 1.5em;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0.2em;
		width: 100%;
		/* border-bottom: 0.2em solid ${({ theme }) => theme.colors.background}; */
		& > * {
			margin: 0.1em 0;
		}
	}
`;

export const ClientInformationForm = styled.form`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	width: 90%;

	overflow-x: scroll;
	label {
		text-transform: capitalize;
	}
	& > .client_input {
		background-color: white;
		margin: 0.5em;
	}
	& > button {
		background-color: ${({ theme }) => theme.colors.primary};
	}
`;
