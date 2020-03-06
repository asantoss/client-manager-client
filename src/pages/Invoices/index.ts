import styled from 'styled-components';

export { default } from './InvoicePage';

interface Props {
	overDueTotal: number;
	toBePaidTotal: number;
}

export const InvoicesContainer = styled.div<Props>`
	display: flex;
	flex-direction: column;
	padding: 0.3em;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.foreground};
	.invoices__card {
		display: flex;
		justify-content: space-evenly;
		padding: 1em;
		border: 0.5px solid rgba(0, 0, 0, 0.2);
		background-color: ${({ theme }) => theme.colors.foreground};
		border-radius: 8px;
		font-size: 1.5em;
		& > div {
			display: flex;
			flex-direction: column;
		}
		&--toBePaid {
			text-align: center;
			color: ${({ toBePaidTotal, theme }) =>
				toBePaidTotal > 0 ? theme.colors.primary : ''};
		}
		&--overDue {
			text-align: center;
			color: ${({ overDueTotal, theme }) =>
				!!overDueTotal ? theme.colors.variants.danger : ''};
		}
		h2 {
			margin: 0;
			color: white;
		}
		span {
			display: block;
		}
	}
	.invoices__body {
		margin: 1em auto;
		padding: 1em;
		display: flex;
		flex-direction: column;
		width: 100%;
		&--invoice {
			display: flex;
			justify-content: space-between;
			border: 0.5px solid rgba(0, 0, 0, 0.6);
			margin: 0.5em 0;
			font-size: 0.8em;
		}
		&--header {
			display: flex;
			justify-content: space-between;
			margin-left: 45%;
		}
		[class|='invoice'] {
			font-weight: 400;
			line-height: 1.2em;
			padding: 0.2em;
			flex-grow: 1;
		}
		.actions {
			display: flex;
			align-self: center;
			flex-grow: 1;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			margin: 1em;
			padding-top: 1em;

			& > div {
				display: flex;
				flex-direction: column;
				align-items: center;
				align-content: center;
			}
		}
	}

	.invoice-information-container {
		display: flex;
		font-size: 1.2em;
		font-weight: 500;
		line-height: 1.5em;
		& > div {
			display: flex;
			flex-direction: column;
			align-items: center;
			align-content: center;
			span {
				margin: 1em;
			}
		}
	}
	@media only screen and (max-width: 600px) {
		.invoices__body {
			&--invoice {
				flex-direction: column-reverse;
				align-items: stretch;
				align-content: stretch;
			}
			.actions {
				border-top: 2px dotted rgba(0, 0, 0, 0.8);
			}
		}
	}
`;
