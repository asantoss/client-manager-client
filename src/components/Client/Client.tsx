import * as React from 'react';
import {
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Button } from '../../styles/index';
import { Client as ClientType } from '../../types/Invoice';
import { ClientStyled } from '.';

interface ClientProps {
	client: ClientType;
}

const Client: React.FC<ClientProps> = ({ client }) => {
	return (
		<ClientStyled>
			<ExpansionPanel className='client-panel'>
				<ExpansionPanelSummary expandIcon={<ExpandMore />}>
					<h5>
						{client.firstName} {client.lastName}
					</h5>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className='client-information'>
						<p>Phone Number:</p>
						<a href={`tel:${client.phoneNumber}`}>{client.phoneNumber}</a>{' '}
						<br />
						<p>Email:</p>
						<span>{client.email}</span> <br />
						<p>Address: </p>
						<span>
							{client.address} <br /> {client.city} <br /> {client.zipCode}
						</span>{' '}
						<div className='client-actions'>
							<Link
								to={{
									pathname: `/invoice/creator`,
									state: {
										...client
									}
								}}>
								<Button>Quote</Button>
							</Link>
							<Button className='danger'>Delete</Button>
						</div>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</ClientStyled>
	);
};
export default Client;
