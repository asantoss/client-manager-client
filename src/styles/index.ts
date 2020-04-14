import styled, { createGlobalStyle } from 'styled-components';
import { animated } from 'react-spring';
import { Toolbar as MaterialToolbar } from '@material-ui/core';
export { default as Button } from './Button';
export { MainActions } from './MainActions';
//@ts-ignore
export const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}
body {
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 12px;
  margin: 70px auto; 
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.product{
	display: grid;
	grid-template-columns: 3fr 1fr 1fr;
	grid-gap: 1em;
	text-align: left;
	padding: 0 1em;
	color: white;
	p {
		margin: 0.5em 0;
		display: flex;
		flex-direction: column;
		font-size: 0.9em;
		span {
			font-size: 0.7em;
		}
		&:last-child {
			text-align: right;
		}
	}
	:hover {
		cursor: pointer;
		opacity: 0.5;
		border: 0.5px solid lightgrey;
	}
}

.client-panel{
	margin: 1em auto;
	align-items: center;
	.client-list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.client {
		cursor: pointer;
		display: grid;
		grid-template-columns: 3fr 1fr 1fr;
		align-items: center;
		justify-items: start;
		font-size: 1.2em;
		padding: 1em 0;
		color: white;
		margin: 0.2em;
		grid-gap: 1em;
		* {
			margin: 0.1em 0;
		}
		:hover {
			cursor: pointer;
			border: 1px solid ${({ theme }) => theme.colors.background};
		}
		&-name,&-email{
			grid-column: span 2;
		}
		button{
			grid-column: 3;
			grid-row: 1;
			justify-self: center;
			padding: 0;
			color: ${({ theme }) => theme.colors.variants.success};
			&.delete {
				grid-row: 2;
				color: ${({ theme }) => theme.colors.variants.danger};
			}
			}
	}

.client-form{
	display: flex;
	flex-direction: column;
	width: 80%;
	align-content: center;
	label {
		text-transform: capitalize;
	}
	.client_input {
		background-color: white;
		margin: 0.5em;
	}
	button {
		justify-self: center;
		grid-column: span 2;
		background-color: ${({ theme }) => theme.colors.primary};
	}
}
}

`;

export const ProductItem = styled.div``;

export const Toolbar = styled(MaterialToolbar)`
	justify-content: space-between;
	button {
		color: #61605e;
	}
	.current > button {
		color: #f7a705;
	}
`;

export const LayoutStyled = styled.div`
	color: white;
	padding: 0.5em;
	max-width: 600px;
	margin: auto;
`;

export const ModalStyled = styled.div`
	z-index: 3;
	width: 100vw;
	min-height: 100%;
	position: fixed;
	top: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.9);
	display: flex;
	justify-content: center;
	.invoice-panel {
		position: absolute;
		width: 80%;
		max-width: 600px;
		top: 10px;
		display: flex;
		flex-direction: column;
		overflow: auto;
		padding: 1em;
		label {
			padding-left: 1em;
		}
		p {
			margin: 1em;
		}
		max-width: 700px;
		min-height: 80vh;
		background-color: ${(props) => props.theme.colors.foreground};
	}
`;

export const DocStyled = styled(animated.div)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${(props) => props.theme.colors.foreground};
	.viewer {
		width: 80%;
		height: 80%;
	}
`;
