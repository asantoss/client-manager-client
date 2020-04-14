import styled from 'styled-components';

export const InvoiceCreatorContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 3;
	justify-content: space-evenly;
	background-color: ${({ theme }) => theme.colors.background};
	color: white;
	font-size: 1.5em;
	hr {
		width: 100%;
		border-color: ${({ theme }) => theme.colors.background};
	}
	.panel-actions {
		font-size: 0.8em;
		color: ${({ theme }) => theme.colors.primary};
	}
	.invoice-actions {
		margin: 1em;
		display: flex;
		justify-content: space-evenly;
	}
	.invoice-panel {
		background-color: ${({ theme }) => theme.colors.foreground};
		margin: 0.8em;
		padding: 1em;
	}
`;
