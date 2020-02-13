import styled from 'styled-components';

export const ClientContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ClientStyled = styled.div`
	margin: 0.5em;
	.client-panel {
		color: #fff;
		background-color: ${props => props.theme.colors.foreground};
	}
	.client-information {
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
