import InvoiceType from '../types/Invoice.d';
import { createDateInput } from '../utils/PDFcreate';
import { calculateTotal } from '../utils/parseInvoices';
const initialState: InvoiceType = {
	id: '',
	isPaid: false,
	total: 0,
	dateDue: createDateInput(),
	dateCreated: createDateInput(),
	client: {
		id: 0,
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		address: '',
		city: '',
		zipCode: ''
	},
	company: {
		companyName: '',
		address: '',
		phoneNumber: '',
		city: '',
		zipCode: '',
		email: ''
	},
	products: []
};

export default (state = initialState, action: any) => {
	const { type, payload } = action;
	switch (type) {
		case 'ADD_PRODUCT':
			return {
				...state,
				products: [...state.products, payload],
				total: calculateTotal([...state.products, payload])
			};
		case 'REMOVE_PRODUCT':
			return {
				...state,
				products: [
					...state.products.slice(0, payload.index),
					...state.products.slice(payload.index + 1)
				]
			};
		case 'SET_DUE_DATE':
			return {
				...state,
				dateDue: payload
			};
		case 'MARK_PAID':
			return {
				...state,
				isPaid: payload
			};
		case 'SET_CLIENT':
			return {
				...state,
				client: { ...payload }
			};
		case 'SET_COMPANY':
			return {
				...state,
				company: { ...payload }
			};
		case 'LOAD_INVOICE':
			return {
				...payload
			};
		case 'RESET':
			return {
				...initialState
			};
		default:
			return state;
	}
};
