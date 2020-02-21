import * as React from 'react';
import { DashboardContainer } from '.';
import InvoiceType from '../../types/Invoice';
import moment from 'moment';
import { IconButton } from '@material-ui/core';
import { Delete, ViewAgenda, Edit, Done, Close } from '@material-ui/icons';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { REMOVE_INVOICE, GET_CLIENTS } from '../../apollo/constants';
import { parseInvoices } from '../../utils/parseInvoices';

export interface Props {
	children?: React.ReactNode;
}

interface State {
	overDue: InvoiceType[];
	overDueTotal: number;
	toBePaid: InvoiceType[];
	toBePaidTotal: number;
	invoices: InvoiceType[];
}
const today = new Date();

const Dashboard: React.FC<Props> = () => {
	const { loading: queryLoading, data } = useQuery(GET_CLIENTS);
	const [removeInvoice] = useMutation(REMOVE_INVOICE);
	const [state, setState] = React.useState<State>({
		overDue: [],
		overDueTotal: 0,
		toBePaid: [],
		toBePaidTotal: 0,
		invoices: []
	});
	React.useEffect(() => {
		if (data) {
			const invoices = parseInvoices(data.getMe);
			setState(state => ({ ...state, invoices }));
			consumeInvoiceData(invoices, setState);
		}
	}, [data]);
	const handleAction = async ([action, id, index]: [
		string,
		string,
		number
	]) => {
		if (action === 'delete') {
			const { data } = await removeInvoice({
				variables: {
					id: Number(id)
				}
			});
			if (data.removeInvoice === 'Sucess') {
				consumeInvoiceData(
					[
						...state.invoices.slice(0, index),
						...state.invoices.slice(index + 1)
					],
					setState
				);
			}
		}
	};
	if (queryLoading) {
		return <p>Loading.....</p>;
	}
	return (
		<DashboardContainer
			overDueTotal={state.overDueTotal}
			toBePaidTotal={state.toBePaidTotal}>
			<div className='dashboard__title'>
				<h2>Invoices</h2>
			</div>
			<div className='dashboard__card'>
				<div className='dashboard__card--body'>
					<h2>To be paid</h2>
					<div>
						<span>${state.toBePaidTotal}</span>
						<span>{state.toBePaid.length} Invoices</span>
					</div>
				</div>
				<div className='dashboard__card--footer'>
					<h2>Overdue</h2>
					<div>
						<span>${state.overDueTotal}</span>
						<span>{state.overDue.length} Invoices</span>
					</div>
				</div>
			</div>
			<div className='dashboard__body'>
				<div className='dashboard__body--header'>
					<h3>Name</h3>
					<h3>Total</h3>
					<h3>Date Due</h3>
					<h3>Status</h3>
				</div>
				{!state.invoices.length && 'No invoices'}
				{state.invoices.map((invoice, index) => {
					const { client, dateDue, isPaid, total, id } = invoice;
					return (
						<div className='dashboard__body--invoice'>
							<div className='actions'>
								<IconButton onClick={() => handleAction(['delete', id, index])}>
									<Delete />
								</IconButton>
								<IconButton>
									<ViewAgenda />
								</IconButton>
								<IconButton>
									<Edit />
								</IconButton>
							</div>
							<div className='invoice-clientName'>
								{client.firstName} {client.lastName}
							</div>
							<div className='invoice-total'>{total}</div>
							<div className='invoice-date'>{dateDue}</div>
							<div className='invoice-status'>
								{isPaid ? (
									<Done style={{ color: 'green' }} />
								) : (
									<Close style={{ color: 'red' }} />
								)}
							</div>
						</div>
					);
				})}
			</div>
		</DashboardContainer>
	);
};

export default Dashboard;

function consumeInvoiceData(invoices: InvoiceType[], callBack: Function) {
	for (let i = 0; i < invoices.length; i++) {
		const curr = invoices[i];
		if (moment(curr.dateDue).isBefore(today.getDate())) {
			callBack((state: State) => ({
				...state,
				overDue: [...state.overDue, curr],
				overDueTotal: state.overDueTotal + curr.total
			}));
		}
		if (moment(curr.dateDue).isAfter(today.getDate())) {
			callBack((state: State) => ({
				...state,
				toBePaid: [...state.toBePaid, curr],
				toBePaidTotal: state.toBePaidTotal + curr.total
			}));
		}
	}
}
