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
		background-color: ${(props) => props.theme.colors.foreground};
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
