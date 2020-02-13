const initialState = {
	isLoggedIn: false,
	email: null,
	id: null,
	firstName: null,
	lastName: null
};

export default (state = initialState, action: any) => {
	const { type, payload } = action;
	switch (type) {
		case 'LOGIN':
			return {
				...initialState,
				isLoggedIn: true,
				...payload
			};
		case 'LOGOUT':
			return {
				...initialState
			};
		default:
			return state;
	}
};
