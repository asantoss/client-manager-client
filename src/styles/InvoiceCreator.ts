import styled from 'styled-components';

export const InvoiceCreatorContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 3;
	justify-content: space-evenly;
	background-color: ${({ theme }) => theme.colors.background};
	color: white;
	hr {
		width: 100%;
		border-color: ${({ theme }) => theme.colors.background};
	}
	.panel-actions {
		font-size: 0.8em;
		color: ${({ theme }) => theme.colors.primary};
	}
	.product {
		background: rgba(0, 0, 0, 0.8);
		color: white;
		&:nth-of-type(even) {
			background: rgba(0, 0, 0, 0.5);
			color: white;
		}
	}
	.invoice-actions {
		margin: 1em;
		display: flex;
		justify-content: space-evenly;
	}
	.invoice-panel {
		background-color: ${({ theme }) => theme.colors.foreground};
		margin: 0.5em;
		padding: 1em;
		border-radius: 0.2em;
	}
`;

export const ProductItem = styled.div`
	display: flex;
	justify-content: space-between;
	text-align: left;
	padding: 0 1em;
	& > p {
		display: flex;
		flex-direction: column;
		font-size: 0.9em;
		span {
			font-size: 0.7em;
		}
	}
`;
