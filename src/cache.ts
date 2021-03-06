import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

let clientLink = process.env.REACT_APP_API_URI;
if (process.env.NODE_ENV !== 'production') {
	clientLink = 'localhost:3000';
}
const cache = new InMemoryCache({ addTypename: false });
const link = new HttpLink({
	uri: clientLink,
	credentials: 'include',
	fetchOptions: {
		credentials: 'include',
	},
});
export const client = new ApolloClient({
	cache,
	link,
	name: 'React Front End Client',
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network',
		},
		query: {
			fetchPolicy: 'network-only',
			errorPolicy: 'all',
		},
		mutate: {
			errorPolicy: 'all',
		},
	},
});
