import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import { IconButton } from '@material-ui/core';
import ProductPanel from '../components/Forms/ProductPanel';
import { useSelector, useDispatch } from 'react-redux';
import { AddCircle } from '@material-ui/icons';
import { useLocation, useHistory } from 'react-router-dom';
import { useTransition } from 'react-spring';
import { Button, InvoiceCreatorContainer, ProductItem } from '../styles/index';
import ClientPanel from '../components/Forms/ClientPanel';
import { animated } from 'react-spring';
import { makePDf, converToCurrency, createDateInput } from '../utils/PDFcreate';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_INVOICE } from '../apollo/constants';

export default function InvoiceCreator() {
	const [errorMessage, setErrorMessage] = useState('');
	const [isProductOpen, setProductOpen] = useState(false);
	const productTransition = useTransition(isProductOpen, null, {
		from: { marginTop: 200 },
		enter: { marginTop: 0 },
		leave: { opacity: 0, marginTop: 200, display: 'none' },
		config: { duration: 200 }
	});
	const history = useHistory();
	const [saveInvoice] = useMutation(CREATE_INVOICE);
	const [isClientOpen, setClientOpen] = useState(false);
	const clientTransition = useTransition(isClientOpen, null, {
		from: { marginTop: 200 },
		enter: { marginTop: 0 },
		leave: { opacity: 0, marginTop: 200, display: 'none' },
		config: { duration: 200 }
	});
	const invoiceData = useSelector((state: any) => state.invoice);
	const { state } = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (state) {
			dispatch({
				type: 'SET_CLIENT',
				payload: { ...state }
			});
		}
	}, [state, dispatch]);

	const totalCost = invoiceData.products.reduce((prev: number, acc: any) => {
		if (acc.quantity) {
			return prev + acc.price * acc.quantity;
		}
		return prev + acc.price;
	}, 0);
	const handleSaveInvoice = () => {
		setErrorMessage('');
		if (invoiceData.products.length === 0) {
			return;
		}
		saveInvoice({
			variables: {
				ClientId: Number.parseInt(invoiceData.client.id),
				products: [...invoiceData.products],
				isPaid: false,
				total: totalCost,
				dateDue: invoiceData.dateDue
			}
		})
			.then(res => {
				debugger;
				const { data } = res;
				if (data.createInvoice.id) {
					history.push('/invoices');
				}
			})
			.catch(errors => {
				setErrorMessage(errors.message);
			});
	};
	// const tax = totalCost * 0.07;
	return (
		<InvoiceCreatorContainer>
			<h3>{errorMessage}</h3>
			<div className='invoice-panel'>
				<h2>CUSTOMER</h2>
				<hr />
				{!invoiceData.client.firstName && !invoiceData.client.email ? (
					<IconButton
						className='panel-actions'
						onClick={() => {
							setClientOpen(!isClientOpen);
						}}>
						<AddCircle /> <p>Add Customer Information</p>
					</IconButton>
				) : (
					<div onClick={() => setClientOpen(!isClientOpen)}>
						<p>
							{invoiceData.client.firstName} {invoiceData.client.lastName}
						</p>
						<p>{invoiceData.client.email}</p>
					</div>
				)}
			</div>
			<div className='invoice-panel'>
				<hr />
				<h2>Products</h2>
				<hr style={{ margin: 0 }} />
				{invoiceData.products &&
					invoiceData.products.map((product: any, index: number) => {
						return (
							<ProductItem
								key={index}
								onClick={() => {
									dispatch({
										type: 'REMOVE_PRODUCT',
										payload: {
											index
										}
									});
								}}>
								<p>
									<span>Name: </span>
									{product.productName}
								</p>
								{product.quantity > 0 && (
									<p>
										<span>Qty.</span>
										{product.quantity}
									</p>
								)}
								<p>
									<span>Price</span>
									{product.price}
								</p>{' '}
							</ProductItem>
						);
					})}

				{productTransition.map(({ item, key, props }) => {
					if (item) {
						return (
							<Modal key={key}>
								<animated.div style={props}>
									<ProductPanel setProductOpen={setProductOpen} />
								</animated.div>
							</Modal>
						);
					}
					return null;
				})}

				{clientTransition.map(({ item, key, props }) => {
					return (
						item &&
						!isProductOpen && (
							<Modal key={key}>
								<animated.div style={props}>
									<ClientPanel setClientOpen={setClientOpen} />
								</animated.div>
							</Modal>
						)
					);
				})}
				<IconButton
					className='panel-actions'
					onClick={() => {
						setProductOpen(!isProductOpen);
					}}>
					<AddCircle />
					<p>Add Product</p>
				</IconButton>
			</div>
			<div className='invoice-panel'>
				<hr />
				<h2>Details</h2>
				<hr />
				<h3>
					Due Date:{' '}
					<input
						type='date'
						name='dueDate'
						min={createDateInput()}
						value={invoiceData.dateDue}
						onChange={e => {
							dispatch({ type: 'SET_DUE_DATE', payload: e.target.value });
						}}
					/>
				</h3>
				<h3>Total: {converToCurrency(totalCost)} $</h3>
				<div className='invoice-actions'>
					<Button className='success' onClick={handleSaveInvoice}>
						Save
					</Button>
					<Button className='success' onClick={() => makePDf(invoiceData)}>
						Download PDF
					</Button>
				</div>
			</div>
		</InvoiceCreatorContainer>
	);
}
