import gql from 'graphql-tag';

export const LOGIN = gql`
	query login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
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
