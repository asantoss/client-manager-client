import React from 'react';
import {
	Grid,
	ExpansionPanel,
	ExpansionPanelSummary,
	Typography,
	ExpansionPanelDetails
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Button, ClientStyled } from '../styles/index';
export default function Client({ client, className }) {
	return (
		<ClientStyled className={className}>
			<ExpansionPanel className='client-panel'>
				<ExpansionPanelSummary
					expandIcon={<ExpandMore />}>
					<h5>
						{client.firstName}{' '}
						{client.lastName}
					</h5>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className='client-information'>
						<p>Phone Number:</p>
						<a
							href={`tel:${client.phoneNumber}`}>
							{
								client.phoneNumber
							}
						</a>{' '}
						<br />
						<p>Email:</p>
						<span>
							{
								client.email
							}
						</span>{' '}
						<br />
						<p>Address: </p>
						<span>
							{
								client.address
							}{' '}
							<br />{' '}
							{
								client.city
							}{' '}
							<br />{' '}
							{
								client.zipCode
							}
						</span>{' '}
						<div className='client-actions'>
							<Link
								to={{
									pathname: `/invoice/creator`,
									state: {
										...client
									}
								}}>
								<Button>
									Quote
								</Button>
							</Link>
							<Button variant='danger'>
								Delete
							</Button>
						</div>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</ClientStyled>
	);
}
