import styled from 'styled-components';

interface ButtonProps {
	variant?: string;
	align?: string;
}

export default styled('button')<ButtonProps>`
	color: #fff;
	padding: 6px 16px;
	min-width: 64px;
	transition: background-color 250ms;
	line-height: 1.75;
	border-radius: 4px;
	text-transform: uppercase;
	margin: 0.5em;
	font-weight: 700;
	font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	letter-spacing: 0.02857em;
	border: 0;
	cursor: pointer;
	background-color: ${props =>
		props.variant
			? props.theme.colors.variants[props.variant]
			: props.theme.colors.primary};
	align-self: ${({ align }) => align && `${align}`};
	&:hover {
		opacity: 0.5;
	}
`;
