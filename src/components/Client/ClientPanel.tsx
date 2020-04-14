import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MainActions } from '../../styles';
import { Client } from '../../types/Invoice';
import { AppState } from '../../reducers';
import ClientInformation from './ClientInformation';
import { IconButton } from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';

interface ClientPanelProps {
	setClientOpen: Function;
	style?: Object;
	submit?: Function;
}

const ClientPanel: React.FC<ClientPanelProps> = ({ setClientOpen }) => {
	const [localClients, setlocalClients] = React.useState<Client[]>([]);
	const dispatch = useDispatch();
	const clients = useSelector((state: AppState) => state.user.clients);
	const [newClient, setNewClient] = React.useState(false);
	React.useEffect(() => {
		//@ts-ignore
		const localStorageClients = JSON.parse(localStorage.getItem('clients'));
		if (localStorageClients) {
			setlocalClients((s: any) => [...localStorageClients]);
		}
		return () => {};
	}, []);
	const handleSetClient = (client: Client) => {
		dispatch({ type: 'SET_CLIENT', payload: client });
		saveClientToLocalStorage(client);
		setClientOpen(false);
	};
	const handleRemoveClient = (client: Client, index: number) => {
		const newClients = [
			...localClients.slice(0, index),
			...localClients.slice(index + 1),
		];
		localStorage.setItem('clients', JSON.stringify([...newClients]));
		setlocalClients(newClients);
	};
	return (
		<div className='invoice-panel client-panel'>
			<MainActions
				pageName='Client'
				closeFunction={() => setClientOpen(false)}
			/>
			<div>
				<Button onClick={() => setNewClient(!newClient)}>
					{!newClient ? 'Add New Customer' : 'Cancel'}
				</Button>
			</div>
			{newClient ? (
				<ClientInformation
					isClientOpen={newClient}
					setClientOpen={setClientOpen}
					saveToLocal={saveClientToLocalStorage}
				/>
			) : (
				<div className='client-list'>
					<div style={{ borderBottom: '1px dotted black', color: 'White' }}>
						<h5>Recently Used</h5>
						{localClients.map((client, index) => {
							return (
								<div className='client' key={index}>
									<span className='client-name'>{`${
										client.firstName + ' ' + client.lastName
									}`}</span>
									<span className='client-email'>{client.email}</span>
									<IconButton
										className='add'
										onClick={() => handleSetClient(client)}>
										<Add />
									</IconButton>
									<IconButton
										className='delete'
										onClick={() => handleRemoveClient(client, index)}>
										<Delete />
									</IconButton>
								</div>
							);
						})}
					</div>
					{clients &&
						clients.map((client: Client, index: number) => {
							return (
								<div
									onClick={() => handleSetClient(client)}
									className='client'
									key={index}>
									<span>{`${client.firstName + client.lastName}`}</span>
									<span>{client.email}</span>
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default ClientPanel;
function saveClientToLocalStorage(client: Client): void {
	//@ts-ignore
	const localStorageClients = JSON.parse(localStorage.getItem('clients'));
	if (localStorageClients) {
		const filteredClients = localStorageClients.filter(
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
				'clients',
				JSON.stringify([...localStorageClients, client])
			);
		}
	} else {
		return localStorage.setItem('clients', JSON.stringify([client]));
	}
}
