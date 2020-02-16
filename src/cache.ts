import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
const cache = new InMemoryCache();
const link = new HttpLink({
	uri: '/graphql',
	credentials: 'same-origin'
});
export const client = new ApolloClient({
	cache,
	link,
	name: 'React Front End Client',
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network'
		},
		query: {
			fetchPolicy: 'network-only',
			errorPolicy: 'all'
		},
		mutate: {
			errorPolicy: 'all'
		}
	}
});
