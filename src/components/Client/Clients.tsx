import * as React from 'react';
import { GET_CLIENTS } from '../../apollo/constants';
import { useLazyQuery } from '@apollo/react-hooks';
import { Client as ClientType } from '../../types/Invoice';
import { ClientContainer } from '.';

import Client from './Client';

export default function Clients() {
	const [clients, setClients] = React.useState<ClientType[]>([]);
	let allClients = React.useRef<ClientType[]>([]);
	const [loadClients, { loading, error, data }] = useLazyQuery(GET_CLIENTS);
	React.useEffect(() => {
		loadClients();
		if (data) {
			if (data.getMe.clients) {
				setClients(s => [...data.getMe.clients]);
				allClients.current = [...data.getMe.clients];
			}
		}
	}, [loadClients, data]);
	if (loading) return <p>loading....</p>;
	if (error) return <p>Had some trouble making this request</p>;
	const handleSearch = (e: any) => {
		e.preventDefault();
		const searchParam = e.target.value.toLowerCase();
		if (searchParam) {
			return setClients(s =>
				s.filter(client => {
					const foundInFirstName =
						client.firstName.toLowerCase().indexOf(searchParam) > -1;
					const foundInLastName =
						client.lastName.toLowerCase().indexOf(searchParam) > -1;
					const foundInEmail =
						client.email.toLowerCase().indexOf(searchParam) > -1;
					return foundInFirstName || foundInLastName || foundInEmail;
				})
			);
		} else {
			return setClients(s => [...allClients.current]);
		}
	};
	return (
		<ClientContainer>
			<input placeholder='Search' type='text' onChange={handleSearch} />
			{!!clients.length ? (
				clients.map((client: ClientType) => {
					return (
						<div key={client.id?.toString()}>
							<Client client={client} />
						</div>
					);
				})
			) : (
				<p>No Clients</p>
			)}
		</ClientContainer>
	);
}
