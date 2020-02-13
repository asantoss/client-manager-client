import styled from 'styled-components';

export const ProductForm = styled.form`
	display: flex;
	align-self: center;
	justify-content: space-evenly;
	flex-direction: column;
	width: 100%;
	flex-wrap: wrap;
	margin: 0 1em;
	height: 60vh;
	[name='price'],
	[name='quantity'] {
		width: 50px;
	}
	hr {
		width: 100%;
		border-color: black;
	}
	label {
		color: white;
		font-weight: 400;
	}
	input {
		color: white;
		margin: 0.8em;
		&.mui-focused fieldset {
			border-color: green;
		}
	}
	.product-type {
		color: white;
		width: 100%;
		font-weight: 400;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		p {
			flex-grow: 1;
			margin: 1em;
			font-size: 1.2em;
			text-align: center;
		}
		.active {
			border-bottom: 1px solid #f7a705;
			transition: border linear 0.3s;
		}
		& .qty {
			& > div {
				display: flex;
				flex-direction: column;
			}
		}
	}
	transition: all 2s;
	.product {
		display: flex;
		justify-content: space-between;
		text-align: left;
		padding: 0 1em;
		color: white;
		& > p {
			margin: 0.5em 0;
			display: flex;
			flex-direction: column;
			font-size: 0.9em;
			span {
				font-size: 0.7em;
			}
		}
	}
	.recently-used {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: white;
	}
`;
