import styled from 'styled-components';

export { default } from './Dashboard';

interface Props {
	overDueTotal: number;
	toBePaidTotal: number;
}

export const DashboardContainer = styled.div<Props>`
	display: flex;
	flex-direction: column;
	padding: 0.3em;
	border-radius: 8px;
	background-color: ${({ theme }) => theme.colors.foreground};
	.dashboard__card {
		display: flex;
		justify-content: space-evenly;
		padding: 1em;
		border: 0.5px solid rgba(0, 0, 0, 0.2);
		background-color: ${({ theme }) => theme.colors.foreground};
		border-radius: 8px;
		/* [class*='dashboard__'] {
		
	} */
		& > * {
			display: flex;
			width: 50%;
			justify-content: space-around;
		}

		&--body {
			color: ${({ toBePaidTotal, theme }) =>
				toBePaidTotal > 0 ? theme.colors.primary : ''};
		}
		&--footer {
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
	.dashboard__body {
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
			align-self: center;
			text-align: center;
			width: 15%;
			padding: 0.2em;
			flex-grow: 1;
		}
		.actions {
			display: flex;
			width: 45%;
		}
	}
`;
