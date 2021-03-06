import React, { useState, useEffect } from 'react';
import Modal from '../../Modal';
import { IconButton, Switch } from '@material-ui/core';
import ProductPanel from '../../components/Products/ProductPanel';
import { useSelector, useDispatch } from 'react-redux';
import { AddCircle } from '@material-ui/icons';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Button } from '../../styles/index';
import { InvoiceCreatorContainer } from '.';
import ClientPanel from '../../components/Client/ClientPanel';
import {
	makePDf,
	converToCurrency,
	createDateInput,
} from '../../utils/PDFcreate';
import { useMutation } from '@apollo/react-hooks';
import {
	CREATE_INVOICE,
	UPDATE_INVOICE,
	CREATE_CLIENT,
} from '../../apollo/constants';
import { saveInvoiceToLocalStorage } from '../../utils/localStorageFuncs';

export default function InvoiceCreator() {
	const [errorMessage, setErrorMessage] = useState('');
	const [isProductOpen, setProductOpen] = useState(false);
	const history = useHistory();
	const [saveInvoice] = useMutation(CREATE_INVOICE);
	const [updateInvoice] = useMutation(UPDATE_INVOICE);
	const [createClient] = useMutation(CREATE_CLIENT);
	const { type } = useParams();
	const [isClientOpen, setClientOpen] = useState(false);
	const { invoice: invoiceData, user } = useSelector((state: any) => state);
	const { state } = useLocation();
	const { isLoggedIn, id } = user;
	const dispatch = useDispatch();

	useEffect(() => {
		if (state) {
			dispatch({
				type: 'SET_CLIENT',
				payload: { ...state },
			});
		}
	}, [state, dispatch, invoiceData.client.id]);

	const totalCost = invoiceData.products.reduce((prev: number, acc: any) => {
		if (acc.quantity) {
			return prev + acc.price * acc.quantity;
		}
		return prev + acc.price;
	}, 0);
	const handleSaveInvoice = () => {
		setErrorMessage('');
		if (
			invoiceData.products.length === 0 ||
			!invoiceData.client.firstName ||
			!invoiceData.client.lastName ||
			!invoiceData.client.email
		) {
			setErrorMessage('Please add some data to your invoice.');
			return;
		}
		if (!isLoggedIn) {
			try {
				saveInvoiceToLocalStorage({
					...invoiceData,
					total: totalCost,
				});
				dispatch({ type: 'RESET' });
				history.push('/invoices');
			} catch (e) {
				setErrorMessage("Couldn't save invoice to local storage.");
			}
		}
		switch (type) {
			case 'creator':
				if (isLoggedIn) {
					return saveInvoice({
						variables: {
							ClientId: Number.parseInt(invoiceData.client.id),
							products: [...invoiceData.products],
							isPaid: invoiceData.isPaid,
							total: totalCost,
							dateDue: invoiceData.dateDue,
						},
					})
						.then((res) => {
							const { data } = res;
							if (data.createInvoice.id) {
								dispatch({ type: 'RESET' });
							}
						})
						.then(() => history.push('/invoices'))
						.catch(() => {
							if (!Number(invoiceData.client.id)) {
								setErrorMessage('Had to create new client!');
								createClient({
									variables: {
										...invoiceData.client,
										UserId: Number(id),
									},
								}).then(({ data }) => {
									return dispatch({
										type: 'SET_CLIENT',
										payload: {
											...invoiceData.client,
											id: data.createClient.id,
										},
									});
								});
							}
						});
				}
				break;
			case 'editor':
				if (isLoggedIn) {
					return updateInvoice({
						variables: {
							id: Number.parseInt(invoiceData.id),
							ClientId: Number.parseInt(invoiceData.client.id),
							products: [...invoiceData.products],
							isPaid: invoiceData.isPaid,
							total: totalCost,
							dateDue: invoiceData.dateDue,
						},
					})
						.then((res) => {
							const { data } = res;
							if (data.updateInvoice?.id) {
								dispatch({ type: 'RESET' });
							}
						})
						.then(() => history.push('/invoices'))
						.catch((errors) => {
							setErrorMessage(errors.message);
						});
				}
				break;
			default:
				return;
		}
	};
	// const tax = totalCost * 0.07;
	return (
		<InvoiceCreatorContainer>
			{errorMessage && <span>{errorMessage}</span>}
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
							<div
								className='product'
								key={index}
								onClick={() => {
									dispatch({
										type: 'REMOVE_PRODUCT',
										payload: {
											index,
										},
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
							</div>
						);
					})}
				{isProductOpen && (
					<Modal>
						<ProductPanel setProductOpen={setProductOpen} />
					</Modal>
				)}

				{isClientOpen && !isProductOpen && (
					<Modal>
						<ClientPanel setClientOpen={setClientOpen} />
					</Modal>
				)}
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
						required
						type='date'
						name='dueDate'
						min={createDateInput()}
						value={invoiceData.dateDue}
						onChange={(e) => {
							dispatch({ type: 'SET_DUE_DATE', payload: e.target.value });
						}}
					/>
				</h3>
				<h3>
					Paid
					<Switch
						checked={invoiceData.isPaid}
						onChange={() =>
							dispatch({
								type: 'MARK_PAID',
								payload: !invoiceData.isPaid,
							})
						}
						inputProps={{ 'aria-label': 'Mark as paid' }}
					/>
				</h3>
				<h3>Total: {converToCurrency(totalCost)} $</h3>
				<div className='invoice-actions'>
					<Button className='success' onClick={handleSaveInvoice}>
						Save
					</Button>
					<Button
						className='success'
						onClick={() => {
							if (
								invoiceData.products.length === 0 ||
								!invoiceData.client.firstName ||
								!invoiceData.client.lastName ||
								!invoiceData.client.email
							) {
								return setErrorMessage('Please check your invoice Data!');
							}
							makePDf(invoiceData);
						}}>
						Download PDF
					</Button>
				</div>
			</div>
		</InvoiceCreatorContainer>
	);
}
