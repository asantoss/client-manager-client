import React from 'react';
import jspdf from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import { MainActions, Button } from '../styles';
import { renderToString } from 'react-dom/server';

function getFormattedDate() {
	const date = new Date();
	let year = date.getFullYear();
	let month = (1 + date.getMonth()).toString().padStart(2, '0');
	let day = date
		.getDate()
		.toString()
		.padStart(2, '0');

	return month + '/' + day + '/' + year;
}

function createRawHtml(data) {
	const { client, products, company } = data;
	return `
	<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<style>
	
	</style>
  </head>
  <body>
	<div class="invoice-container">
	  <div id="invoice-top">
	  <div>
	  <h2>${company.companyName}</h2>
		<span>${company.email}</span>
		<span>${company.phoneNumber}</span>
		</div>
	  <div>
		<h2>Quote</h2>
		<span>Issued: ${getFormattedDate()}</span>
		<span>Payment Due: May 27, 2015</span>
	  </div>
		</div>
	  <div id="invoice-mid">
		<div class="client-info"><h2>Client Name</h2>
		  <span>${client.firstName} ${client.lastName}</span>
		  <span>${client.phoneNumber}</span>
		</div>
	  </div>
	  <div id="invoice-bottom">
		<table>
	
		<tbody>
		<tr class="tabletitle">
		<td class="item"><h3>Item Description</h3></td>
		<td class="quantity"><h3>Qty.</h3></td>
		<td class="price"><h3>Price</h3></td>
		<td class="sub-total"><h3>Sub-Total</h3></td>
		</tr>
		<tr class="service">
		  ${products
				.map(product => {
					return `<td class="tableitem"><p class="itemtext">${
						product.productName
					}</p>
			</td><td class="tableitem"><p class="itemtext">${product.quantity}</p></td>
			<td class="tableitem"><p class="itemtext">${product.price}</p></td> 
			<td class="tableitem"><p class="itemtext">${product.price *
				product.quantity}</p></td>                  
			  `;
				})
				.join('')}
		  </tr>
					<tr class="tabletitle">
			  <td></td>
			  <td></td>
			  <td><h2>Total</h2></td>
			  <td class="payment"><h2>${products.reduce((prev, acc) => {
					return prev + acc.price * acc.quantity;
				}, 0)}</h2></td>
			</tr>
			 </tbody>
		  </table>
	  </div>
	</div>
  </body>
  </html>
	`;
}

const Print = ({ data }) => {
	const { company, products, client } = data;
	return (
		<PDFStyling id='invoice'>
			<div className='invoice-container'>
				<div id='invoice-top'>
					<div>
						<h2>{company.companyName}</h2>
						<span>{company.email}</span>
						<span>{company.phoneNumber}</span>
					</div>
					<div>
						<h2>Quote</h2>
						<span>Issued: {getFormattedDate()}</span>
						<span>Payment Due: {getFormattedDate()}</span>
					</div>
				</div>
				<div id='invoice-mid'>
					<div className='client-info'>
						<h2>
							{client.firstName} {client.lastName}
						</h2>
						<span>{client.phoneNumber}</span>
						<span>{client.email}</span>
					</div>
				</div>
				<div id='invoice-bottom'>
					<table id='product-table'>
						<tbody>
							<tr className='tabletitle'>
								<td className='item'>
									<h3>Item Description</h3>
								</td>
								<td className='quantity'>
									<h3>Qty.</h3>
								</td>
								<td className='price'>
									<h3>Price</h3>
								</td>
								<td className='sub-total'>
									<h3>Sub-Total</h3>
								</td>
							</tr>

							{products.map((product, index) => {
								return (
									<tr key={index} className='service'>
										<td className='tableitem'>
											<p className='itemtext'>{product.productName}</p>
										</td>
										<td className='tableitem'>
											<p className='itemtext'>{product.quantity}</p>
										</td>
										<td className='tableitem'>
											<p className='itemtext'>{product.price}</p>
										</td>
										<td className='tableitem'>
											<p className='itemtext'>
												{product.price * product.quantity}
											</p>
										</td>
									</tr>
								);
							})}
							<tr className='tabletitle'>
								<td></td>
								<td></td>
								<td>
									<h2>Total</h2>
								</td>
								<td className='payment'>
									<h2>
										{products.reduce((prev, acc) => {
											return prev + acc.price * acc.quantity;
										}, 0)}
									</h2>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</PDFStyling>
	);
};

const CreatePdf = ({ setViewerOpen, data }) => {
	const handleDownload = () => {
		debugger;
		const body = data.products.map(product => {
			return Object.keys(product).map(key => {
				return product[key];
			});
		});
		const doc = new jspdf();
		doc.autoTable({
			head: [['Item', 'Qty.', 'Price', 'Sub-Total']],
			body: body
		});
		doc.save('PDF');
	};
	// html2canvas().them(canvas => {})
	return (
		<>
			<MainActions closeFunction={setViewerOpen} pageName='PDf' />
			<Print data={data} />
			<Button onClick={handleDownload}>Download</Button>
		</>
	);
};

const PDFStyling = styled.div`
	background-color: #fdfdfd;
	max-width: 600px;
	font-family: 'Roboto', sans-serif;
	[id*='invoice-'] {
		display: flex;
		margin: 0 auto;
		width: 600px;
		justify-content: space-between;
		align-items: center;
		div {
			display: flex;
			flex-direction: column;
		}
	}
	h2 {
		margin: 0;
	}
	h3 {
		font-size: 0.9em;
	}
	span {
		color: #666;
		font-size: 0.7em;
		line-heigth: 1.2em;
	}

	[id*='invoice-'] {
		/* Targets all id with 'col-' */
		border-bottom: 1px solid #eee;
		padding: 30px;
	}

	#invoice-top {
		min-height: 120px;
	}
	#invoice-mid {
		min-height: 120px;
	}
	#invoice-bot {
		min-height: 250px;
	}
	table {
		width: 100%;
	}

	td {
		padding: 5px 0 5px 15px;
		border: 1px solid #eee;
	}
	.tabletitle {
		padding: 5px;
		background: #eee;
	}

	.service {
		border: 1px solid #eee;
	}
	.item {
		width: 50%;
	}
	.itemtext {
		font-size: 0.9em;
	}
`;

export default CreatePdf;
