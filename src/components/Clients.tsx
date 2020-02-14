import React from 'react';
import { GET_CLIENTS } from '../apollo/constants';
import { useQuery } from '@apollo/react-hooks';
import { Client as ClientType } from '../types/Invoice';
import { ClientContainer } from '../styles/Clients';

import Client from './Client';

export default function Clients() {
	const { loading, error, data } = useQuery(GET_CLIENTS);
	if (loading) return <p>loading....</p>;
	if (error) return <p>Had some trouble making this request</p>;
	if (data && data.getMe) {
		const { clients } = data.getMe;
		return (
			<ClientContainer>
				{clients.map((client: ClientType) => {
					return (
						<div
							key={client.id?.toString()}>
							<Client
								client={
									client
								}
							/>
						</div>
					);
				})}
			</ClientContainer>
		);
	}
	return <p>Loading...</p>;
}
