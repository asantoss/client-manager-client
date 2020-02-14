import React, { useState, useEffect } from 'react';
import Modal from '../Modal';
import ClientInformation from '../components/Forms/ClientInformation';
import { IconButton } from '@material-ui/core';
import ProductPanel from '../components/Forms/ProductPanel';
import { useSelector, useDispatch } from 'react-redux';
import { AddCircle } from '@material-ui/icons';
import { useLocation } from 'react-router-dom';
import { useTransition } from 'react-spring';
import { MyDocument } from '../components/createPdf';
import { Button, InvoiceCreatorContainer, ProductItem } from '../styles/index';
import ClientPanel from '../components/Forms/ClientPanel';
import { animated } from 'react-spring';

export default function InvoiceCreator() {
	const [isProductOpen, setProductOpen] = useState(false);
	const [isViewer, setisViewerOpen] = useState(false);
	const productTransition = useTransition(isProductOpen, null, {
		from: { marginTop: 200 },
		enter: { marginTop: 0 },
		leave: { opacity: 0, marginTop: 200, display: 'none' },
		config: { duration: 500 }
	});
	const viewerTransition = useTransition(isViewer, null, {
		from: { marginTop: 200, height: 0 },
		enter: { marginTop: 0 },
		leave: { opacity: 0, marginTop: 200, display: 'none' },
		config: { duration: 500 }
	});

	const [isClientOpen, setClientOpen] = useState(false);
	const clientTransition = useTransition(isClientOpen, null, {
		from: { marginTop: 200 },
		enter: { marginTop: 0 },
		leave: { opacity: 0, marginTop: 200, display: 'none' },
		config: { duration: 500 }
	});
	const invoiceData = useSelector((state: any) => state.invoice);
	const { state } = useLocation();
	const dispatch = useDispatch();
	const handleShowViewer = () => {
		if (!isProductOpen) {
			setisViewerOpen(!isViewer);
		}
	};
	useEffect(() => {
		if (state) {
			dispatch({
				type: 'SET_CLIENT',
				payload: { ...state }
			});
		}
	}, [state, dispatch]);

	const totalCost = invoiceData.products.reduce(
		(prev: number, acc: any) => {
			if (acc.quantity) {
				return prev + acc.price * acc.quantity;
			}
			return prev + acc.price;
		},
		0
	);
	const tax = totalCost * 0.07;

	return (
		<InvoiceCreatorContainer>
			<div className='invoice-panel'>
				<h2>CUSTOMER</h2>
				<hr />
				{/* {isClientOpen && (
					<ClientInformation
						setClientOpen={
							setClientOpen
						}
						isClientOpen={
							isClientOpen
						}
					/>
				)} */}
				{!invoiceData.client.firstName &&
				!invoiceData.client.email ? (
					<IconButton
						className='panel-actions'
						onClick={() => {
							setClientOpen(
								!isClientOpen
							);
						}}>
						<AddCircle />{' '}
						<p>
							Add
							Customer
							Information
						</p>
					</IconButton>
				) : (
					<>
						<p>
							{
								invoiceData
									.client
									.firstName
							}{' '}
							{
								invoiceData
									.client
									.lastName
							}
						</p>
						<p>
							{
								invoiceData
									.client
									.email
							}
						</p>
					</>
				)}
			</div>
			<div className='invoice-panel'>
				<hr />
				<h2>Products</h2>
				<hr style={{ margin: 0 }} />
				{invoiceData.products &&
					invoiceData.products.map(
						(
							product: any,
							index: number
						) => {
							return (
								<ProductItem
									onClick={() => {
										dispatch(
											{
												type:
													'REMOVE_PRODUCT',
												payload: {
													index
												}
											}
										);
									}}>
									<p>
										<span>
											Name:{' '}
										</span>
										{
											product.productName
										}
									</p>
									{product.quantity >
										0 && (
										<p>
											<span>
												Qty.
											</span>
											{
												product.quantity
											}
										</p>
									)}
									<p>
										<span>
											Price
										</span>
										{
											product.price
										}
									</p>{' '}
								</ProductItem>
							);
						}
					)}

				{productTransition.map(
					({ item, key, props }) => {
						if (item) {
							return (
								<Modal
									key={
										key
									}>
									<ProductPanel
										style={
											props
										}
										setProductOpen={
											setProductOpen
										}
									/>
								</Modal>
							);
						}
						return null;
					}
				)}

				{viewerTransition.map(
					({ item, key, props }) => {
						//@ts-ignore
						return (
							item &&
							!isProductOpen && (
								<Modal
									key={
										key
									}>
									<animated.div
										style={
											props
										}>
										<MyDocument
											setIsViewerOpen={
												setisViewerOpen
											}
											invoiceData={
												invoiceData
											}
										/>
									</animated.div>
								</Modal>
							)
						);
					}
				)}

				{clientTransition.map(
					({ item, key, props }) => {
						return (
							item &&
							!isProductOpen &&
							!isViewer && (
								<Modal
									key={
										key
									}>
									<animated.div
										style={
											props
										}>
										<ClientPanel
											setClientOpen={
												setClientOpen
											}
										/>
									</animated.div>
								</Modal>
							)
						);
					}
				)}
				<IconButton
					className='panel-actions'
					onClick={() => {
						setProductOpen(
							!isProductOpen
						);
					}}>
					<AddCircle />
					<p>Add Product</p>
				</IconButton>
			</div>
			<div className='invoice-panel'>
				<hr />
				<h2>Details</h2>
				<hr />
				<h4>Tax: {converToCurrency(tax)} $</h4>
				<h3>
					Total:{' '}
					{converToCurrency(
						tax + totalCost
					)}{' '}
					$
				</h3>
				<div className='invoice-actions'>
					<Button className='success'>
						Save
					</Button>
					<Button
						className='success'
						onClick={
							handleShowViewer
						}>
						Save PDF
					</Button>
					<Button
						className='success'
						onClick={
							handleShowViewer
						}>
						Send
					</Button>
				</div>
			</div>
		</InvoiceCreatorContainer>
	);
}

function converToCurrency(number: number): string {
	return new Intl.NumberFormat('en-us', {
		style: 'currency',
		currency: 'USD'
	}).format(number);
}
