import * as React from 'react';
import { InvoicesContainer } from '.';
import InvoiceType from '../../types/Invoice';
import moment from 'moment';
import { IconButton } from '@material-ui/core';
import { Delete, Edit, Done, Close, CloudDownload } from '@material-ui/icons';
import { makePDf } from '../../utils/PDFcreate';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_INVOICE, GET_CLIENTS } from '../../apollo/constants';
import {
	parseInvoices,
	parseInvoicesFromLocal,
} from '../../utils/parseInvoices';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export interface Props {
	children?: React.ReactNode;
}
const today = new Date();

const InvoicesPage: React.FC<Props> = () => {
	const user = useSelector((state: any) => state.user);
	const { loading: queryLoading, data } = useQuery(GET_CLIENTS);
	const [removeInvoice] = useMutation(REMOVE_INVOICE);
	const [overDue, setOverDue] = React.useState<InvoiceType[]>([]);
	const [toBePaid, setToBePaid] = React.useState<InvoiceType[]>([]);
	const [invoices, setInvoices] = React.useState<InvoiceType[]>([]);
	const dispatch = useDispatch();
	const history = useHistory();
	React.useEffect(() => {
		if (user.isLoggedIn && data && data.getMe) {
			const [
				invoicesData,
				overDueData,
				toBePaidData,
			]: InvoiceType[][] = parseInvoices(data.getMe);
			setOverDue(() => [...overDueData]);
			setInvoices(() => [...invoicesData]);
			setToBePaid(() => [...toBePaidData]);
		} else {
			const [
				invoicesData,
				overDueData,
				toBePaidData,
			]: InvoiceType[][] = parseInvoicesFromLocal();
			setOverDue(() => [...overDueData]);
			setInvoices(() => [...invoicesData]);
			setToBePaid(() => [...toBePaidData]);
		}
	}, [data, user]);
	const handleView = async (invoice: InvoiceType) => {
		dispatch({ type: 'LOAD_INVOICE', payload: invoice });
		history.push('/invoice/editor');
	};
	const handleDownload = (invoice: InvoiceType) => {
		return makePDf(invoice);
	};

	const handleDelete = async (id: string, index: number) => {
		if (!user.isLoggedIn) {
			const localInvoicesJSON = localStorage.getItem('invoices');
			if (localInvoicesJSON) {
				const localInvoices = JSON.parse(localInvoicesJSON);
				const newData = [
					...localInvoices.slice(0, index),
					...localInvoices.slice(index + 1),
				];
				localStorage.setItem('invoices', JSON.stringify(newData));
				const [
					invoicesData,
					overDueData,
					toBePaidData,
				]: InvoiceType[][] = parseInvoicesFromLocal();
				setOverDue(() => [...overDueData]);
				setInvoices(() => [...invoicesData]);
				setToBePaid(() => [...toBePaidData]);
				return;
			}
		}
		const { data } = await removeInvoice({
			variables: {
				id: Number(id),
			},
		});
		if (data.removeInvoice === 'Sucess') {
			if (moment(invoices[index].dateDue).isAfter(today.getDate())) {
				setToBePaid((s) => [...s.slice(0, index), ...s.slice(index + 1)]);
			} else {
				setOverDue((s) => [...s.slice(0, index), ...s.slice(index + 1)]);
			}
			return setInvoices((s) => [...s.slice(0, index), ...s.slice(index + 1)]);
		}
	};
	if (queryLoading && user.isLoggedIn) {
		return <p>Loading.....</p>;
	}
	let overDueTotal = overDue.reduce((acc, curr) => (acc += curr.total), 0);
	let toBePaidTotal = toBePaid.reduce((acc, curr) => (acc += curr.total), 0);
	return (
		<InvoicesContainer
			overDueTotal={overDueTotal}
			toBePaidTotal={toBePaidTotal}>
			<div className='invoices__title'>
				<h2>Invoices</h2>
			</div>
			<div className='invoices__card'>
				<div className='invoices__card--toBePaid'>
					<h5>To be paid</h5>
					<div>
						<span>${toBePaidTotal}</span>
						<span>{toBePaid.length} Invoices</span>
					</div>
				</div>
				<div className='invoices__card--overDue'>
					<h5>Overdue</h5>
					<div>
						<span>${overDueTotal}</span>
						<span>{overDue.length} Invoices</span>
					</div>
				</div>
			</div>
			<div className='invoices__body'>
				{!invoices.length && 'No invoices'}
				{invoices.map((invoice, index) => {
					const { client, dateDue, isPaid, total, id } = invoice;
					return (
						<div className='invoices__body--invoice' key={index}>
							<div className='actions'>
								<div>
									<span>Delete</span>
									<IconButton
										onClick={() => {
											if (id) handleDelete(id, index);
										}}
										color='inherit'>
										<Delete />
									</IconButton>
								</div>
								<div>
									<span>Download</span>
									<IconButton
										onClick={() => handleDownload(invoice)}
										color='inherit'>
										<CloudDownload />
									</IconButton>
								</div>
								<div>
									<span>Edit</span>
									<IconButton
										onClick={() => handleView(invoice)}
										color='inherit'>
										<Edit />
									</IconButton>
								</div>
								{/* <IconButton onClick={() => handleMarkPaid(invoice, index)}>
									<Check />
								</IconButton> */}
							</div>
							<div className='invoice-information-container'>
								<div className='invoice-clientName'>
									<span>Name</span>
									{client.firstName} {client.lastName}
								</div>
								<div className='invoice-total'>
									<span>Amount</span>
									{total}
								</div>
								<div className='invoice-date'>
									<span>Date</span>
									{dateDue}
								</div>
								<div className='invoice-status'>
									<span>Status</span>
									{isPaid ? (
										<Done style={{ color: 'green' }} />
									) : (
										<Close style={{ color: 'red' }} />
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</InvoicesContainer>
	);
};

export default InvoicesPage;
