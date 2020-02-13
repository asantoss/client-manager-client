import styled from 'styled-components';

export default styled.form`
	display: flex;
	padding: 1.5em;
	flex-direction: column;
	justify-content: space-evenly;
	& > button {
		align-self: flex-end;
		width: 100px;
	}
	label {
		text-transform: capitalize;
	}
	& > div {
		margin-bottom: 1em;
	}
`;
