import gql from 'graphql-tag';

export const LOGIN = gql`
	query login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			id
			firstName
			lastName
			email
			address
			phoneNumber
			companyName
			clients {
				id
				firstName
				lastName
				email
				phoneNumber
				address
				city
				zipCode
			}
		}
	}
`;
export const GET_CLIENTS = gql`
	query getMe {
		getMe {
			id
			firstName
			lastName
			clients {
				id
				firstName
				lastName
				email
				phoneNumber
				address
				city
				zipCode
				invoices {
					id
					dateDue
					total
					isPaid
					products {
						productName
						description
						quantity
						price
					}
				}
			}
		}
	}
`;

export const REGISTER = gql`
	mutation register(
		$firstName: String!
		$lastName: String!
		$email: String!
		$password: String!
		$phoneNumber: String
		$address: String
		$city: String
		$companyName: String
	) {
		register(
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
			companyName: $companyName
			city: $city
			address: $address
			phoneNumber: $phoneNumber
		) {
			firstName
			lastName
			id
		}
	}
`;

export const CREATE_INVOICE = gql`
	mutation createInvoice(
		$ClientId: Int!
		$products: [ProductsInput]
		$isPaid: Boolean
		$total: Int
		$dateDue: String
	) {
		createInvoice(
			ClientId: $ClientId
			products: $products
			isPaid: $isPaid
			total: $total
			dateDue: $dateDue
		) {
			client {
				firstName
				lastName
			}
			products {
				productName
				price
				quantity
			}
			id
			total
			isPaid
			total
			dateDue
		}
	}
`;

export const UPDATE_INVOICE = gql`
	mutation updateInvoice(
		$id: Int!
		$ClientId: Int
		$products: [ProductsInput]
		$isPaid: Boolean
		$total: Int
		$dateDue: String
	) {
		updateInvoice(
			id: $id
			ClientId: $ClientId
			products: $products
			isPaid: $isPaid
			total: $total
			dateDue: $dateDue
		) {
			client {
				firstName
				lastName
			}
			products {
				productName
				price
				quantity
			}
			id
			total
			isPaid
			total
			dateDue
		}
	}
`;

export const REMOVE_INVOICE = gql`
	mutation removeInvoice($id: Int) {
		removeInvoice(id: $id)
	}
`;
