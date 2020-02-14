import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, MainActions, ClientPanelStyled } from '../../styles';
import { Client } from '../../types/Invoice';
import { AppState } from '../../reducers/';
import ClientInformation from './ClientInformation';

interface ClientPanelProps {
	setClientOpen: Function;
	style?: Object;
	submit?: Function;
}

const ClientPanel: React.FC<ClientPanelProps> = ({ setClientOpen }) => {
	const [localProducts, setlocalProducts] = React.useState<Client[]>(
		[]
	);
	const dispatch = useDispatch();
	const clients = useSelector((state: AppState) => state.user.clients);
	const [newClient, setNewClient] = React.useState(false);
	const localStorageClients = localStorage.getItem('clients');
	React.useEffect(() => {
		//@ts-ignore
		if (localStorageClients) {
			//@ts-ignore
			setlocalProducts((s: any) => [
				...JSON.parse(localStorageClients)
			]);
		}
		return () => {};
	}, [localStorageClients]);
	const handleSetClient = (client: Client) => {
		dispatch({ type: 'SET_CLIENT', payload: client });
		setClientOpen(false);
	};
	return (
		<ClientPanelStyled className='invoice-panel'>
			<MainActions
				pageName='Client'
				closeFunction={() =>
					setClientOpen(false)
				}
			/>
			<div>
				<Button
					onClick={() =>
						setNewClient(
							!newClient
						)
					}>
					Add New Customer
				</Button>
			</div>
			{newClient ? (
				<ClientInformation
					isClientOpen={newClient}
					setClientOpen={setNewClient}
				/>
			) : (
				<div className='client-list'>
					{clients &&
						clients.map(
							(
								client: Client
							) => {
								return (
									<div
										onClick={() =>
											handleSetClient(
												client
											)
										}
										className='client'
										key={client.id?.toString()}>
										<h4>
											{`${client.firstName +
												client.lastName}`}
										</h4>
										<h5>
											{
												client.email
											}
										</h5>
									</div>
								);
							}
						)}
				</div>
			)}
		</ClientPanelStyled>
	);
};

export default ClientPanel;

function saveClientToLocalStorage(client: Client): void {
	const localStorageClients = localStorage.getItem('clients');
	let localStorageClientsParsed: Client[] | [] = [];
	if (typeof localStorageClients === 'string') {
		let localStorageClientsParsed = JSON.parse(
			localStorageClients
		);
	}
	const filteredClients = localStorageClientsParsed.filter(
		(item: Client, index: number) => {
			if (
				item.firstName === client.firstName &&
				item.email === client.email &&
				item.lastName === client.lastName
			) {
				return true;
			}
			return false;
		}
	);
	if (filteredClients.length > 0) {
		return;
	} else {
		return localStorage.setItem(
			'products',
			JSON.stringify([
				...localStorageClientsParsed,
				client
			])
		);
	}
}
