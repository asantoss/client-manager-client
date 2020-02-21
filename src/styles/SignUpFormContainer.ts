import styled from 'styled-components';

export default styled.form`
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
