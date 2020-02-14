import Client from '../types/Invoice';

const initialState: AuthState = {
	isLoggedIn: false,
	email: '',
	id: 0,
	firstName: '',
	lastName: '',
	clients: []
};

export interface AuthState {
	isLoggedIn: Boolean;
	email: string;
	id: number;
	firstName: string;
	lastName: string;
	clients: [];
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
