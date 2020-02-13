const initialState = {
	isLoggedIn: false,
	email: null,
	id: null,
	firstName: null,
	lastName: null
};

export interface AuthState {
	isLoggedIn: Boolean;
	email: string;
	id: number;
	firstName: string;
	lastName: string;
}

export default (state: AuthState = initialState, action: any) => {
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
