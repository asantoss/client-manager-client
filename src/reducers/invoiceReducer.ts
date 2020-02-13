const initialState = {
	client: {
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
		zipCode: ''
	},
	products: []
};

export default (state = initialState, action: any) => {
	const { type, payload } = action;
	switch (type) {
		case 'ADD_PRODUCT':
			return {
				...state,
				products: [...state.products, payload]
			};
		case 'REMOVE_PRODUCT':
			return {
				...state,
				products: [
					...state.products.slice(
						0,
						payload.index
					),
					...state.products.slice(
						payload.index + 1
					)
				]
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
		default:
			return state;
	}
};
