import InvoiceType from '../types/Invoice';

const initialState: AuthState = {
	isLoggedIn: false,
	email: '',
	id: 0,
	firstName: '',
	lastName: '',
	clients: [],
	invoices: []
};

export interface AuthState {
	isLoggedIn: Boolean;
	email: string;
	id: number;
	firstName: string;
	lastName: string;
	clients: [];
	invoices: InvoiceType[];
}

export default (state: AuthState = initialState, action: any) => {
	const { type, payload } = action;
	switch (type) {
		case 'LOGIN':
			return {
				...state,
				isLoggedIn: true,
				...payload
			};
		case 'LOGOUT':
			return {
				...initialState
			};
		case 'SET_INVOICES':
			return {
				...state,
				invoices: payload
			};
		default:
			return state;
	}
};
