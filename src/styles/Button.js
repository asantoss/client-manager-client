import styled from 'styled-components';

export default styled.button`
	color: #fff;
	padding: 6px 16px;
	min-width: 64px;
	transition: background-color 250ms;
	line-height: 1.75;
	border-radius: 5px;
	text-transform: uppercase;
	margin: 0.5em;
	font-weight: 700;
	font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	letter-spacing: 0.02857em;
	border: 0;
	cursor: pointer;
	background-color: ${(props) => props.theme.colors.primary};
	/* align-self: ${({ align }) => typeof align === 'string' && `${align}`}; */
	&:hover {
		opacity: 0.5;
	}

	${(props) =>
		Object.keys(props.theme.colors.variants).map((variant) => {
			return `
		&.${variant}{
			background-color: ${props.theme.colors.variants[variant]}
		}
		`;
		})}
`;
