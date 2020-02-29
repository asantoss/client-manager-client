import styled from 'styled-components';

export const SignUpFormContainer = styled.form`
	background-color: ${({ theme }) => theme.colors.foreground};
	display: flex;
	padding: 1.5em;
	flex-direction: column;
	justify-content: space-evenly;
	color: white;
	& > button {
		align-self: flex-end;
		width: 100px;
	}
	label {
		text-transform: capitalize;
	}
	& > div {
		margin-bottom: 1em;
		background-color: white;
	}
`;

export const SignInForm = styled.form`
	color: white;
	padding: 1em;
	margin: auto;
	max-width: 550px;
	align-self: center;
	border-radius: 8px;
	background-color: ${props => props.theme.colors.foreground};
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	& > button {
		align-self: flex-end;
	}
	& > div {
		margin: 1em;
	}
	input {
		background: white;
	}
	a {
		margin: 1em;
		font-size: 1.5em;
		color: ${({ theme }) => theme.colors.primary};
	}
`;
