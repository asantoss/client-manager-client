import styled from 'styled-components';

export const Bottombar = styled.nav`
	top: auto;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	width: 100vw;
	padding: 0 2em;
	min-height: 64px;
	z-index: 3;
	background-color: ${({ theme }) => theme.colors.foreground};

	a {
		color: ${({ theme }) => theme.colors.primary};
	}
	.current {
		opacity: 0.8;
		& :hover {
			opacity: 0.3;
		}
	}
`;
