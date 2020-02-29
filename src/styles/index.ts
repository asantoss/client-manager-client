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
  font-family: 'Hind', sans-serif;
  max-width: 600px;
  margin: 70px auto; 
}



`;

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
`;

export const ModalStyled = styled.div`
	z-index: 2;
	width: 100vw;
	height: 100%;
	margin-bottom: 56px;
	background-color: ${props => props.theme.colors.background};
	position: absolute;
	@media (min-width: 700px) {
		max-width: 600px;
	}
`;

export const DocStyled = styled(animated.div)`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${props => props.theme.colors.foreground};
	.viewer {
		width: 80%;
		height: 80%;
	}
`;
